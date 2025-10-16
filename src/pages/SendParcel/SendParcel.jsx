import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProFastLogo from "../../components/ProFast/ProFastLogo"; // Optional

const SendParcel = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const { user } = useAuth(); // ✅ useAuth hook থেকে user এবং logout আনছি
  const [cost, setCost] = useState(0);
  const type = watch("type");

  const axiosSecure = useAxiosSecure();

  // =========================
  // Warehouse Data
  // =========================
  const warehouseData = [
    { region: "Dhaka", district: "Dhaka", centers: ["Gulshan", "Uttara", "Mirpur"] },
    { region: "Chattogram", district: "Chattogram", centers: ["Agrabad", "Pahartali", "Nasirabad"] },
    { region: "Rajshahi", district: "Rajshahi", centers: ["Shaheb Bazar", "Kazla"] },
  ];

  const regions = warehouseData.map((item) => item.region);
  const getCenters = (regionName) => {
    const region = warehouseData.find((item) => item.region === regionName);
    return region ? region.centers : [];
  };

  // =========================
  // Cost Calculation
  // =========================
  const calculateCost = (data) => {
    const sameCity = data.sender_region === data.receiver_region;
    let total = 0, base = 0, extra = 0, interCity = 0;

    if (data.type === "document") {
      base = sameCity ? 60 : 80;
      total = base;
    } else if (data.type === "non-document") {
      const weight = parseFloat(data.weight) || 0;
      base = sameCity ? 110 : 150;
      if (weight > 3) {
        extra = (weight - 3) * 40;
        if (!sameCity) interCity = 40;
      }
      total = base + extra + interCity;
    }
    return { base, extra, interCity, total };
  };

  // =========================
  // Form Submit Handler
  // =========================
  const onSubmit = async (data) => {
    const { total } = calculateCost(data);
    setCost(total);

    const createdAt = new Date();
    const parcel = {
      ...data,
      user_email: user?.email || "unknown",
      tracking_id: `PKG-${Date.now()}`,
      created_at: createdAt.toISOString(),
      created_date: createdAt.toLocaleDateString("en-GB"),
      created_time: createdAt.toLocaleTimeString("en-GB"),
      estimated_cost: total,
      status: "pending",
      payment_status: "unpaid",
    };

    try {
      const res = await axiosSecure.post("/parcels", parcel);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire({
          title: "✅ Parcel Added!",
          text: "Parcel confirmed and saved successfully.",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
        reset();
      } else {
        throw new Error("Failed to add parcel");
      }
    } catch (error) {
      console.error("Error adding parcel:", error);
      Swal.fire({
        title: "❌ Failed!",
        text: "Something went wrong while adding parcel.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  // =========================
  // Return JSX
  // =========================
  return (
    <>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <ProFastLogo />

        {/* ✅ যদি user থাকে তাহলে logout button দেখাবে */}
        {user ? (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Add Parcel (User)</h1>
              <button onClick={logOut} className="btn btn-error">
                Logout
              </button>
            </div>

            <p className="text-gray-500">
              Door-to-door delivery requires both pickup and delivery locations.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Parcel Info */}
              <section className="p-4 bg-base-200 rounded-xl space-y-4">
                <h2 className="text-xl font-semibold">Parcel Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div>
                    <label className="label font-medium">Type</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="document"
                          {...register("type", { required: true })}
                          className="radio radio-primary"
                        />
                        <span>Document</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="non-document"
                          {...register("type", { required: true })}
                          className="radio radio-primary"
                        />
                        <span>Non-Document</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="label">Parcel Name</label>
                    <input
                      {...register("title", { required: true })}
                      className="input input-bordered w-full"
                      placeholder="Describe your parcel"
                    />
                  </div>

                  {type === "non-document" && (
                    <div>
                      <label className="label">Weight (kg)</label>
                      <input
                        {...register("weight")}
                        type="number"
                        step="0.1"
                        className="input input-bordered w-full"
                        placeholder="Enter parcel weight"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Sender & Receiver Info */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sender */}
                <div className="p-4 bg-base-200 rounded-xl space-y-4">
                  <h2 className="text-xl font-semibold">Sender Info</h2>
                  <div className="flex flex-col gap-4">
                    <input {...register("sender_name", { required: true })} className="input input-bordered w-full" placeholder="Sender Name" />
                    <input {...register("sender_contact", { required: true })} className="input input-bordered w-full" placeholder="Contact Number" />
                    <select {...register("sender_region", { required: true })} className="select select-bordered w-full">
                      <option value="">Select Region</option>
                      {regions.map((region) => (<option key={region} value={region}>{region}</option>))}
                    </select>
                    <select {...register("sender_service_center", { required: true })} className="select select-bordered w-full" disabled={!senderRegion}>
                      <option value="">Select Service Center</option>
                      {getCenters(senderRegion).map((center) => (<option key={center} value={center}>{center}</option>))}
                    </select>
                    <input {...register("sender_address", { required: true })} className="input input-bordered w-full" placeholder="Pickup Address" />
                    <textarea {...register("pickup_instruction")} className="textarea textarea-bordered w-full" placeholder="Pickup Instruction"></textarea>
                  </div>
                </div>

                {/* Receiver */}
                <div className="p-4 bg-base-200 rounded-xl space-y-4">
                  <h2 className="text-xl font-semibold">Receiver Info</h2>
                  <div className="flex flex-col gap-4">
                    <input {...register("receiver_name", { required: true })} className="input input-bordered w-full" placeholder="Receiver Name" />
                    <input {...register("receiver_contact", { required: true })} className="input input-bordered w-full" placeholder="Contact Number" />
                    <select {...register("receiver_region", { required: true })} className="select select-bordered w-full">
                      <option value="">Select Region</option>
                      {regions.map((region) => (<option key={region} value={region}>{region}</option>))}
                    </select>
                    <select {...register("receiver_service_center", { required: true })} className="select select-bordered w-full" disabled={!receiverRegion}>
                      <option value="">Select Service Center</option>
                      {getCenters(receiverRegion).map((center) => (<option key={center} value={center}>{center}</option>))}
                    </select>
                    <input {...register("receiver_address", { required: true })} className="input input-bordered w-full" placeholder="Delivery Address" />
                    <textarea {...register("delivery_instruction")} className="textarea textarea-bordered w-full" placeholder="Delivery Instruction"></textarea>
                  </div>
                </div>
              </section>

              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </form>
          </>
        ) : (
          // =========================
          // User না থাকলে Login Form
          // =========================
          <div className="card bg-base-100 border-2 shadow-2xl w-full p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Please Login to Send a Parcel
            </h2>
            <a href="/login" className="btn btn-neutral w-full">
              Go to Login
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default SendParcel;

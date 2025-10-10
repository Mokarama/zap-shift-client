import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SendParcel = () => {
  const { register, handleSubmit, watch, reset } = useForm();
  const [showConfirm, setShowConfirm] = useState(false);
  const [cost, setCost] = useState(0);
  const type = watch("type");

  // 🏬 Example Warehouse Data (Service Center Info)
  const warehouseData = [
    {
      region: "Dhaka",
      district: "Dhaka",
      centers: ["Gulshan", "Uttara", "Mirpur"],
    },
    {
      region: "Chattogram",
      district: "Chattogram",
      centers: ["Agrabad", "Pahartali", "Nasirabad"],
    },
    {
      region: "Rajshahi",
      district: "Rajshahi",
      centers: ["Shaheb Bazar", "Kazla"],
    },
  ];

  const regions = warehouseData.map((item) => item.region);

  const getCenters = (regionName) => {
    const region = warehouseData.find((item) => item.region === regionName);
    return region ? region.centers : [];
  };

  // ✅ Pricing Calculation Based on Your Table
  const onSubmit = (data) => {
    const sameCity = data.sender_region === data.receiver_region; // within city or not
    let total = 0;

    if (data.type === "document") {
      total = sameCity ? 60 : 80;
    } else if (data.type === "non-document") {
      const weight = parseFloat(data.weight) || 0;

      if (weight <= 3) {
        total = sameCity ? 110 : 150;
      } else {
        const extraWeight = weight - 3;
        if (sameCity) {
          total = 110 + extraWeight * 40;
        } else {
          total = 150 + extraWeight * 40 + 40; // extra 40 for outside city
        }
      }
    }

    setCost(total);

    toast(
      (t) => (
        <div className="space-y-2">
          <p className="font-semibold text-lg">
            Estimated Delivery Cost: ৳{total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setShowConfirm(true);
                toast.dismiss(t.id);
              }}
              className="btn btn-sm btn-primary"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-sm btn-ghost"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const handleConfirm = (data) => {
    const parcel = {
      ...data,
      creation_date: new Date().toISOString(),
      estimated_cost: cost,
    };
    console.log("✅ Parcel saved:", parcel);
    toast.success("Parcel added successfully!");
    reset();
    setShowConfirm(false);
  };

  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Toaster position="top-right" />

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">Add Parcel (User)</h1>
        <p className="text-gray-500">
          As the system is based on Door to Door delivery, Parcel needs both
          pickup and delivery location.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(showConfirm ? handleConfirm : onSubmit)}
        className="space-y-8"
      >
        {/* Parcel Info */}
        <section className="p-4 bg-base-200 rounded-xl space-y-4">
          <h2 className="text-xl font-semibold">Parcel Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Radio Buttons for Type */}
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
          {/* Sender Info */}
          <div className="p-4 bg-base-200 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Sender Info</h2>
            <div className="flex flex-col gap-4">
              <input
                {...register("sender_name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Name"
              />
              <input
                {...register("sender_contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact Number"
              />
              <select
                {...register("sender_region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("sender_service_center", { required: true })}
                className="select select-bordered w-full"
                disabled={!senderRegion}
              >
                <option value="">Select Service Center</option>
                {getCenters(senderRegion).map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
              <input
                {...register("sender_address", { required: true })}
                className="input input-bordered w-full"
                placeholder="Pickup Address"
              />
              <textarea
                {...register("pickup_instruction")}
                className="textarea textarea-bordered w-full"
                placeholder="Pickup Instruction"
              ></textarea>
            </div>
          </div>

          {/* Receiver Info */}
          <div className="p-4 bg-base-200 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Receiver Info</h2>
            <div className="flex flex-col gap-4">
              <input
                {...register("receiver_name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />
              <input
                {...register("receiver_contact", { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact Number"
              />
              <select
                {...register("receiver_region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                {...register("receiver_service_center", { required: true })}
                className="select select-bordered w-full"
                disabled={!receiverRegion}
              >
                <option value="">Select Service Center</option>
                {getCenters(receiverRegion).map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
              <input
                {...register("receiver_address", { required: true })}
                className="input input-bordered w-full"
                placeholder="Delivery Address"
              />
              <textarea
                {...register("delivery_instruction")}
                className="textarea textarea-bordered w-full"
                placeholder="Delivery Instruction"
              ></textarea>
            </div>
          </div>
        </section>

        <button type="submit" className="btn btn-primary w-full">
          {showConfirm ? "Confirm & Save" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SendParcel;

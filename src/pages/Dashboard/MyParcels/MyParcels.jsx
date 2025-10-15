import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const parcels = [
  {
    "_id": "68ee60f08284a566bb284bde",
    "type": "non-document",
    "title": "Mango",
    "sender_name": "shanta",
    "sender_contact": "01749644922",
    "sender_region": "Dhaka",
    "sender_service_center": "Mirpur",
    "sender_address": "Dhaka",
    "pickup_instruction": "My first parcel",
    "receiver_name": "Mokarama Akter Shanta",
    "receiver_contact": "01577185920",
    "receiver_region": "Rajshahi",
    "receiver_service_center": "Shaheb Bazar",
    "receiver_address": "Rajshahi",
    "delivery_instruction": "Food",
    "weight": "20",
    "user_email": "shanta@gmail.com",
    "tracking_id": "PKG-1760452848203",
    "created_at": "2025-10-14T14:40:48.203Z",
    "created_date": "14/10/2025",
    "created_time": "20:40:48",
    "estimated_cost": 870,
    "status": "pending",
    "payment_status": "unpaid"
  }
];

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading, isError } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // Prevent request if email not available
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email // only run query if user email exists
  });

  console.log(parcels);

  if (isLoading) {
    return <div>Loading parcels...</div>;
  }

  if (isError) {
    return <div>Failed to load parcels.</div>;
  }

  // *******************
  const handleView = (id) => {
    console.log("View details for:", id);
    // You can navigate to details page or show a modal
  };

  const handlePay = (id) => {
    console.log("Pay for parcel:", id);
    // Trigger payment logic
  };

  const handleDelete = (id) => {
    console.log("Delete parcel:", id);
    // Trigger delete logic
  };

  return (
    <div>
      <h2>My Parcels</h2>
      <div className="overflow-x-auto p-4">
        <table className="table w-full border border-gray-200">
          <thead>
            <tr>
              <th>Type</th>
              <th>Created At</th>
              <th>Payment Status</th>
              <th>Cost (BDT)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.type}</td>
                <td>{new Date(parcel.created_at).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td>{parcel.estimated_cost}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleView(parcel._id)}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handlePay(parcel._id)}
                    className="btn btn-sm btn-success"
                  >
                    Pay
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;

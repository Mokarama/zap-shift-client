import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate =useNavigate();
  const queryClient = useQueryClient(); // To refetch parcels after deletion

  const { data: parcels = [], isLoading, isError } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`,{
        headers:{
          Authorization:`Bearer ${user.accessToken}`
        }
      });
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <div>Loading parcels...</div>;
  if (isError) return <div>Failed to load parcels.</div>;

  const handleView = (id) => console.log("View details for:", id);


  const handlePay = (id) => {
    console.log("Pay for parcel:", id);
    navigate(`/dashboard/payment/${id}`)
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/parcels/${id}`);
        
        // Refetch parcels
        queryClient.invalidateQueries(['my-parcels', user?.email]);

        Swal.fire(
          'Deleted!',
          'Your parcel has been deleted.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'Something went wrong while deleting.',
          'error'
        );
      }
    }
  };

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-4">My Parcels</h2>

      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px] border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th>Type</th>
              <th>Title</th>
              <th>Created At</th>
              <th>Payment Status</th>
              <th>Cost (BDT)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="hover">
                <td>
                  <span
                    className={`badge ${
                      parcel.type === "document" ? "badge-primary" : "badge-info"
                    }`}
                  >
                    {parcel.type}
                  </span>
                </td>
                <td>{parcel.title}</td>
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
                <td className="flex flex-wrap gap-2">
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

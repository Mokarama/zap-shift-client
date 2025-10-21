import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CreditCard, Calendar, DollarSign } from "lucide-react";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return <p className="text-center py-10 text-gray-500">Loading payment history...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
        <CreditCard className="w-6 h-6 text-blue-600" />
        Payment History
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Parcel ID</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Payment ID</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p, index) => (
                <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{p.parcelId}</td>
                  <td className="p-3 flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    {p.amount}
                  </td>
                  <td className="p-3 text-sm text-gray-600">{p.paymentIntentId}</td>
                  <td
                    className={`p-3 font-medium ${
                      p.paymentStatus === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {p.paymentStatus}
                  </td>
                  <td className="p-3 flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No payment history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

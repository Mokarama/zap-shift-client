import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState();

  // ================= billingDetails state =================
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    address: {
      city: "",
      line1: "",
      postal_code: "",
    },
  });
  // =========================================================

  const { isPandding, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${parcelId}`);
      return res.data;
    },
  });

  // ================ autofill billingDetails from parcelInfo =================
  useEffect(() => {
    if (parcelInfo) {
      setBillingDetails({
        name: parcelInfo.sender_name || "",
        email: parcelInfo.user_email || "",
        address: {
          city: parcelInfo.city || "",
          line1: parcelInfo.address_line || "",
          postal_code: parcelInfo.postal_code || "",
        },
      });
    }
  }, [parcelInfo]);
  // ==========================================================================

  if (isPandding) {
    Swal.fire({
      title: "Please wait...",
      text: "Processing your request",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      Swal.close();
      Swal.fire("Done!", "Operation completed successfully.", "success");
    }, 2000);

    return null;
  }

  console.log(parcelInfo, "parcel info");

  const amount = parcelInfo.estimated_cost;
  const amountInCents = amount * 100;
  console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    //step- 1 : Validate card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("payment method", paymentMethod);
    }

    // step-2: create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });
    const clientSecret = res.data.clientSecret;

    // Then pass to confirmCardPayment:
    // step- 3:Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: billingDetails,
        },
      });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      Swal.fire(
        "Payment Successful!",
        "Your payment has been processed.",
        "success"
      );

      // 1️⃣ Parcel mark as paid
      await axiosSecure.post(`/parcels/${parcelId}/paid`);

      // 2️⃣ Save payment history
      await axiosSecure.post("/payments/history", {
        parcelId,
        userEmail: billingDetails.email,
        amount,
        paymentIntentId: paymentIntent.id,
      });
    }

    console.log("res from intent", res);
  };

  return (
    <>
      <div className="w-1/2 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full mx-auto border"
        >
          <CardElement className="p-2 border rounded" />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!stripe}
          >
            Pay ${amount}
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default PaymentForm;

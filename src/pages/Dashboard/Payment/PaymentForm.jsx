import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();


    const { parcelId } = useParams();
    //   console.log(parcelId)
    const axiosSecure = useAxiosSecure();

    const [error, setError] = useState();

    const { isPandding, data: parcelInfo = {} } = useQuery({
        queryKey: ["parcels", parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels/${parcelId}`);
            return res.data;
        },
    });

    if (isPandding) {
        Swal.fire({
            title: "Please wait...",
            text: "Processing your request",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // কাজ শেষ হলে (২ সেকেন্ড পর) বন্ধ করো
        setTimeout(() => {
            Swal.close();
            Swal.fire("Done!", "Operation completed successfully.", "success");
        }, 2000);

        return null;
    }
    console.log(parcelInfo, "parcel info");

    const amount = parcelInfo.estimated_cost;
    // console.log(amount,"cost");
    const amountInCents = amount * 100;
    console.log(amountInCents);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            // console.log('error',error)
            setError(error.message);
        } else {
            setError("");
            console.log("payment method", paymentMethod);
        }
        //step-3: create payment intent
        const res = await axiosSecure.post("/create-payment-intent", {
            amountInCents,
            parcelId,
        });
        const clientSecret = res.data.clientSecret;


        // Then pass to confirmCardPayment:
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: billingDetails,
            },

        });
        if (confirmError) {
            setError(confirmError.message);
        } else if (paymentIntent.status === "succeeded") {
            Swal.fire("Payment Successful!", "Your payment has been processed.", "success");
        }


        console.log("res from intent", res);
    };

    return (
        <>
            <div className="w-1/2   mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className=" space-y-4 bg-white p-6 rounded-xl shadow-md w-full  mx-auto border"
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

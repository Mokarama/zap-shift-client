import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = () => {
  const stripe =useStripe();
  const elements =useElements();

  const [error, setError]=useState();
 

const  handleSubmit =async (e)=>{
    e.preventDefault();
    if(!stripe || !elements){
        return
    }

    const card =elements.getElement(CardElement)

    if(!card){
        return;   
    }

    const {error, paymentMethod}= await stripe.createPaymentMethod({
        type:'card',
        card,
    })

    if(error){
        // console.log('error',error)
        setError(error.message)
    }
    else{
        setError('');
        console.log('payment method',paymentMethod)
    }
}
    return (
        <>
          <div className="w-1/2 mx-auto">
            <form onSubmit={handleSubmit} className=" space-y-4 bg-white p-6 rounded-xl shadow-md w-full  mx-auto border">
                <CardElement className="p-2 border rounded" />
                    <button type="submit"  className="btn btn-primary w-full" disabled={!stripe}>
                        Pay For Parcel PicKup
                    </button>
                
                {
                    error && <p className="text-red-500">{error}</p>
                }
            </form>
            
            </div>  
        </>
    );
};

export default PaymentForm;
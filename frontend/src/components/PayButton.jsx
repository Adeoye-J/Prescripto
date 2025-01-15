import React, { useContext } from 'react'
import axios from "axios"
import { AppContext } from '../context/AppContext';
// const stripePromise = loadStripe('pk_test_51QaLFBAHbRfNobUMeYPuFzmVmFqafGotHCACW3qPw5F89jvpxMZzEvR1OHFdH7zXrPNByoRWJVtxskGEd4em2Z0Z00llhVkXru');

const PayButton = ({id}) => {
    const {backendUrl, token} = useContext(AppContext)

    const handlePayment = async (appointmentId) => {
        // const stripe = await stripePromise; // Ensure Stripe.js is loaded
        try {
            const { data } = await axios.post(backendUrl + "/api/user/make-payment", { appointmentId }, { headers: { token } } );
            if (data.success) {
                console.log(data)
                console.log(data.session)
                window.location.href = data.session.url;
                setSessionId(data.session.id)
                // await stripe.redirectToCheckout({ sessionId: data.session.id });
            } else {
                toast.error(data.message || "Unable to initiate payment.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
        // console.log(appointmentId)
    };

    return (
        <button onClick={() => handlePayment(id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
            Pay Online
        </button>
    )
}

export default PayButton
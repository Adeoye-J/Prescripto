import React, { useContext } from 'react'
import axios from "axios"
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const PayButton = ({id}) => {
    const {backendUrl, token, sessionId, setSessionId} = useContext(AppContext)

    const handlePayment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/user/make-payment", { appointmentId }, { headers: { token } } );
            if (data.success) {
                console.log(data)
                console.log(data.session)
                window.location.href = data.session.url;
                setSessionId(data.session.id)
            } else {
                toast.error(data.message || "Unable to initiate payment.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const fetchPaymentStatus = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/confirm-payment?sessionId=${sessionId}`, {headers: {token}});
            if (data.success) {
                alert("Payment confirmed!");
            } else {
                alert("Payment not yet confirmed. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to fetch payment status.");
        }
    };

    return (
        <>
            <button onClick={() => handlePayment(id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                Pay Online
            </button>
            <button onClick={() => fetchPaymentStatus()} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                Confirm Payment
            </button>
        </>
    )
}

export default PayButton
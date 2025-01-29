import React, { useContext, useState } from 'react'
import axios from "axios"
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const PayButton = ({id}) => {
    const {backendUrl, token } = useContext(AppContext)

    const [sessionId, setSessionId] = useState(null);

    const handlePayment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/user/make-payment", { appointmentId }, { headers: { token } } );
            if (data.success) {
                console.log(data)
                console.log(data.session)
                setSessionId(data.session.id)
                window.location.href = data.session.url;
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
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
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

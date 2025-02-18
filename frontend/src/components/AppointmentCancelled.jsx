import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppointmentCancelled = () => {
    const navigate = useNavigate()

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-red-400 flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg text-center shadow-md">
                <h2 className='text-red-400 font-bold pb-6'>Payment Cancelled!</h2>
                {/* <p className='pb-6'>Your transaction ID is: {sessionId}</p> */}
                <button onClick={() => navigate("/my-appointments")} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Close</button>
            </div>
        </div>
    )
}

export default AppointmentCancelled
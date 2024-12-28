import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppointmentSuccess = () => {
    const navigate = useNavigate()

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-primary flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg text-center shadow-md">
                <h2 className='text-blue-400 font-bold'>Payment Successful!</h2>
                {/* <p>Your transaction ID is: {sessionId}</p> */}
                <button onClick={() => navigate("/my-appointments")} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Close</button>
            </div>
        </div>
    )
}

export default AppointmentSuccess
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js';
import PayButton from '../components/PayButton';

const MyAppointments = () => {

    const {backendUrl, token, getDoctorsData} = useContext(AppContext)
    const [appointments, setAppointments] = useState([])

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_")
        return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + ", " + dateArray[2]
    }

    const getUserAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/user/user-appointments", {headers: {token}})
            if (data.success){
                setAppointments(data.appointments.reverse())
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl +  "/api/user/cancel-appointment", {appointmentId}, {headers: {token}})
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getUserAppointments()
    }, []);

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
            <div className="">
                {
                    appointments.map((item, index) => (
                        <div key={index} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b">
                            <div className="">
                                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="Doctor's Image" />
                            </div>
                            <div className="flex-1 text-sm text-zinc-600">
                                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                                <p>{item.docData.speciality}</p>
                                <p className='text-zinc-700 font-medium mt-1'>Address</p>
                                <p className='text-xs'>{item.docData.address.line1}</p>
                                <p className='text-xs'>{item.docData.address.line2}</p>
                                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                                {/* <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 25 July, 2024 | 8:30 PM</p> */}
                            </div>
                            <div className=""></div>
                            <div className="flex flex-col gap-2 justify-end">
                                {
                                    (!item.cancelled && !item.paid &!item.isCompleted) && 
                                    <>
                                        <PayButton id={item._id} />
                                        <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>
                                    </>
                                }
                                {
                                    item.paid && 
                                    <button className="sm:min-w-48 py-2 border border-primary rounded text-primary">Paid</button>
                                }
                                {
                                    item.cancelled && 
                                    <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>
                                }

                                {
                                    item.isCompleted && 
                                    <button className='sm:min-w-48 py-2 border border-primary rounded text-primary'>Completed</button>
                                }
                                {/* {showSuccess && (
                                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center">
                                        <div className="bg-white p-6 rounded-lg text-center shadow-md">
                                            <h2 className='text-blue-400 font-bold'>Payment Successful!</h2>
                                            <p>Your transaction ID is: {sessionId}</p>
                                            <button onClick={() => setShowSuccess(false)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Close</button>
                                        </div>
                                    </div>
                                )}
                                {showCancelled && (
                                    <div className="fixed top-0 bottom-0 left-0 right-0 bg-red-400 flex items-center justify-center">
                                        <div className="bg-white p-10 rounded-lg text-center shadow-md">
                                            <h2 className='text-red-400 font-bold pb-6'>Payment Cancelled!</h2>
                                            <p className='pb-6'>Your transaction ID is: {sessionId}</p>
                                            <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Close</button>
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyAppointments
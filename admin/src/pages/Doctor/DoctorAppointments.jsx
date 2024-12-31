import React, { useContext, useEffect } from 'react'

const DoctorAppointments = () => {

    const {dToken, docAppointments, getDocAppointments} = useContext(DoctorContext)
    const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getDocAppointments()
        }
    }, [dToken])


    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>
            <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
                <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Actions</p>
                </div>

                {
                    docAppointments.map((item, index) => (
                        <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className="flex items-center gap-2">
                                <img className='w-8 rounded-full' src={item.userData.image} alt="User Image" />
                                <p>{item.userData.name}</p>
                            </div>
                            <div className="">
                                <p>{item.payment ? "Online" : "Cash"}</p>
                            </div>
                            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                            <div className="flex items-center gap-2">
                                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="User Image" />
                                <p>{item.docData.name}</p>
                            </div>
                            <p>{currency}{item.amount}</p>
                            {
                            item.cancelled
                                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel icon" />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorAppointments
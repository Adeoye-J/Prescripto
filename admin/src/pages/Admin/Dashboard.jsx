import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Dashboard = () => {

    const {getDashboardData, dashboardData, aToken, cancelAppointment} = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getDashboardData()
        }
    }, [aToken])

    return dashboardData && (
        <div className='m-5'>
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.doctor_icon} alt="Doctor Icon" />
                    <div className="">
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.doctors}</p>
                        <p className='text-gray-400'>Doctors</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.appointments_icon} alt="Appointments Icon" />
                    <div className="">
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.patients_icon} alt="Patient Icon" />
                    <div className="">
                        <p className='text-xl font-semibold text-gray-600'>{dashboardData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
                    <img src={assets.list_icon} alt="List Icon" />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>
                .
            </div>
        </div>
    )
}

export default Dashboard
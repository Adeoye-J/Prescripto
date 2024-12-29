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
                        <p>{dashboardData.doctors}</p>
                        <p>Doctors</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.appointments_icon} alt="Appointments Icon" />
                    <div className="">
                        <p>{dashboardData.appointments}</p>
                        <p>Appointments</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
                    <img className='w-14' src={assets.patients_icon} alt="Patient Icon" />
                    <div className="">
                        <p>{dashboardData.patients}</p>
                        <p>Patients</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
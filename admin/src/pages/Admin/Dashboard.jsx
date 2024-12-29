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
            <div className="">
                <div className="">
                    <img src={assets.doctor_icon} alt="Doctor Icon" />
                    <div className="">
                        <p>{dashboardData.doctors}</p>
                        <p>Doctors</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
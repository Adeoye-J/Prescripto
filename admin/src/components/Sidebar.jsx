import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {NavLink} from "react-router-dom"
import { assets } from '../assets/assets'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)

    return (
        <div className='min-h-screen bg-white border-r'>
            {
                aToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg" : ""}`} to={"/admin-dashboard"}>
                        <img src={assets.home_icon} alt="Home Icon" />
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg" : ""}`} to={"/all-appointments"}>
                        <img src={assets.appointment_icon} alt="Home Icon" />
                        <p>Appointment</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg" : ""}`} to={"/add-doctor"}>
                        <img src={assets.add_icon} alt="Home Icon" />
                        <p>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg" : ""}`} to={"/doctor-list"}>
                        <img src={assets.people_icon} alt="Home Icon" />
                        <p>Doctors List</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
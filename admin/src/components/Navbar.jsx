import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from "react-router-dom"
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate("/")
        aToken && setAToken("")
        aToken && localStorage.removeItem("aToken")
        dToken && setDToken("")
        dToken && localStorage.removeItem("dToken")
    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className="flex items-center gap-2 text-xs">
                {
                    aToken
                    ? <img className='w-12 sm:w-16 cursor-pointer' src={assets.logo_admin} alt="Admin Logo" />
                    : <img className='w-12 sm:w-16 cursor-pointer' src={assets.logo_doctor} alt="Doctor Logo" />
                }
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? "Admin" : "Doctor"}</p>
            </div>
            <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
        </div>
    )
}

export default Navbar
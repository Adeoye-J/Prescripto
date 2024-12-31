import { createContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "")
    const [docAppointments, setDocAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getDocAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/appointments", {headers: {dToken}})
            if (data.success) {
                setDocAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentCompleted = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + "/api/doctor/appointment-completed", {appointmentId}, {headers: {dToken}})
            if (data.success) {
                toast.success(data.message)
                getDocAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentCancelled = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + "/api/doctor/appointment-cancelled", {appointmentId}, {headers: {dToken}})
            if (data.success) {
                toast.success(data.message)
                getDocAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getDashboardData = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/dashboard", {headers: {dToken}})
            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/profile", {headers: {dToken}})
            if (data.success) {
                setProfileData(data.profileData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        dToken,
        setDToken,
        docAppointments,
        setDocAppointments,
        getDocAppointments,
        appointmentCompleted,
        appointmentCancelled,
        dashData, setDashData,
        getDashboardData,
        profileData, setProfileData,
        getProfileData,
        backendUrl
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
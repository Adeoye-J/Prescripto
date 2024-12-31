import { createContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "")
    const [docAppointments, setDocAppointments] = useState([])
    const [dashData, setDashData] = useState()

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

    const dashboardData = async (appointmentId) => {

    }

    const value = {
        dToken,
        setDToken,
        backendUrl,
        docAppointments,
        setDocAppointments,
        getDocAppointments,
        appointmentCompleted,
        appointmentCancelled
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
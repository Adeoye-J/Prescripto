import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import {toast} from "react-toastify"
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])

    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const [userData, setUserData] = useState(false)

    const [sessionId, setSessionId] = useState(null);

    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/doctor/list")
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }

    const getUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + "/api/user/get-profile", {headers: {token}})
            if (data.success) {
                // console.log(data.userData)
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            getUserData()
        } else {
            setUserData(false)
        }
    }, [token])

    useEffect(() => {
        if (!sessionId) return;
        const fetchPaymentStatus = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/user/confirm-payment?sessionId=${sessionId}`, {headers: {token}});
                if (data.success) {
                    alert("Payment confirmed!");
                } else {
                    alert("Payment not yet confirmed. Please try again later.");
                }
            } catch (error) {
                console.error(error);
                alert("Failed to fetch payment status.");
            }
        };

        fetchPaymentStatus();
    }, []);

    const currencySymbol = "$"

    const value = {doctors, currencySymbol, token, setToken, backendUrl, getUserData, userData, setUserData, getDoctorsData, sessionId, setSessionId}

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider

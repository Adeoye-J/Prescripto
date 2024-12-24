import { createContext, useEffect, useState } from "react";
// import { doctors } from "../assets/assets";
import {toast} from "react-toastify"
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])

    const [token, setToken] = useState(localStorage.getItem("token") || "")

    const [userData, setUserData] = useState({})

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
                console.log(data.userData)
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error);
        }
    }

    const updateUserData = async () => {
        try {
            const {data} = await axios.post(backendUrl + "/api/user/update-profile", {userData}, {headers: {token}})
            if(data.success) {
                toast.success(data.message)
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

    const currencySymbol = "$"

    const value = {doctors, currencySymbol, token, setToken, backendUrl, getUserData, userData, updateUserData}

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider

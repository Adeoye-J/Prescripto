import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {

    const {dToken, dashData, setDashData, getDashboardData} = useContext(DoctorContext)

    useEffect(() => {
        if (dToken) {
            getDashboardData()
        }
    }, [dToken])

    return (
        <div>
            
        </div>
    )
}

export default DoctorDashboard
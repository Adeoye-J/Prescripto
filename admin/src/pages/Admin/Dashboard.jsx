import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Dashboard = () => {

    const {getDashboardData, dashboardData} = useContext(AdminContext)

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard
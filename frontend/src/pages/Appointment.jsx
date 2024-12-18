import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Appointment = () => {

    const {docId} = useParams()
    const {doctors} = useContext(AppContext)

    const [docInfo, setDocInfo] = useState(null)

    const fetchDocInfo = async () => {
        const docInfo = await doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])

    console.log(docInfo)
    
    return (
        <div>
            <p>Test content</p>
            <p>{docInfo?.name}</p>
        </div>
    )
}

export default Appointment
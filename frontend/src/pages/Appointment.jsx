import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Appointment = () => {

    const {docId} = useParams()
    const {doctors} = useContext(AppContext)

    const [docInfo, setDocInfo] = useState(null)

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
        console.log(docInfo)
    }

    useEffect(() => {
        fetchDocInfo()
    }, [doctors,docId])

    // console.log(docInfo)
    
    return docInfo && (
        <div>
            <div className="">
                <div className="">
                    <img src={docInfo.image} alt="" />
                </div>

                <div className="">
                    <p>{docInfo.name} <img src={assets.verified_icon} alt="Verified Icon" /></p>
                    <div className="">
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button>{docInfo.experience}</button>
                    </div>
                    <div className="">
                        <p>About <img src={assets.info_icon} alt="Info Io" /></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment
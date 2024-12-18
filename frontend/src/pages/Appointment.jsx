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
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="">
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
                        {docInfo.name} 
                        <img src={assets.verified_icon} alt="Verified Icon" />
                    </p>
                    <div className="">
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button>{docInfo.experience}</button>
                    </div>
                    <div className="">
                        <p>About <img src={assets.info_icon} alt="Info Icon" /></p>
                        <p>{docInfo.about}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment
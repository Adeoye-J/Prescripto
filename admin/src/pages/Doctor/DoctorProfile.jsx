import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {

    const {dToken, profileData, setProfileData, getProfileData} = useContext(DoctorContext)
    const {currency, backendUrl} = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className=''>
            <div className="flex flex-col gap-4 m-5">
                <div className="">
                    <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="Doctor's Image" />
                </div>

                <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">

                    <p className='text-3xl font-medium text-gray-700'>{profileData.name}</p>

                    <div className="flex items-center gap-2 mt-1 tex">
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button>{profileData.experience}</button>
                    </div>

                    <div className="">
                        <p>About:</p>
                        <p>{profileData.about}</p>
                    </div>

                    <p>Appointment fee: <span>{currency} {profileData.fees}</span></p>

                    <div className="">
                        <p>Address:</p>
                        <p>{profileData.address.line1} <br /> {profileData.address.line2}</p>
                    </div>

                    <div className="">
                        <input type="checkbox" />
                        <label htmlFor="">Available</label>
                    </div>

                    <button>Edit</button>

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
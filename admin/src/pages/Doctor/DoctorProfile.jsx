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
        <div>
            <div className="">
                <div className="">
                    <img src={profileData.image} alt="Doctor's Image" />
                </div>

                <div className="">

                    <p>{profileData.name}</p>

                    <div className="">
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button>{profileData.experience}</button>
                    </div>

                    <div className="">
                        <p></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
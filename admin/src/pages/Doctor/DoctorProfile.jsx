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
                    <img className='bg-primary transo' src={profileData.image} alt="Doctor's Image" />
                </div>

                <div className="">

                    <p>{profileData.name}</p>

                    <div className="">
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
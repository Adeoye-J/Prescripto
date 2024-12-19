import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [userData, setUserData] = useState({
        name: "Jeremiah Bankole",
        image: assets.profile_pic,
        email: "bankolejeremiahadeoye@gmail.com",
        phone: "-23 4335 35454",
        address: {
            line1: "First Line Address Comes Here",
            line2: "Second Line Address Comes Here",
            city: "City Name",
            state: "State Name",
            zip: "ZIP Code"
        },
        gender: "Male",
        DOB: "2300-01-23"
    })

    const [isEdit, setIsEdit] = useState(false)

    return (
        <div>
            <img src={userData.image} alt="User Image" />

            {
                isEdit
                ? <input type="text" value={userData.name} onChange={() => setUserData(prev => ({...prev, name:e.target.value}))}/>
                : <p>{userData.name}</p>
            }

            <hr />

            <div className="">
                <p></p>
            </div>
        </div>
    )
}

export default MyProfile
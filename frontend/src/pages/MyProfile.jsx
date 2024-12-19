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
                ? <input type="text" value={userData.name} onChange={(e) => setUserData(prev => ({...prev, name:e.target.value}))}/>
                : <p>{userData.name}</p>
            }

            <hr />

            <div className="">
                <p>CONTACT INFORMATION</p>
                <div className="">
                    <p>Email Id:</p>
                    <p>{userData.email}</p>
                    <p>Phone:</p>
                    {
                        isEdit
                        ? <input type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({...prev, phone:e.target.value}))}/>
                        : <p>{userData.phone}</p>
                    }
                    <p>Address:</p>
                    {
                        isEdit
                        ? <p>
                            <input type="text" value={userData.address.line1} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))}/>
                            <br />
                            <input type="text" value={userData.address.line2} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))}/>
                        </p>
                        : <p>
                            {userData.address.line1}
                            <br />
                            {userData.address.line2}
                        </p>
                    }
                </div>
            </div>
            <div className="">
                <p>BASIC INFORMATION</p>
                <div className="">
                    <p>Gender:</p>
                    {
                        isEdit
                        ? <select onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p>{userData.gender}</p>
                    }
                    <p>Date of Birth:</p>
                    {
                        isEdit
                        ? <input type="date" onChange={(e) => setUserData(prev => ({...prev, DOB: e.target.value}))} />
                        : <p>{userData.DOB}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProfile
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
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <img className='w-36 rounded' src={userData.image} alt="User Image" />

            {
                isEdit
                ? <input className='bg-gray-200 text-3xl font-medium max-w-60 mt-4  border border-black rounded-md text-black p-3' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({...prev, name:e.target.value}))}/>
                : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none' />

            <div className="">
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2 text-neutral-700">
                    <p className='font-medium'>Email Id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>
                    {
                        isEdit
                        ? <input className='bg-gray-100 max-w-52 border border-black rounded-md text-black p-3' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({...prev, phone:e.target.value}))}/>
                        : <p className='text-blue-400'>{userData.phone}</p>
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
            <div className="">
                {
                    isEdit
                    ? <button onClick={() => setIsEdit(false)}>Save Information</button>
                    : <button onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyProfile = () => {

    // const [userData, setUserData] = useState({
    //     name: "Jeremiah Bankole",
    //     image: assets.profile_pic,
    //     email: "bankolejeremiahadeoye@gmail.com",
    //     phone: "-23 4335 35454",
    //     address: {
    //         line1: "First Line Address Comes Here",
    //         line2: "Second Line Address Comes Here",
    //         city: "City Name",
    //         state: "State Name",
    //         zip: "ZIP Code"
    //     },
    //     gender: "Male",
    //     DOB: "2300-01-23"
    // })

    const {userData, setUserData, token, getUserData, backendUrl} = useContext(AppContext)
    const [image, setImage] = useState(false)

    const updateUserData = async () => {

        try {
            const formData = new FormData()

            formData.append("name", userData.name)
            formData.append("phone", userData.phone)
            formData.append("address", JSON.stringify(userData.address))
            formData.append("gender", userData.gender)
            formData.append("dob", userData.dob)

            image && formData.append("image", image)

            const {data} = await axios.post(backendUrl + "/api/user/update-profile", formData, {headers: {token}})
            if (data.success) {
                toast.success(data.message)
                await getUserData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const [isEdit, setIsEdit] = useState(false)

    return userData && (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>

            {
                isEdit 
                ? <label htmlFor="image">
                    <div className="inline-block relative cursor-pointer">
                        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                        <img className='w-10 absolute bottom-12 right-12' src={image ? "": assets.upload_icon} alt="" />
                    </div>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden/>
                </label>
                : <img className='w-36 rounded' src={userData.image} alt="User Image" />
            }

            {
                isEdit
                ? <input className='bg-gray-200 text-xl font-medium max-w-60 mt-4 outline-primary border border-primary rounded-md text-black p-3' type="text" value={userData.name} onChange={(e) => setUserData(prev => ({...prev, name:e.target.value}))}/>
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
                        ? <input className='bg-gray-100 max-w-52 outline-primary border border-primary rounded-md text-black p-3' type="text" value={userData.phone} onChange={(e) => setUserData(prev => ({...prev, phone:e.target.value}))}/>
                        : <p className='text-blue-400'>{userData.phone}</p>
                    }
                    <p className='font-medium'>Address:</p>
                    {
                        isEdit
                        ? <div>
                            <input className='bg-gray-50 outline-primary border border-primary rounded-md text-black p-3' type="text" value={userData.address.line1} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))}/>
                            <br />
                            <input className='bg-gray-50 outline-primary border border-primary rounded-md text-black p-3' type="text" value={userData.address.line2} onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))}/>
                        </div>
                        : <p className='text-gray-500'>
                            {userData.address.line1}
                            <br />
                            {userData.address.line2}
                        </p>
                    }
                </div>
            </div>
            <div className="">
                <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
                <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
                    <p className='font-medium'>Gender:</p>
                    {
                        isEdit
                        ? <select className='max-w-32 bg-gray-100 outline-primary border border-primary rounded-md text-black p-3' value={userData.gender} onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-400'>{userData.gender}</p>
                    }
                    <p className='font-medium'>Date of Birth:</p>
                    {
                        isEdit
                        ? <input className='max-w-32 bg-gray-100 outline-primary border border-primary rounded-md text-black p-3' type="date" value={userData.dob} onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} />
                        : <p className='text-gray-400'>{userData.dob}</p>
                    }
                </div>
            </div>
            <div className="mt-10">
                {
                    isEdit
                    ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserData}>Save Information</button>
                    : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile
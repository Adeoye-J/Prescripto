import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorsList = () => {

    const {doctors, aToken, getAllDoctors} = useContext(AdminContext)

    useEffect(() => {
        if(aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Doctors</h1>

            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {
                    doctors.map((item, index) => (
                        <div key={index} className="border border-indigo-200 rounded-xl max">
                            <img src={item.image} alt="Doctors Image" />
                            <div className="">
                                <p>{item.name}</p>
                                <p>{item.speciality}</p>
                                <div className="">
                                    <input type="checkbox" checked={item.available} />
                                    <p>{item.available ? "Available" : "Not Available"}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsList
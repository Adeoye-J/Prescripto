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
        <div>
            <h1>All Doctors</h1>

            <div className="">
                {
                    doctors.map((item, index) => (
                        <div className="">
                            <img src={item.image} alt="Doctors Image" />
                            <div className="">
                                <p>{item.name}</p>
                                <p>{item.speciality}</p>
                                <div className="">
                                    <input type="checkbox" checked={item.available} />
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
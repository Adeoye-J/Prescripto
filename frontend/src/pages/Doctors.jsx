import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

    const {speciality} = useParams()
    const [filterDoc,]

    // console.log(speciality)
    const {doctors} = useContext(AppContext)

    return (
        <div>
            <p>Browse through the doctors specialist.</p>
            <div className="">
                <div className="">
                    <p>General Physician</p>
                    <p>Gynecologist</p>
                    <p>Dermatologist</p>
                    <p>Pediatricians</p>
                    <p>Neurologist</p>
                    <p>Gastroenterologist</p>
                </div>
                <div className="">
                    {

                    }
                </div>
            </div>
        </div>
    )
}

export default Doctors
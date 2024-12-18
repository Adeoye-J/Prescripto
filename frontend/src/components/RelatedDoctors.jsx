import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({docId, speciality}) => {

    const {doctors} = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        
    }, [doctors, speciality, docId])

    return (
        <div>
            
        </div>
    )
}

export default RelatedDoctors
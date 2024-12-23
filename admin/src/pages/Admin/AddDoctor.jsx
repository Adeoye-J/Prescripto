import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
    return (
        <form>
            <p>Add Doctor</p>

            <div className="">
                <div className="">
                    <label htmlFor="">
                        <img src={assets.upload_area} alt="Upload Area" />
                    </label>
                </div>
            </div>
        </form>
    )
}

export default AddDoctor
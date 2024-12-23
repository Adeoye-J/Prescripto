import React from 'react'
import { assets } from '../../assets/assets'

const AddDoctor = () => {
    return (
        <form className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">

                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt="Upload Area" />
                    </label>
                    <input type="file" id="doc-img" hidden />
                    <p>Upload Doctor <br /> Picture</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    <div className="w-full lg:flex-1 flex flex-col gap-4">

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Name:</p>
                            <input className='border rounded px-3 py-2' type="text" placeholder='Name' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Email:</p>
                            <input className='border rounded px-3 py-2' type="email" placeholder='Email' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Password:</p>
                            <input className='border rounded px-3 py-2' type="password" placeholder='Password' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Experience:</p>
                            <select className='border rounded px-3 py-2' name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10 Years">10 Years</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees:</p>
                            <input className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
                        </div>

                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">
                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality:</p>
                            <select className='border rounded px-3 py-2' name="" id="">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Education:</p>
                            <input className='border rounded px-3 py-2' type="text" placeholder='Education' required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Address:</p>
                            <input className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
                            <input className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
                        </div>

                    </div>
                </div>

                <div className="">
                    <p>About Doctor:</p>
                    <textarea placeholder='About Doctor' rows={5} required></textarea>
                </div>

                <button>Add Doctor</button>

            </div>
        </form>
    )
}

export default AddDoctor
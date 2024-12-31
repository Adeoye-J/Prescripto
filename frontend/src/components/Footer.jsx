import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div className="">
                    <img className='mb-5 w-24' src={assets.logo_patient} alt="Logo" />
                    <p className='w-full md:w-2/3 text-gray-500 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati ab autem in sint mollitia quae commodi aut explicabo dolor minima repudiandae molestias, alias facilis aspernatur molestiae. Fugiat, omnis doloribus.</p>
                </div>

                <div className="">
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div className="">
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+1-234-567-8901</li>
                        <li>jeremiahiasngu@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className="">
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@ Prescripto - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
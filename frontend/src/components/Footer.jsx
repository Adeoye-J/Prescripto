import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className="flex flex-col sm:grid grid-cols- gap-14">
                <div className="">
                    <img src={assets.logo} alt="Logo" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque obcaecati ab autem in sint mollitia quae commodi aut explicabo dolor minima repudiandae molestias, alias facilis aspernatur molestiae. Fugiat, omnis doloribus.</p>
                </div>

                <div className="">
                    <p>COMPANY</p>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div className="">
                    <p>GET IN TOUCH</p>
                    <ul>
                        <li>+1-234-567-8901</li>
                        <li>jeremiahiasngu@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div className="">
                <hr />
                <p>Copyright 2024@ Prescripto - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
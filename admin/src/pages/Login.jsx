import React from 'react'
import {assets} from "../assets/assets"
import { useState } from 'react'

const Login = () => {

    const [state, setState] = useState("Admin")

    return (
        <form className="min-h-[80vh] flex items-center">
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
                <div className="">
                    <p>Email:</p>
                    <input type="email" required />
                </div>
                <div className="">
                    <p>Password:</p>
                    <input type="password" required />
                </div>
                <button>Login</button>
            </div>
        </form>
    )
}

export default Login
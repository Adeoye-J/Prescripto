import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from '../../frontend/src/components/Navbar';

const App = () => {

    const {aToken} = useContext(AdminContext)

    return aToken ? (
        <div>
            <ToastContainer />
            <Navbar />
        </div>
    ) : (
        <>
            <Login />
            <ToastContainer />
        </>
    )

    // return (
    //     <>
    //         {
    //             aToken
    //             ? <>
                
    //             </>
    //             : <>
    //                 <Login />
    //             </>
    //         }
    //         <ToastContainer />
    //     </>
    // )
}

export default App
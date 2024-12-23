import React, {useContext} from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Routes, Route} from "react-router-dom"

const App = () => {

    const {aToken} = useContext(AdminContext)

    return aToken ? (
        <div>
            <ToastContainer />
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <Routes>
                    <Route path='/' element={<} />
                </Routes>
            </div>
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
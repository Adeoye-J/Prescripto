import React, {useContext} from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';

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
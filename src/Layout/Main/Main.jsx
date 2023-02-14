import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AuthContext } from '../../Context/UserContext';

const Main = () => {

    const { user, logOut } = useContext(AuthContext)
    const [show, setShow] = useState(false)

    const handleLogout = () => {
        logOut()
            .then(() => {
                console.log('LOG OUTED')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>

            <div className="grid md:grid-cols-6">
                <div className={`md:col-span-1 md:relative md:block absolute left-0 z-50 mt-2 ease-linear duration-300 transition ${show ? 'block' : 'hidden '}`}>
                    <ul className="menu p-4 w-80 sticky top-0 left-0 shadow-lg h-[600px] rounded-2xl mt-10 bg-gray-800 text-white font-semibold ">
                        {/* <!-- Sidebar content here --> */}
                        <li className='flex justify-between items-center'>
                            <img className='rounded-full w-20' src="https://play-lh.googleusercontent.com/suZk_SQpTlqm0OqfDfgv3NQuhTDXsUy1qSasQw8n7rkRiXe0n39Z1LBzzyTEooFRQiYZ" alt="" />
                            <p className='text-2xl mb-4'>Expense <span className='bg-[#4354A5] rounded-md text-white'>Tracker</span></p></li>
                        <div className='divider my-0 m-0 p-0'>

                        </div>
                        <li>
                            <div className='flex items-center '>
                                <img src={user?.photoURL ? user?.photoURL : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} className='rounded-full w-10 ' alt="" />
                                <span>{user?.displayName}</span>
                            </div>
                        </li>
                        <div className='divider my-0 m-0 p-0'>

                        </div>
                        <li><Link to='/summury' className=''>Summary</Link></li>
                        <li><Link to='/' className=''>Expense</Link></li>
                        <li><Link to='/settings' className=''>Settings</Link></li>
                        <div className='divider my-0 m-0 p-0'>

                        </div>
                        <li>
                            <p onClick={handleLogout}> Log Out</p>
                        </li>
                    </ul>
                </div>
                <div className="col-span-4 ml-0 p-4 md:ml-40 lg:ml-40">
                    <h1 className='text-center font-semibold block md:hidden text-white text-xl'>Expense Tracker</h1>
                    <Outlet></Outlet>
                </div>

            </div>
            <button onClick={() => setShow(!show)} className='absolute md:hidden top-5 right-5 bg-white text-gray-900  rounded-full p-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            </button>
        </div>
    );
};

export default Main;
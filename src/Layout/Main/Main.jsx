import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { AuthContext } from '../../Context/UserContext';

const Main = () => {

    const {user, logOut} = useContext(AuthContext)


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

            <div className="grid grid-cols-6">
                <div className="col-span-1">
                    <ul className="menu p-4 w-80 sticky top-0 left-0 shadow-lg h-[600px] rounded-2xl mt-10 bg-gray-800 text-white font-semibold ">
                        {/* <!-- Sidebar content here --> */}
                        <li className='flex justify-between items-center'>
                            <img className='rounded-full w-20' src="https://play-lh.googleusercontent.com/suZk_SQpTlqm0OqfDfgv3NQuhTDXsUy1qSasQw8n7rkRiXe0n39Z1LBzzyTEooFRQiYZ" alt="" />
                            <p className='text-2xl mb-4'>Expense <span className='bg-[#4354A5] rounded-md text-white'>Tracker</span></p></li>
                        <div className='divider my-0 m-0 p-0'>
                            
                       </div>
                        <li>
                            <div className='flex items-center '>
                                <img src={user?.photoURL ? user?.photoURL:'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} className='rounded-full w-10 ' alt="" />
                                <span>{user?.displayName}</span>
                            </div>
                        </li>
                        <div className='divider my-0 m-0 p-0'>
                            
                            </div>
                        <li><Link to='/' className=''>Summary</Link></li>
                        <li><Link to='/expense' className=''>Expense</Link></li>
                        <li><Link to='/settings' className=''>Settings</Link></li>
                        <div className='divider my-0 m-0 p-0'>
                            
                        </div>
                        <li>
                            <p onClick={handleLogout}> Log Out</p>
                        </li>
                    </ul>
                </div>
                <div className="col-span-4 ml-40">

                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default Main;
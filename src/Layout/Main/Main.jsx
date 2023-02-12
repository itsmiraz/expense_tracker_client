import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import AddExpenseDrawer from '../../Pages/Expense/AddExpenseDrawer';

const Main = () => {
    return (
        <div>

            <div className="grid grid-cols-6">
                <div className="col-span-2">
                    <ul className="menu p-4 w-80 shadow-lg h-screen bg-gray-800 text-white font-semibold ">
                        {/* <!-- Sidebar content here --> */}
                        <li><p className='text-2xl mb-4'>Expense Tracker</p></li>
                        <li><Link to='/' className=''>Summary</Link></li>
                        <li><Link to='/expense' className=''>Expense</Link></li>
                        <li><Link to='/settings' className=''>Settings</Link></li>
                    </ul>
                </div>
                <div className="col-span-4 ">

                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default Main;
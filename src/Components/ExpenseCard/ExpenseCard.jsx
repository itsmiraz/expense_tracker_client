import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { coolGray } from 'tailwindcss/colors';


const ExpenseCard = ({ cata, SetSideBarShow, setShowExpenses, refetch }) => {
    // const [bgcolor,setbgColor]= useState('bg-[#023047]')

    const {
        catagory,
        budget,
        expense,
        expenses,
        _id
    } = cata
    let total = 0
    expenses.map(exp => total += parseFloat(exp.expense));
    const budgetLeft = budget - total

    console.log('normal',budgetLeft)
    console.log('reducer', total)
    
    
    const progress = (100 * budgetLeft) / budget
    console.log(progress, catagory, cata)


    const handleDeleteCatagory = id => {
        fetch(` https://web-dev-full-stack-task-server.vercel.app/deletecatagory/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.error('DELETED')
                refetch()
            })
    }

    return (
        <div
            className={`
            ${progress > 80 ? 'bg-green-600' :
                    progress > 50 ? 'bg-blue-600' :
                        progress > 30 ? 'bg-orange-600' :
                            progress > 10 ? 'bg-red-600' : 'bg-red-600'

                } p-4 rounded-md `}>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold text-white'>{catagory}</h1>
                <div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="text-white"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content text-white menu p-0 shadow bg-base-100 rounded-box w-32">
                            <li><a>Edit</a></li>
                            <li><span onClick={() => handleDeleteCatagory(_id)}> Delete</span></li>
                        </ul>
                    </div>
                </div>

            </div>

            <p className=' font-semibold text-white my-2'>Budget: {budget} $</p>
            <p className=' font-semibold text-white my-2'>Budget Left : {budgetLeft} $</p>
            <progress className="progress s transition-all my-2 progress-primary bg-gray-600 w-full" value={progress} max="100"></progress>

            <div className='flex justify-between mt-2 font-semibold items-center'>
                <button onClick={() => setShowExpenses(cata)} className='px-4 bg-blue-200 shadow-md text-gray-900 py-1 rounded'>View Expense</button>
                <button onClick={() => SetSideBarShow(cata)} className='px-4 bg-blue-700 shadow-md text-white py-1 rounded'>Add Expense</button>
            </div>



        </div>
    );
};

export default ExpenseCard;
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { coolGray } from 'tailwindcss/colors';

const ShowExpensesModal = ({ showExpenses, setShowExpenses, refetch }) => {
    const [edit, setedit] = useState('')
    const filteredExpenses = showExpenses.expenses.filter(expense => expense.remove === false)
    const DeletedExpenses = showExpenses.expenses.filter(expense => expense.remove === 'true')
    const [newExpenseTitle,setnewExpenseTitle] = useState('')
    const [newExpenseBudget,setnewExpenseBudget] = useState('')
    const budgetLeft = showExpenses.budget - showExpenses.expense



    const handleeditExpense = data => {
        
        if (parseFloat(newExpenseBudget) > parseFloat(budgetLeft)) {
            return toast.error('Please add a Valid Amount')
        }

        const updateddata = {
            expenseID: data.id,
            newExpenseTitle : newExpenseTitle ? newExpenseTitle: data.title,
            newExpenseBudget: newExpenseBudget ? newExpenseBudget: data.expense

        }
        console.log(updateddata,data)
        fetch(`https://web-dev-full-stack-task-server.vercel.app/editexpense/${showExpenses._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateddata)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShowExpenses('')
               
                toast.success('Edited')
                setedit('')
                refetch()
            })
    }

    const handleDeleteExpense = id => {
        const data = {
            expenseID: id
        }
        fetch(`https://web-dev-full-stack-task-server.vercel.app/removeexpense/${showExpenses._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setShowExpenses('')
                toast.success('Deleted')
                refetch()
            })
    }


    return (
        <div className='absolute transition-all  right-0 top-0 z-40'>


            <div className="bg-gray-800  rounded-2xl  py-10 text-white z-50 p-4 mt-10 h-[600px] w-80 ">
                <p className='text-xl font-bold mb-4'>{showExpenses.catagory}</p>
                <ul className="">
                    {
                        filteredExpenses.map((expense, i) => <li key={expense._id} className='flex text-xl font-semibold px-2 items-center'>
                            <span>{i + 1}. {''}</span>
                            <div className='flex justify-between w-full gap-2 px-2 items-center'>
                                {
                                    edit === i ?
                                        <>
                                            <input required onChange={(e)=>setnewExpenseTitle(e.target.value)} defaultValue={expense.title} className='w-full ' type="text" name="" id="" />
                                            <input required onChange={(e)=>setnewExpenseBudget(e.target.value)} defaultValue={expense.expense} className='w-full' type="text" name="" id="" />

                                        </>
                                        :
                                        <>
                                            <p>{expense.title}</p>
                                            <p>{expense.expense} $ </p>
                                        </>
                                }
               
                            </div>
                            <div className='mt-2'>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="text-white"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content text-white menu p-0 shadow bg-base-100 rounded-box w-32">
                                        <li>{
                                            edit === i ?
                                                <>
                                                    <span onClick={() => handleeditExpense(expense)}>Save</span>

                                                </>
                                                :
                                                <>
                                                    <span onClick={() => setedit(i)}>Edit</span>
                                                </>
                                        }</li>
                                        <li><span onClick={() => handleDeleteExpense(expense.id)} className='text-red-500'> Delete</span></li>
                                    </ul>
                                </div>
                            </div>

                        </li>)
                    }
                    <div className="divider mt-20"></div>
                    <li className=''>
                        <p className='text-xl font-bold mb-4'>Deleted Expenses</p>
                        {
                            DeletedExpenses.map((expense, i) => <li key={expense._id} className='flex text-xl  px-2 items-center'>
                                <span>{i + 1}. {''}</span>
                                <div className='flex justify-between w-full px-2 items-center'>
                                    <p className='line-through'>{expense.title}</p>
                                    <p className='line-through'>{expense.expense} $ </p>

                                </div>
                                <div className='mt-2'>
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="text-white"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                        </svg>
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content text-white menu p-0 shadow bg-base-100 rounded-box w-32">
                                            <li><span>Edit</span></li>
                                            <li><a> Delete</a></li>
                                        </ul>
                                    </div>
                                </div>

                            </li>)
                        }
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default ShowExpensesModal;
import React from 'react';
import { toast } from 'react-hot-toast';
import { coolGray } from 'tailwindcss/colors';

const ShowExpensesModal = ({ showExpenses ,setShowExpenses,refetch}) => {

    const filteredExpenses = showExpenses.expenses.filter(expense => expense.remove === false)
    const DeletedExpenses = showExpenses.expenses.filter(expense => expense.remove === true)
   
   
    const handleDeleteExpense = id => {

        const data = {
            expenseID: id
        }
        fetch(`http://localhost:5000/removeexpense/${showExpenses._id}`, {
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


            <div className="bg-gray-800 py-10 text-white z-50 p-4 h-screen w-80 ">
                <p className='text-2xl font-bold mb-4'>{showExpenses.catagory}</p>
                <ul className="">
                    {
                        filteredExpenses.map((expense, i) => <li key={expense._id} className='flex text-xl font-semibold px-2 items-center'>
                            <span>{i + 1}. {''}</span>
                            <div className='flex justify-between w-full px-2 items-center'>
                                <p>{expense.title}</p>
                                <p>{expense.expense} $ </p>

                            </div>
                            <div className='mt-2'>
                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="text-white"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content text-white menu p-0 shadow bg-base-100 rounded-box w-32">
                                        <li><span >Edit</span></li>
                                        <li><span onClick={() => handleDeleteExpense(i)} className='text-red-500'> Delete</span></li>
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
                                    <label tabIndex={0} className="text-white"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
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
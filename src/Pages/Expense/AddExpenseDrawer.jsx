import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { CATAGORIES_PROVIDER } from '../../Context/Catagory_Context';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { v4 as uuid } from 'uuid';

const AddExpenseDrawer = ({ sideBarShow, SetSideBarShow }) => {
  
    const { refetch } = useContext(CATAGORIES_PROVIDER)
    sideBarShow ? disableBodyScroll(document) : enableBodyScroll(document)


    const unique_id = uuid();

    let total = 0
    const filteredExpenses = sideBarShow.expenses.filter(expense => expense.remove === false)
    filteredExpenses.map(exp => total += parseFloat(exp.expense));
    const budgetLeft = sideBarShow.budget - total



   



    const handleAddExpense = e => {
        e.preventDefault()

        const form = e.target;
        const title = form.title.value;
        const expense = form.expense.value;

        // const newexpense = parseFloat(sideBarShow.budget) + parseFloat(expense)


        if (budgetLeft < expense) {

            toast.error('Inefficient Budget')
            return
        }

        const expenseData = {
            title,
            expense,
            id:unique_id,
            remove: false

        }
        fetch(`https://web-dev-full-stack-task-server.vercel.app/addexpense/${sideBarShow._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('ADDED')
                SetSideBarShow('')
                refetch()
            })
    }


    return (
        <div className='absolute transition duration-300 ease-out  right-0 top-0 z-40'>


            <div className="">
                <ul className="z-50 pt-10  font-semibold p-6 h-[500px] rounded-2xl mt-10 w-80 bg-gray-800 text-white">
                    <li><p className='text-2xl mb-4'>{sideBarShow.catagory}</p></li>

                    <form onSubmit={handleAddExpense} className='my-4'>
                        <input required type="text" placeholder='Title' name='title' className='bg-transparent text-white my-2 font-semibold focus:outline-none border-none' />
                        <input required type="number" placeholder='Expense' name='expense' className='bg-transparent text-white my-2 font-semibold focus:outline-none border-none' />
                        <button type='submit' className='px-4 py-1 my-2 bg-blue-600 text-white font-semibold'>Add Expense</button>
                    </form>

                </ul>
            </div>
        </div>
    );
};

export default AddExpenseDrawer;
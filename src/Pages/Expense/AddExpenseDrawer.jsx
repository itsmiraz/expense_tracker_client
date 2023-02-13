import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { CATAGORIES_PROVIDER } from '../../Context/Catagory_Context';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const AddExpenseDrawer = ({ sideBarShow, SetSideBarShow }) => {
  
    sideBarShow ? disableBodyScroll(document) : enableBodyScroll(document)

    console.log(sideBarShow)
    const { refetch } = useContext(CATAGORIES_PROVIDER)
    const handleAddExpense = e => {
        e.preventDefault()

        const form = e.target;
        const title = form.title.value;
        const expense = form.expense.value;

        const newexpense = parseFloat(sideBarShow.expense) + parseFloat(expense)


        if (sideBarShow.budget < newexpense) {

            toast.error('Inefficient Budget')
            return
        }

        const expenseData = {
            title,
            expense,
            newexpense,
            remove: false

        }
        fetch(`http://localhost:5000/addexpense/${sideBarShow._id}`, {
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
                        <input type="text" placeholder='Title' name='title' className='bg-transparent text-white my-2 font-semibold focus:outline-none border-none' />
                        <input type="number" placeholder='Expense' name='expense' className='bg-transparent text-white my-2 font-semibold focus:outline-none border-none' />
                        <button type='submit' className='px-4 py-1 my-2 bg-blue-600 text-white font-semibold'>Add Expense</button>
                    </form>

                </ul>
            </div>
        </div>
    );
};

export default AddExpenseDrawer;
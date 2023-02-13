import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { CATAGORIES_PROVIDER } from '../../Context/Catagory_Context';
import { AuthContext } from '../../Context/UserContext';

const Settings = () => {
    const { refetch } = useContext(CATAGORIES_PROVIDER)
    const { user } = useContext(AuthContext)
    const handleCatagory = e => {
        e.preventDefault()
        const form = e.target;
        const catagory = form.catagory.value;
        const budget = form.budget.value;



        const data = {
            catagory,
            budget,
            expense: 0,
            expenses: [],
            userEmail: user?.email
        }

        fetch('https://web-dev-full-stack-task-server.vercel.app/addcatagory', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                form.reset()
                refetch()
                toast.success('Catagory Added')
            })

        console.log(data);
        return


    }

    return (
        <div className='flex items-center  justify-center'>
            <div className='w-96 mx-auto mt-20  p-5 text-white font-semibold bg-gray-800 shadow-lg rounded-md'>
                <form action="" onSubmit={handleCatagory}>

                    <h1 className=' text-2xl '>Settings</h1>
                    <div>
                        <p className='my-2'>Catagory</p>
                        <input required type="text" name='catagory' className='p-2 bg-gray-900  rounded focus:outline-none' />
                    </div>
                    <div className='my-2'>
                        <p className=''>Budget</p>
                        <input required type="number" name='budget' className='p-2 bg-gray-900 rounded  focus:outline-none' />
                    </div>
                    <button className='px-4 py-1 bg-blue-600 rounded my-2'>Add Catagory</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
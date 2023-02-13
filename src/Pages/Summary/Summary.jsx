import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { CATAGORIES_PROVIDER } from '../../Context/Catagory_Context';

const Summary = () => {
    const [catagoryIndex, setCatagoryIndex] = useState(0)
    const [catagoryData, setCatagoryData] = useState({})
    const [expenseData, setexpenseData] = useState([])
    const { catagories } = useContext(CATAGORIES_PROVIDER)


    useEffect(() => {
        setexpenseData(catagories[catagoryIndex]?.expenses)
        setCatagoryData(catagories[catagoryIndex])
    }, [catagoryIndex])

    return (
        <div>

            {
                catagoryData ?
                    <>
                        <div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl font-bold my-10 text-white'>Summuray</h1>
                                <h1 className='text-xl font-semibold bg-[#4354A5] px-2 py-1 rounded text-white my-5'>{catagoryData?.catagory}</h1>

                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn text-white m-1">Catagories <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="ml-2 font-semibold text-white w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                    </svg>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-800 text-white rounded-box w-52">
                                        {
                                            catagories?.map((catagory, i) => <li><p className='text-white' onClick={() => setCatagoryIndex(i)}>{catagory.catagory}</p></li>)
                                        }
                                    </ul>
                                </div>

                            </div>

                            <div className='flex items-center justify-between'>

                                <div>
                                    <h1 className='text-4xl font-bold text-white my-5'><span className='text-xl text-green-500'>Budget :</span> $ {catagoryData?.budget}</h1>

                                </div>
                                <div>
                                    <h1 className='text-4xl font-bold text-white my-5'><span className='text-xl text-red-500'>Total Expense :</span> $ {catagoryData?.expense}</h1>
                                </div>
                            </div>

                            {
                                catagoryData?.expense === 0 ?
                                    <div className='w-[600px] h-[300px] flex justify-center items-center rounded-lg bg-gray-800'>
                                        <h1 className='text-5xl font-bold text-gray-400'>Expenses is Empty</h1>
                                    </div>
                                    :
                                    <>
                                        <BarChart className='rounded-lg pr-3 text-white font-semibold bg-gray-800 pt-5 ' width={600} height={300} data={expenseData}>

                                            <XAxis className='text-white' dataKey="title" stroke="#4354A5" />
                                            <YAxis className='text-white' />
                                            <Legend className='' width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                                            <CartesianGrid className='text-white' stroke="#ccc" strokeDasharray="5 5" />
                                            <Bar className='text-white' dataKey="expense" fill="#4354A5" barSize={30} />

                                        </BarChart>
                                    </>
                            }
                        </div>
                    </>
                    :
                    <div className='w-[600px] h-[300px] flex mt-10 justify-center items-center rounded-lg bg-gray-800'>
                        <div className='text-center'>
                        <h1 className='text-3xl font-bold text-gray-400'>You Don't have any Expense Details</h1>
                        <Link to='/settings'><p className='underline my-2 text-white'>Add a Catagory?</p></Link>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Summary;
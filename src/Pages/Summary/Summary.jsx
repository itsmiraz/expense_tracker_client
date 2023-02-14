import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { coolGray } from 'tailwindcss/colors';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { CATAGORIES_PROVIDER } from '../../Context/Catagory_Context';
import './Summary.css'
const Summary = () => {
    const { catagories, isLoading } = useContext(CATAGORIES_PROVIDER)
    const [catagoryindex, setCatagoryIndex] = useState(0)
    const [catagoryData, setCatagoryData] = useState({})
    const [expenseData, setexpenseData] = useState([])
    let total = 0
    if (isLoading) {
        return <LoadingSpinner />
    }

console.log(catagories[catagoryindex])

    

//     useEffect(() => {
    
//         if (catagoryindex === 0) {
    
//             setCatagoryData(catagories[0])
//             const filteredExpenses = catagoryData?.expenses?.filter(expense => expense.remove !== 'true')
//             filteredExpenses?.map(exp => total += parseFloat(exp.expense));
//             setexpenseData(filteredExpenses)
//             return   
//         }
//         else {
//             setCatagoryData(catagories[catagoryindex])
    
//            
          
//           console.log(catagoryData)
//             console.log(filteredExpenses)
//             return
//         }
      
// },[catagoryindex])
   
   
   
  
  

    const handleSummury = data => {
        setCatagoryData(data)
        const filteredExpenses = data?.expenses?.filter(expense => expense.remove !== 'true')
                    filteredExpenses?.map(exp => total += parseFloat(exp.expense));
                    setexpenseData(filteredExpenses)
      
      
        return
    }

   

  

    return (
        <div>

            {
                catagories.length > 0 ?
                    <>
                        <div>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-xl font-bold my-10 text-white'>Summuray</h1>
                                <h1 className='text-xl font-semibold bg-[#4354A5] px-2 py-1 rounded text-white my-5'>{catagoryData?.catagory ? catagoryData?.catagory : 'Please Select a Catagory'}</h1>

                                <div className="dropdown dropdown-end">
                                    <label tabIndex={0} className="btn text-white m-1">Catagories <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeLinejoin="1.5" stroke="currentColor" className="ml-2 font-semibold text-white w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                    </svg>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-800 text-white rounded-box w-52">
                                        {
                                            catagories?.map((catagory, i) => <li key={i}><p className='text-white'  onClick={() => handleSummury(catagory)}>{catagory.catagory}</p></li>)
                                        }
                                    </ul>
                                </div>

                            </div>

                            <div className='flex items-center justify-between'>

                                <div>
                                    <h1 className='text-4xl font-bold text-white my-5'><span className='text-xl text-green-500'>Budget :</span> $ {catagoryData?.budget}</h1>

                                </div>
                                <div>
                                    <h1 className='text-4xl font-bold text-white my-5'><span className='text-xl text-red-500'>Total Expense :</span> $ {total}</h1>
                                </div>
                            </div>

                            {
                                expenseData?.length === 0 ?
                                    <>


                                        <div className='w-[600px] h-[300px] flex justify-center items-center rounded-lg bg-gray-800'>
                                            <h1 className='text-5xl font-bold text-gray-400'>Expenses is Empty</h1>
                                        </div>


                                    </>
                                    :
                                    <>
                                        <div id='container' className='z-10 flex justify-center' >
                                        <ResponsiveContainer className="bg-white rounded-lg " width="100%" height="100%">

                                            <BarChart className='rounded-lg pr-3 text-white font-semibold bg-gray-800 pt-5 ' width={600} height={400} data={expenseData}>

                                                <XAxis className='text-white' dataKey="title" stroke="#4354A5" />
                                                <YAxis className='text-white' />
                                                <Legend className='' width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                                                <CartesianGrid className='text-white' stroke="#ccc" strokeDasharray="5 5" />
                                                <Bar className='text-white' dataKey="expense" fill="#4354A5" barSize={30} />

                                            </BarChart>
                                            </ResponsiveContainer>
                                            </div>
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
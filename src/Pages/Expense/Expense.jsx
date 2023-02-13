import React, { useContext, useEffect, useState } from 'react';
import { coolGray } from 'tailwindcss/colors';
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { CATAGORIES_PROVIDER } from '../../Context/Catagory_Context';
import AddExpenseDrawer from './AddExpenseDrawer';
import ShowExpensesModal from './ShowExpensesModal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Link } from 'react-router-dom';

const Expense = () => {
    const [sideBarShow, SetSideBarShow] = useState('')
    const { catagories, isLoading,  refetch } = useContext(CATAGORIES_PROVIDER)
    const [showExpenses, setShowExpenses] = useState('')

    useEffect(() => {
     
        showExpenses ? disableBodyScroll(document) : enableBodyScroll(document)
 },[])




    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    


   

    return (
        <div>
            {
                catagories.length === 0 ?
                    <div className='w-[600px] h-[300px] flex mt-10 justify-center items-center rounded-lg bg-gray-800'>
                        <div className='text-center'>
                            <h1 className='text-3xl font-bold text-gray-400'>You Don't have any Expense Catagory</h1>
                            <Link to='/settings'><p className='underline my-2 text-white'>Add a Catagory?</p></Link>
                        </div>
                    </div>
                    :
                    <>
                        <div>
                            <div className='grid grid-cols-2 z-50 gap-6 py-10 '>
                                {
                                    catagories?.map(cata => <ExpenseCard
                                        key={cata._id}
                                        SetSideBarShow={SetSideBarShow}
                                        setShowExpenses={setShowExpenses}
                                        refetch={refetch}
                                        cata={cata}
                                    />)
                                }
                            </div>

                            {
                                sideBarShow &&
                                <AddExpenseDrawer

                                    sideBarShow={sideBarShow}
                                    SetSideBarShow={SetSideBarShow}
                                />
                            }
                            {
                                sideBarShow &&
                                <>
                                    <div onClick={() => SetSideBarShow('')} className='bg-black/40 w-full  transition-all h-screen absolute top-0 left-0'>

                                    </div>
                                </>
                            }

                            {
                                showExpenses &&
                                <ShowExpensesModal
                                    showExpenses={showExpenses}
                                    setShowExpenses={setShowExpenses}
                                    refetch={refetch}
                                />
                            }
                            {
                                showExpenses &&
                                <>
                                    <div onClick={() => setShowExpenses('')} className='bg-black/40 w-full transition-all h-screen absolute top-0 left-0'>

                                    </div>
                                </>
                            }

                        </div>
                    </>
            }
        </div>
    );
};

export default Expense;
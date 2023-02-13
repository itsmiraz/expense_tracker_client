import React, { useContext, useEffect, useState } from 'react';
import { coolGray } from 'tailwindcss/colors';
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import { CATAGORIES_PROVIDER } from '../../Context/Catagory_Context';
import AddExpenseDrawer from './AddExpenseDrawer';
import ShowExpensesModal from './ShowExpensesModal';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const Expense = () => {
    const [sideBarShow, SetSideBarShow] = useState('')
    const { catagories, isLoading ,error,refetch} = useContext(CATAGORIES_PROVIDER)
    const [showExpenses, setShowExpenses] = useState('')

    showExpenses  ? disableBodyScroll(document) : enableBodyScroll(document)
    



    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (error) {
        return <Error/>
    }


    useEffect(() => { 

        if (showExpenses) {
        
        }

    },[])

    return (
        <div>
            <div className='grid grid-cols-2 z-50 gap-6 py-10 '>
                {
                    catagories?.map(cata => <ExpenseCard
                        key={cata._id}
                        SetSideBarShow={SetSideBarShow}
                        setShowExpenses={setShowExpenses}
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
    );
};

export default Expense;
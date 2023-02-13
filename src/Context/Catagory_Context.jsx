import { useQuery } from '@tanstack/react-query';
import React, { createContext, useContext } from 'react';
import { AuthContext } from './UserContext';


export const CATAGORIES_PROVIDER = createContext()

const Catagory_Context = ({ children }) => {

    const {user} = useContext(AuthContext)
    console.log(user)
    
    const { data: catagories, refetch, isLoading ,error} = useQuery({
        queryKey: ['catagories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/catagories?email=${user?.email}`)
            const data = await res.json()
            return data
        }
    })


    const data = {
    catagories,
        refetch,
        isLoading,
        error
    }
    return (
        <CATAGORIES_PROVIDER.Provider value={data} >
            {
                children
            }
        </CATAGORIES_PROVIDER.Provider>
    );
};

export default Catagory_Context;
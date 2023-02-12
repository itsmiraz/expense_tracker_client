import { useQuery } from '@tanstack/react-query';
import React, { createContext } from 'react';


export const CATAGORIES_PROVIDER = createContext()

const Catagory_Context = ({ children }) => {


    const { data: catagories, refetch, isLoading } = useQuery({
        queryKey: ['catagories'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/catagories')
            const data = await res.json()
            return data
        }
    })


    const data = {
    catagories,
        refetch,
        isLoading
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
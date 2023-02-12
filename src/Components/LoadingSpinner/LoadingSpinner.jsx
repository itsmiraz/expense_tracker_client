import React from 'react';
import { GridLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='h-[400px] flex justify-center items-center'>
            <GridLoader color="#ffffff" />
        </div>
    );
};

export default LoadingSpinner;
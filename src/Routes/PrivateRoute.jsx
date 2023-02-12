import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../Context/UserContext';



const Private = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()
    if (loading) {

        return <LoadingSpinner/>
    }


    if (user && user.uid) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default Private;
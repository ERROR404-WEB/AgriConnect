import React from 'react';
import { Route, Navigate } from 'react-router-dom';


export default function ProtectedRoute({children}) {
        if(localStorage.getItem('token')){
            return children;
        }
        else{
            return <Navigate to='/signin' replace/> 
        }
}
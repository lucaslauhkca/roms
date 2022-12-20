import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from './auth-service'; 

export default function AuthGuard({ children })
{
    let auth = AuthService.getCurrentUser();
    let location = useLocation();

    if(!auth.user)
    {
        return <Navigate to="/signin" state={{ from: location }} replace />;   
    }

    return children;
}
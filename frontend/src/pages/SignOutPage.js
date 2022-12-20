import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../features/authentication/auth-service';
import { toast } from 'react-toastify';

function SignOut()
{
    useEffect(() => {
        document.title = "SignOut";
        AuthService.logout();
        toast("Logout successfully!")
    }, []);

    return(
        <Navigate to= "/" />
    );
}

export default SignOut;
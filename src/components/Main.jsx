import React from 'react';
import { auth } from '../firebaseConfig';
import { Navigate } from 'react-router-dom';

export default function Main() {
    return auth.currentUser ? <> 
        
    </> :
    <Navigate replace={true} to='/login' />;
}
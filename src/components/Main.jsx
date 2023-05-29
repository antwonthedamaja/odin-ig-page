import React from 'react';
import { auth } from '../firebaseConfig';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Content from './Content';

export default function Main() {
    return auth.currentUser ? <> 
        <Header />
        <Content />
    </> :
    <Navigate replace={true} to='/login' />;
}
import React from 'react';
import { auth } from '../firebaseConfig';
import { Navigate, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import CreatePost from './Create-Post';
import ChangeSettings from './Change-Settings';

export default function Router() {
    return auth.currentUser ? <> 
        <Header />
        <Routes>
            <Route path='/post' element={<CreatePost />} />
            <Route path='/account' element={<ChangeSettings />} />
            <Route path="/redirect" element={<Navigate to="/main/" />} />
            <Route index element={<Main />} />
        </Routes>
    </> :
    <Navigate replace={true} to='/login' />;
}
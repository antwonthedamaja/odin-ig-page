import React from 'react';
import { auth } from '../firebaseConfig';
import { Navigate, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Feed from './Feed';
import CreatePost from './Create-Post';
import ChangeSettings from './Change-Settings';

export default function Main() {
    return auth.currentUser ? <> 
        <Header />
        <Routes>
            <Route path='/post' element={<CreatePost />} />
            <Route path='/account' element={<ChangeSettings />} />
            <Route index element={<Feed />} />
        </Routes>
    </> :
    <Navigate replace={true} to='/login' />;
}
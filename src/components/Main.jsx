import React from 'react';
import { auth } from '../firebaseConfig';
import { Navigate, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Post from './Post';
import Settings from './Settings';

export default function Main() {
    return auth.currentUser ? <> 
        <Header />
        <Routes>
            <Route path='/post' element={<Post />} />
            <Route path='/account' element={<Settings />} />
            <Route index element={<Content />} />
        </Routes>
    </> :
    <Navigate replace={true} to='/login' />;
}
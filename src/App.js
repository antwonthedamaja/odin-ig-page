import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import './style/App.css';
import './style/Settings.css';
import './style/Post.css';
import './style/Login.css';
import './style/Header.css';
import './style/Content.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/main/*" element={<Main />} />
                <Route index element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

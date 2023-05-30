import React from 'react';
import './style/App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';

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

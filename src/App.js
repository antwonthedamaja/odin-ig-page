import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Router from './components/Router';
import './style/App.css';
import './style/Settings.css';
import './style/Post.css';
import './style/Login.css';
import './style/Header.css';
import './style/Content.css';
import './style/Feed.css';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/main/*" element={<Router />} />
                <Route index element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

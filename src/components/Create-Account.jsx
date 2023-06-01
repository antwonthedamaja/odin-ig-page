/* eslint-disable react/prop-types */
import React from 'react';
import Logo from '../assets/logo.avif';

export default function Create(props) {
    return <div id="login">
        <div id='logo-text'>Odingram</div>
        <img id='logo' src={Logo} />
        <input type='email' placeholder='Email' onChange={(e) => props.setEmail(e.target.value)} />
        <input type='password' placeholder='Password' onChange={(e) => props.setPassword(e.target.value)} />
        <input type='text' placeholder='Display name' onChange={(e) => props.setDisplayName(e.target.value)} maxLength="20" />
        <button id="create-button" onClick={props.createAccount}>Create Account</button>
        <a href="#" onClick={() => props.setState('login')}>{'Go back to login'}</a>
    </div>;
}
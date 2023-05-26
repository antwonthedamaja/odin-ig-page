/* eslint-disable react/prop-types */
import React from 'react';

export default function Create(props) {
    return <div id="login">
        <input type='email' placeholder='Email' onChange={(e) => props.setEmail(e.target.value)} />
        <input type='password' placeholder='Password' onChange={(e) => props.setPassword(e.target.value)} />
        <button onClick={props.createAccount}>Create Account</button>
        <a href="#" onClick={() => props.setState('login')}>{'Go back to login'}</a>
    </div>;
}
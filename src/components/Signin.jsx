/* eslint-disable react/prop-types */
import React from 'react';
import Logo from '../assets/logo.avif';

export default function Signin(props) {
    return <div id='login'>
        <div id='logo-text'>Odingram</div>
        <img id='logo' src={Logo} />
        <input type='email' placeholder='Email' onChange={(e) => props.setEmail(e.target.value)} />
        <input type='password' placeholder='Password' onChange={(e) => props.setPassword(e.target.value)} />
        <button onClick={props.signIn}>Sign-in</button>
        <button onClick={props.signInWithGoogle}>Sign-in with Google</button>
        <a href="#" onClick={() => props.setState('create')}>{"Don't have an account? Create one here."}</a>
    </div>;
}
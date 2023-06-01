import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
import Create from './Create-Account';
import BlankPic from '../assets/blank-profile-picture.webp';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [state, setState] = useState('login');
    const [displayName, setDisplayName] = useState('');

    async function signIn() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            return console.error(err);
        }
        navigate('/main'), { replace: true };
    }

    async function signInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            return console.error(err);
        }
        navigate('/main'), { replace: true };
    }

    async function createAccount() {
        if (email && password && displayName) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (err) {
                return console.error(err);
            }

            try {
                await updateProfile(auth.currentUser, {
                    displayName: displayName, photoURL: BlankPic
                });
            } catch (err) {
                return console.error(err);
            }
            navigate('/main'), { replace: true };
        }
    }

    return <main id='login-container'>
        {state === 'login' ? <Signin setEmail={setEmail} setPassword={setPassword} signIn={signIn} 
        signInWithGoogle={signInWithGoogle} setState={setState} /> :
        <Create setEmail={setEmail} setPassword={setPassword} createAccount={createAccount} setState={setState}
        setDisplayName={setDisplayName} />}
    </main>;
}
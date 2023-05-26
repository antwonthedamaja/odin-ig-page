import React, { useState } from 'react';
import '../style/Login.css';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
import Create from './Create';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [state, setState] = useState('login');

    async function signIn() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        } finally {
            navigate('/main');
        }
    }

    async function signInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        } finally {
            navigate('/main');
        }
    }

    async function createAccount() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        } finally {
            navigate('/main');
        }
    }

    return <main id='login-container'>
        {state === 'login' ? <Signin setEmail={setEmail} setPassword={setPassword} signIn={signIn} signInWithGoogle={signInWithGoogle} setState={setState} /> :
        <Create createAccount={createAccount} setState={setState} />}
    </main>;
}
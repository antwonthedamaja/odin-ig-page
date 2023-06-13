import React, { useState } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, 
createUserWithEmailAndPassword, updateProfile, getAdditionalUserInfo } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Signin from './Signin';
import Create from './Create-Account';
import BlankPic from '../assets/blank-profile-picture.webp';
import { db } from '../firebaseConfig';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [state, setState] = useState('login');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);

    async function signIn() {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        navigate('/main'), { replace: true };
    }

    async function signInWithGoogle() {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const details = getAdditionalUserInfo(result);
            if (details.isNewUser) {
                const nameRef = doc(db, 'usernames', auth.currentUser.uid);
                await setDoc(nameRef, {
                    name: auth.currentUser.displayName
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        navigate('/main'), { replace: true };
    }

    async function createAccount() {
        if (email && password && displayName) {
            setLoading(true);
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(auth.currentUser, {
                    displayName: displayName, photoURL: BlankPic
                });
                const nameRef = doc(db, 'usernames', auth.currentUser.uid);
                await setDoc(nameRef, {
                    name: displayName
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
            navigate('/main'), { replace: true };
        }
    }

    return <main id='login-container'>
        {state === 'login' ? <Signin setEmail={setEmail} setPassword={setPassword} signIn={signIn} 
        signInWithGoogle={signInWithGoogle} setState={setState} loading={loading} /> :
        <Create setEmail={setEmail} setPassword={setPassword} createAccount={createAccount} setState={setState}
        setDisplayName={setDisplayName} loading={loading} />}
    </main>;
}
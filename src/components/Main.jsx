import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Main() {

    async function logout() {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return <button onClick={logout}>Sign-out</button>;
}
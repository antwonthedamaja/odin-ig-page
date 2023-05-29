import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    async function logOut() {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        } finally {
            navigate('/login', { replace: true });
        }
    }

    return <header>
        <button onClick={logOut}>Sign-out</button>
    </header>;
}
import React from 'react';
// import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.avif';
import Home from '../assets/home-account.svg';
import Add from '../assets/plus-thick.svg';
import { auth } from '../firebaseConfig';

export default function Header() {
    const navigate = useNavigate();

    // async function logOut() {
    //     try {
    //         await signOut(auth);
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         navigate('/login', { replace: true });
    //     }
    // }

    return <header>
        <div id='header-logo'>
            <img src={Logo} />
            <div>Odingram</div>
        </div>
        <nav id='nav'>
            <img src={Add} onClick={() => navigate('/main/post', { replace: true })} />
            <img src={Home} onClick={() => navigate('/main', { replace: true })} />
            <div onClick={() => navigate('/main/account', { replace: true })}>
                <img src={auth.currentUser.photoURL} />
                <div>{auth.currentUser.displayName}</div>
            </div>
        </nav>
        {/* <button onClick={logOut}>Sign-out</button> */}
    </header>;
}
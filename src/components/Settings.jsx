import React, { useState, useRef } from 'react';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';

export default function Post() {
    const [image, setImage] = useState(auth.currentUser.photoURL);
    const inputElement = useRef();

    function clickInput() {
        inputElement.current.click();
    }

    function uploadImage(e) {
        if (e.target.files[0]) {
            const newPicture = URL.createObjectURL(e.target.files[0]);
            setImage(newPicture);
        }
    }

    async function updateAccount() {
        try {
            await updateProfile(auth.currentUser, {
                displayName: document.querySelector('#newname').value || auth.currentUser.displayName, photoURL: image
            });
        } catch (err) {
            return console.error(err);
        }
    }

    return <main id='account-settings-container'>
        <div id='account-settings'>
            <div id="settings-container">
                <div id="pfp-container">
                    <b>Change picture:</b>
                    <img id="pfp" src={image} onClick={clickInput}/>
                    <input ref={inputElement} onChange={uploadImage} style={{display: 'none'}} 
                    type="file" accept="image/jpg, image/jpeg, image/png, image/webp" />
                </div>
                <div>
                    <span><b>Current display name:</b> {auth.currentUser.displayName}</span>
                    <input type='text' placeholder="New display name" id="newname" maxLength="20" />
                </div>
            </div>
            <div id="update-container">
                <button id="update" onClick={updateAccount}>Update profile</button>
            </div>
        </div>
    </main>;
}
import React, { useState, useRef } from 'react';
import { auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Post() {
    const [image, setImage] = useState(auth.currentUser.photoURL);
    const [type, setType] = useState('');
    const [uploading, setUploading] = useState(false);
    const [name, setName] = useState('');
    const inputImage = useRef();

    function clickInput() {
        inputImage.current.click();
    }

    function uploadImage(e) {
        if (e.target.files[0]) {
            const newPicture = URL.createObjectURL(e.target.files[0]);
            setImage(newPicture);
            setType(e.target.files[0].type);
        }
    }

    async function updateAccount() {
        if (image != auth.currentUser.photoURL) {
            setUploading(true);
            try {
                const response = await fetch(image);
                const data = await response.blob();
                const pfpRef = ref(storage, `images/pfps/${auth.currentUser.uid}`);
                const metadata = { contentType: type };
                const pfpUpload = await uploadBytes(pfpRef, data, metadata);
                const newPfp = await getDownloadURL(pfpUpload.ref);
                await updateProfile(auth.currentUser, {
                    displayName: name || auth.currentUser.displayName, photoURL: newPfp
                });
            } catch (err) {
                return console.error(err);
            }
            alert('success');
            setUploading(false);
        } else {
            setUploading(true);
            try {
                await updateProfile(auth.currentUser, {
                    displayName: name || auth.currentUser.displayName, photoURL: image
                });
            } catch (err) {
                console.error(err);
            }
            alert('name changed');
            setUploading(false);
        }
    }

    return <main id='account-settings-container'>
        <div id='account-settings'>
            <div id="settings-container">
                <div id="pfp-container">
                    <b>Change picture:</b>
                    <img id="pfp" src={image} onClick={clickInput} />
                    <input ref={inputImage} onChange={uploadImage} style={{display: 'none'}} 
                    type="file" accept="image/jpg, image/jpeg, image/png, image/webp" />
                </div>
                <div>
                    <span><b>Current display name:</b> {auth.currentUser.displayName}</span>
                    <input type='text' placeholder="New display name" maxLength="20" 
                    onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>
            <div id="update-container">
                <button id="update" disabled={uploading} onClick={updateAccount}>Update profile</button>
            </div>
        </div>
    </main>;
}
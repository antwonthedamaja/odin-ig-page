import React, { useState, useRef } from 'react';
import { storage } from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v1 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { setDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function CreatePost() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [text, setText] = useState('');
    const inputElement = useRef();
    const navigate = useNavigate();

    function clickInput() {
        inputElement.current.click();
    };

    function uploadImage(e) {
        if (e.target.files[0]) {
            const newPicture = URL.createObjectURL(e.target.files[0]);
            setImage(newPicture);
        }
    }

    async function submitPost() {
        setLoading(true);
        const id = v1();
        try {
            const blob = await fetch(image).then(r => r.blob());
            const postImgRef = ref(storage, `images/posts/${id}`);
            const postImgUpload = await uploadBytes(postImgRef, blob);
            const newPostImg = await getDownloadURL(postImgUpload.ref);
            const postRef = doc(db, 'posts', id);
            await setDoc(postRef, {
                text: text,
                imageURL: newPostImg,
                createdAt: serverTimestamp()
            });
        } catch (err) {
            return console.error(err);
        }
        alert('Post submitted');
        navigate('/main');
    }

    function buttonToggle() {
        if (!image || loading) {
            return <button disabled={true} id='submit-post'
            onClick={submitPost}>Submit?</button>;
        } else {
            return <button disabled={false} id='submit-post'
            onClick={submitPost}>Submit?</button>;
        }
    }

    return <main id='create-post-container'>
        <div id='post-box'>
            <div id='upload-image-container' className={image ? '' : 'inactive'} onClick={clickInput}>
                {!image ? <output>Add image to post</output> : <img id='preview' src={image} />}
            </div>
            <input ref={inputElement} onChange={uploadImage} style={{display: 'none'}} 
            type="file" accept="image/jpg, image/jpeg, image/png, image/webp" />
            <textarea id='post-text' maxLength='300' onChange={(e) => setText(e.target.value)}></textarea>
            {buttonToggle()}
        </div>
    </main>;
}
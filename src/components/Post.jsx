import React, { useState, useRef } from 'react';
import '../style/Post.css';

export default function Post() {
    const [image, setImage] = useState(false);
    const inputElement = useRef();

    function clickInput() {
        inputElement.current.click();
    };

    function uploadImage(e) {
        if (e.target.files[0]) {
            const newPicture = URL.createObjectURL(e.target.files[0]);
            setImage(newPicture);
        }
    }

    return !image ? <main id='create-post-container'>
        <div id='post-box'>
            <div id='upload-image-container' className='inactive' onClick={clickInput}>
                <output>Add image to post</output>
            </div>
            <input ref={inputElement} onChange={uploadImage} id='file' type="file" accept="image/jpg, image/jpeg, image/png, image/webp" />
            <textarea id='post-text'></textarea>
        </div>
    </main> : <main id='create-post-container'>
        <div id='post-box'>
            <div id='upload-image-container' className='active' onClick={clickInput}>
                <img id="preview" src={image} />
            </div>
            <input ref={inputElement} onChange={uploadImage} id='file' type="file" accept="image/jpg, image/jpeg, image/png, image/webp" />
            <textarea id='post-text' maxLength='300'></textarea>
            <button id='submit-post'>Submit?</button>
        </div>
    </main>;
}
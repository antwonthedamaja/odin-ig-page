import React from 'react';
import '../style/Post.css';

export default function Post() {

    function uploadImage(e) {
        const output = document.querySelector('output');
        output.textContent = '';
        const image = document.querySelector('#preview');
        image.src = URL.createObjectURL(e.target.files[0]);
        const container = document.querySelector('#upload-image-container');
        container.classList.remove('active');
    }

    return <main id='create-post-container'>
        <div id='post-box' onClick={() => document.querySelector('#file').click()}>
            <div id='upload-image-container' className='active'>
                <output>Add image to post</output>
                <img id="preview" />
            </div>
            <input onChange={uploadImage} id='file' type="file" accept="image/*" />
        </div>
    </main>;
}
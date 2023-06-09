/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { storage } from '../firebaseConfig';
import { ref, deleteObject } from 'firebase/storage';
import { v1 } from 'uuid';
import Reply from './Reply';
import { useNavigate } from 'react-router-dom';

export default function Posts(props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState('');
    const navigate = useNavigate();

    async function submitReply() {
        setLoading(true);
        const id = v1();
        try {
            const replyRef = doc(db, `posts/${props.id}/replies`, id);
            await setDoc(replyRef, {
                reply: reply,
                createdBy: auth.currentUser.uid,
                createdAt: serverTimestamp()
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        alert('Reply posted');
        navigate('/main/redirect'), { replace: true };
    }

    async function deletePost() {
        if (auth.currentUser.uid === props.fields.createdBy.stringValue) {
            try {
                await deleteDoc(doc(db, 'posts', props.id));
                for await (const replyRef of props.replies) {
                    await deleteDoc(doc(db, `posts/${props.id}/replies`, replyRef.id));
                }
                const imageRef = ref(storage, `images/posts/${props.id}`);
                await deleteObject(imageRef);
            } catch (err) {
                console.error(err);
                alert('Post failed to delete');
            }
            alert('Post successfully deleted');
            navigate('/main/redirect'), { replace: true };
        }
    }

    return <div className='post'>
        <div className='name-container'>
            <img src={props.fields.pfpURL.stringValue} />
            <span><b>{props.fields.createdByDisplayName}</b></span>
            <span>{props.fields.createdAt.timestampValue.slice(0, 10)}</span>
            {auth.currentUser.uid === props.fields.createdBy.stringValue ? <div className='delete-button' 
            onClick={deletePost}><u>Delete post?</u></div> : null}
        </div>
        <div className='img-container'>
            <div className="white-mask">
                <img src={props.fields.imageURL.stringValue} />
            </div>
        </div>
        <div className='description'>
            <b>{props.fields.createdByDisplayName + ' '}</b>{props.fields.text.stringValue + ' '}
            <span className='date'>{' ' + props.fields.createdAt.timestampValue.slice(0, 10)}</span>
        </div>

        {open ? <>
            <div className='replies'>
                {props.replies.map(reply => {
                    return <Reply key={reply.id} fields={reply._document.data.value.mapValue.fields} docid={props.id}
                    uid={reply._document.data.value.mapValue.fields.createdBy.stringValue} replyid={reply.id} />;
                })}
            </div>
            <div className='post-reply-container'>
                <img src={auth.currentUser.photoURL} />
                <input type='text' placeholder='Comment' maxLength='250' onChange={(e) => setReply(e.target.value)} />
                <button disabled={loading} onClick={submitReply}>Post</button>
            </div>
            <div className='reply-button open-replies' onClick={() => setOpen(false)}>[<u>Hide replies?</u>]</div>
        </> : <>
            <div className='replies'>
                {props.replies.slice(0, 3).map(reply => {
                    return <Reply key={reply.id} fields={reply._document.data.value.mapValue.fields} docid={props.id}
                    uid={reply._document.data.value.mapValue.fields.createdBy.stringValue} replyid={reply.id} />;
                })}
            </div>
            <div className='reply-button' onClick={() => setOpen(true)}>[<u>Show more?</u>]</div>
        </>}
    </div>;
}
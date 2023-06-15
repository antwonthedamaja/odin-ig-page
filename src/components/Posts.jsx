/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { v1 } from 'uuid';
import Reply from './Reply';
import { useNavigate } from 'react-router-dom';

export default function Posts(props) {
    const [state, setState] = useState(false);
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
                pfpURL: auth.currentUser.photoURL,
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

    return <div className='post'>
        <div className='name-container'>
            <img src={props.fields.pfpURL.stringValue} />
            <span><b>{props.fields.createdBy.stringValue}</b></span>
            <span>{props.fields.createdAt.timestampValue.slice(0, 10)}</span>
        </div>
        <div className='img-container'>
            <div className="white-mask">
                <img src={props.fields.imageURL.stringValue} />
            </div>
        </div>
        <div className='description'>
            <b>{props.fields.createdBy.stringValue + ' '}</b>{props.fields.text.stringValue + ' '}
            <span className='date'>{' ' + props.fields.createdAt.timestampValue.slice(0, 10)}</span>
        </div>
        {state ? <>
            <div className='replies'>
                {props.replies.map(reply => {
                    return <Reply key={reply.id} fields={reply._document.data.value.mapValue.fields} docid={props.id}
                    uid={reply._document.data.value.mapValue.fields.createdBy.stringValue} replyid={reply.id} />;
                })}
            </div>
            <div className='post-reply-container'>
                <img src={props.fields.pfpURL.stringValue} />
                <input type='text' placeholder='Comment' maxLength='250' onChange={(e) => setReply(e.target.value)} />
                <button disabled={loading} onClick={submitReply}>Post</button>
            </div>
            <div className='reply-button open-replies' onClick={() => setState(false)}>[<u>Hide replies?</u>]</div>
        </> : <>
            <div className='replies'>
                {props.replies.slice(0, 3).map(reply => {
                    return <Reply key={reply.id} fields={reply._document.data.value.mapValue.fields} docid={props.id}
                    uid={reply._document.data.value.mapValue.fields.createdBy.stringValue} replyid={reply.id} />;
                })}
            </div>
            <div className='reply-button' onClick={() => setState(true)}>[<u>Show more replies?</u>]</div>
        </>}
    </div>;
}
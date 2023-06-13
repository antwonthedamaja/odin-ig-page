/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, orderBy, query, serverTimestamp} from 'firebase/firestore';
import { v1 } from 'uuid';

export default function Post(props) {
    const [state, setState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState('');

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
        navigate('/main'), { replace: true };
    }

    return <div className='post'>
        <div className='name-container'>
            <img src={props.fields.pfpURL.stringValue} />
            <span><b>{props.fields.createdBy.stringValue}</b></span>
            <span>{props.fields.createdAt.timestampValue.slice(0, 10)}</span>
        </div>
        <div className='img-container'>
            <img src={props.fields.imageURL.stringValue} />
        </div>
        <div className='description'><b>{props.fields.createdBy.stringValue + ' '}</b>{props.fields.text.stringValue}</div>
        {state ? <>
            <div className='replies'>
                <div className='post-reply-container'>
                    <img src={props.fields.pfpURL.stringValue} />
                    <input type='text' placeholder='Comment' maxLength='300' onChange={(e) => setReply(e.target.value)} />
                    <button disabled={loading} onClick={submitReply}>Post</button>
                </div>
                <div className='reply-container'>
                    {props.replies.map(reply => {
                        const replyFields = reply._document.data.value.mapValue.fields;
                        return <div key={reply.id}>{replyFields.createdBy.stringValue + ': ' + replyFields.reply.stringValue}</div>;
                    })}
                </div>
            </div>
            <div className='reply-button open-replies' onClick={() => setState(false)}>[<u>Hide Replies?</u>]</div>
        </> :
        <div className='reply-button' onClick={() => setState(true)}>[<u>Show Replies?</u>]</div>}
    </div>;
}
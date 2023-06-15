/* eslint-disable react/prop-types */
import React from 'react';
import { db, auth } from '../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Reply(props) {
    const navigate = useNavigate();

    async function deleteReply() {
        if (auth.currentUser.uid === props.uid) {
            try {
                await deleteDoc(doc(db, `posts/${props.docid}/replies`, props.replyid));
            } catch (err) {
                console.error(err);
                alert('Reply failed to delete');
            }
            alert('Reply deleted successfully');
            navigate('/main/redirect'), { replace: true };
        }
    }

    return <div className='reply'>
        <div className=''>
            <b>{props.fields.createdByDisplayName + ' '}</b>{props.fields.reply.stringValue + ' '}
            <span className='date'>{' ' + props.fields.createdAt.timestampValue.slice(0, 10)}</span>
        </div>
        {auth.currentUser.uid === props.uid ? <div className='delete-button' 
        onClick={deleteReply}><u>Delete?</u></div> : null}
    </div>;
}
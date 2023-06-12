/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export default function Post(props) {
    const [state, setState] = useState(false);

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
            <div className='reply-button open-replies' onClick={() => setState(false)}>[<u>Hide Replies?</u>]</div>
            <div className='replies'>
                <input type='text' placeholder='Comment' />
            </div>
        </> :
        <div className='reply-button' onClick={() => setState(true)}>[<u>Show Replies?</u>]</div>}
    </div>;
}
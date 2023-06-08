/* eslint-disable react/prop-types */
import React from 'react';

export default function Feed(props) {
    return <main id='feed-container'>
        {props.data.docs.map(doc => {
            const fields = doc._document.data.value.mapValue.fields;
            console.log(fields);
            return <div className='post' key={doc.id}>
                <div className='name-container'>
                    <span>{fields.createdBy.stringValue}</span>
                    <span>{fields.createdAt.timestampValue.slice(0, 10)}</span>
                </div>
                <div className='img-container'>
                    <img src={fields.imageURL.stringValue} />
                </div>
            </div>;
        })}
    </main>;
}
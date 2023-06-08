/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Feed(props) {
    const docs = props.data.docs;
    
    return <main id='feed-container'>
        {docs.map(doc => {
            const fields = doc._document.data.value.mapValue.fields;
            return <div>{fields.text.stringValue}</div>;
        })}
    </main>;
}
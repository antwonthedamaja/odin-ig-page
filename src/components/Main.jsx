/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Posts from './Posts';

export default function Main() {
    const [data, setData] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const feedRef = collection(db, 'posts');
                const sortedFeedRef = query(feedRef, orderBy('createdAt', 'desc'));
                const posts = await getDocs(sortedFeedRef);
                for await (const document of posts.docs) {
                    const nameRef = doc(db, 'usernames', document._document.data.value.mapValue.fields.createdBy.stringValue);
                    const name = await getDoc(nameRef);
                    document._document.data.value.mapValue.fields.createdBy.stringValue = 
                    name._document.data.value.mapValue.fields.name.stringValue;
                    const subColRef = collection(db, 'posts', document.id, 'replies');
                    const sortedSubColRef = query(subColRef, orderBy('createdAt', 'desc'));
                    const replyResponse = await getDocs(sortedSubColRef);
                    document._document.replies = replyResponse.docs;
                    if (document._document.replies.length > 0) {
                        for await (const reply of document._document.replies) {
                            const replyNameRef = doc(db, 'usernames', reply._document.data.value.mapValue.fields.createdBy.stringValue);
                            const replyName = await getDoc(replyNameRef);
                            reply._document.data.value.mapValue.fields.createdByDisplayName = 
                            replyName._document.data.value.mapValue.fields.name.stringValue;
                        }
                    }
                }
                setData(posts.docs);
            } catch (err) {
                console.error(err);
            }
        }

        getData();

    }, []);

    if (data) {
        return <main id='feed-container'>
            {data.map(doc => {
                return <Posts fields={doc._document.data.value.mapValue.fields} 
                replies={doc._document.replies} key={doc.id} id={doc.id} />;
        })}
        </main>;
    }
}
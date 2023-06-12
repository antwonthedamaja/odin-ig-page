import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, doc, orderBy, query} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Post from './Posts';

export default function Main() {
    const [data, setData] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const feedRef = collection(db, 'posts');
                const sortedRef = query(feedRef, orderBy('createdAt', 'desc'));
                const response = await getDocs(sortedRef);
                for await (const document of response.docs) {
                    const nameRef = doc(db, 'usernames', document._document.data.value.mapValue.fields.createdBy.stringValue);
                    const name = await getDoc(nameRef);
                    document._document.data.value.mapValue.fields.createdBy.stringValue = 
                    name._document.data.value.mapValue.fields.name.stringValue;
                }
                setData(response.docs);
            } catch (err) {
                console.error(err);
            }
        }
        getData();
    }, []);

    if (data) {
        return <main id='feed-container'>
            {data.map(doc => {
                const fields = doc._document.data.value.mapValue.fields;
                return <Post fields={fields} key={doc.id} />;
        })}
        </main>;
    }
}
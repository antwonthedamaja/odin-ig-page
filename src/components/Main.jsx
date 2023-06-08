import React, { useState, useEffect } from 'react';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Feed from './Feed';

export default function Main() {
    const [data, setData] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const feedRef = collection(db, 'posts');
                const response = await getDocs(feedRef);
                for await (const document of response.docs) {
                    const nameRef = doc(db, 'usernames', document._document.data.value.mapValue.fields.createdBy.stringValue);
                    const name = await getDoc(nameRef);
                    document._document.data.value.mapValue.fields.createdBy.stringValue = 
                    name._document.data.value.mapValue.fields.name.stringValue;
                }
                setData(response);
            } catch (err) {
                console.error(err);
            }
        }
        getData();
    }, []);

    if (data) {
        return <Feed data={data} />;
    }
}
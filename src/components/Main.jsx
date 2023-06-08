import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Feed from './Feed';

export default function Main() {
    const [data, setData] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const feedRef = collection(db, 'posts');
                const response = await getDocs(feedRef);
                console.log(response);
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
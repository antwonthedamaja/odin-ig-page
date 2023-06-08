import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Feed() {

    async function getFeed() {
        try {
            const feedRef = collection(db, 'posts');
            await getDocs(feedRef);
        } catch (err) {
            console.error(err);
        }
    }

    return <main id='feed-container'>
        
    </main>;
}
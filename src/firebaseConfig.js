import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBKrAGVB5qfsDsfeTQJ2nR-J7JWtXDqOrs',
  authDomain: 'odin-ig-page.firebaseapp.com',
  projectId: 'odin-ig-page',
  storageBucket: 'odin-ig-page.appspot.com',
  messagingSenderId: '740578172593',
  appId: '1:740578172593:web:b80f5482e164da6e0a0c90'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
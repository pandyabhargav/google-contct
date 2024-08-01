// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth ,GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCJh4JJfMwszjnZ53K7FnxU_fxc4TwCi3E",
    authDomain: "contact-34b06.firebaseapp.com",
    projectId: "contact-34b06",
    storageBucket: "contact-34b06.appspot.com",
    messagingSenderId: "905717918197",
    appId: "1:905717918197:web:df44eb1623677e7aea18bc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { googleProvider, signInWithPopup };

export { db,auth, collection, addDoc, getDocs, getDoc, deleteDoc, doc, updateDoc };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbA-mxFvrx050tpvloMyVZQcL6QxQ95wo",
  authDomain: "aspect-6d09e.firebaseapp.com",
  projectId: "aspect-6d09e",
  storageBucket: "aspect-6d09e.firebasestorage.app",
  messagingSenderId: "620005207247",
  appId: "1:620005207247:web:a42c9bb2beab8996e49bba",
  measurementId: "G-J1V62S3Q5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
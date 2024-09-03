// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmNJMG9QkA3bzwe4BZwdFHk5ZRsGInSc8",
  authDomain: "web-escuela-590d5.firebaseapp.com",
  projectId: "web-escuela-590d5",
  storageBucket: "web-escuela-590d5.appspot.com",
  messagingSenderId: "526575231837",
  appId: "1:526575231837:web:6768bc4f99f4b25dc77eb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
};

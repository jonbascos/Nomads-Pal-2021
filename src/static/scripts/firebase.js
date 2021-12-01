import {useState, useEffect} from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

// Sign up a new user
export function signup (email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

// Sign in a user with Email and Password
export function signin (email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

// Sign out current user
export function signout(){
  signOut(auth)
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
      const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
      return unsub
  },[])
  return currentUser
}

export default getFirestore()

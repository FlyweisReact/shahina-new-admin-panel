/** @format */

import HOC from "../../layout/HOC";
import { useEffect, useState } from "react";
import "firebase/auth";
import "firebase/firestore";
import firebase 

firebase.initializeApp({
  apiKey: "AIzaSyC4hyCyozCG8hlv4hYzXQ9YzAbTdro2YtU",
  authDomain: "shahina-skincare.firebaseapp.com",
  projectId: "shahina-skincare",
  storageBucket: "shahina-skincare.appspot.com",
  messagingSenderId: "275323700379",
  appId: "1:275323700379:web:866b4acc68575e0305b23e",
  measurementId: "G-F1MPXLTRQ0",
});

const auth = firebase.auth();
const db = firebase.firestore();

const Chat = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e.message);
    }
  };

  if (initializing) return "Loading...";

  return user ? (
    <>
      <button onClick={signOut}>Sign Out</button>
      <p>Welcome to the chat</p>
    </>
  ) : (
    <button onClick={() => signInWithGoogle()}> sing in with google </button>
  );
};

export default HOC(Chat);

/** @format */

import HOC from "../../layout/HOC";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC4hyCyozCG8hlv4hYzXQ9YzAbTdro2YtU",
  authDomain: "shahina-skincare.firebaseapp.com",
  projectId: "shahina-skincare",
  storageBucket: "shahina-skincare.appspot.com",
  messagingSenderId: "275323700379",
  appId: "1:275323700379:web:866b4acc68575e0305b23e",
  measurementId: "G-F1MPXLTRQ0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  };

  if (initializing) return "Loading...";

  return user ? (
    "Welcome to the chat"
  ) : (
    <button onClick={() => signInWithGoogle()}> sing in with google </button>
  );
};

export default HOC(Chat);

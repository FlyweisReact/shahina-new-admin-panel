/** @format */

import HOC from "../../layout/HOC";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyC4hyCyozCG8hlv4hYzXQ9YzAbTdro2YtU",
  authDomain: "shahina-skincare.firebaseapp.com",
  projectId: "shahina-skincare",
  storageBucket: "shahina-skincare.appspot.com",
  messagingSenderId: "275323700379",
  appId: "1:275323700379:web:866b4acc68575e0305b23e",
  measurementId: "G-F1MPXLTRQ0",
});


const Chat = () => {
  const [ users]

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.useDeviceLanguage()
    try{
      await auth.signInWithPopup(provider)
    }catch (e){
      console.log(e)
    }
  };

  return (
    <button onClick={() => signInWithGoogle()}> sing in with google </button>
  );
};

export default HOC(Chat);

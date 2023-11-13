/** @format */

import HOC from "../../layout/HOC";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "./firebase";

const Chat = () => {

  


  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={handleGoogleLogin}> Login with Google </button>
    </>
  );
};

export default HOC(Chat);

/** @format */

import HOC from "../../layout/HOC";
import { useEffect, useState } from "react";
import { auth, firestore } from "./firebase";
import { GoogleAuthProvider , signInWithPopup  } from 'firebase/auth'
import { doc , setDoc , getFirestore , getDoc , onSnapshot  } from 'firebase/firestore'


const Chat = () => {

  const handleGoogleLogin = () => {
    const provider  = new GoogleAuthProvider()

    try{

    }catch (err){
      console.log(err)
    }
  }

  return (
   <></>
  );
};

export default HOC(Chat);

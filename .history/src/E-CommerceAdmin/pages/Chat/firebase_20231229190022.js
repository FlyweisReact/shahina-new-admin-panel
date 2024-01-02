/** @format */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.React_App_Baseurl,
  authDomain: process.env.React_App_Baseurl,
  projectId: process.env.React_App_Baseurl,
  storageBucket: process.env.React_App_Baseurl,
  messagingSenderId: process.env.React_App_Baseurl,
  appId: process.env.React_App_Baseurl,
  measurementId: "G-F1MPXLTRQ0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
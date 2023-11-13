/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import firebase from "firebase/app";
import "firebase/firestore";

const Chat = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDj6i6NITRZ3lg8W4SmpR9c7fUg3GaWJg4",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "shahina-skincare",
    storageBucket: "shahina-skincare.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "1:275323700379:android:655f0bbb9e2aa40505b23e",
  };

  const firebaseConfig = {
    // your config object here
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  return <div></div>;
};

export default HOC(Chat);

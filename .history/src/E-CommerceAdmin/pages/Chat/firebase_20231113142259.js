/** @format */

import firebase from "firebase/app";
import "firebase/firestore"; // Import other Firebase services as needed
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDj6i6NITRZ3lg8W4SmpR9c7fUg3GaWJg4",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "shahina-skincare",
  storageBucket: "shahina-skincare.appspot.com",
  messagingSenderId: "275323700379",
  appId: "1:275323700379:android:655f0bbb9e2aa40505b23e",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

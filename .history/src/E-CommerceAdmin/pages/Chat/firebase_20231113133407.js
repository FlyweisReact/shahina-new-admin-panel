/** @format */

import firebase from "firebase/app";
import "firebase/firestore"; // Import other Firebase services as needed

const firebaseConfig = {
  // your config object here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

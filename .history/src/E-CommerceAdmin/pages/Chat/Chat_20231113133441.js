/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import "firebase/firestore";
import './firebase'

const Chat = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDj6i6NITRZ3lg8W4SmpR9c7fUg3GaWJg4",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "shahina-skincare",
    storageBucket: "shahina-skincare.appspot.com",
    messagingSenderId: "275323700379",
    appId: "1:275323700379:android:655f0bbb9e2aa40505b23e",
  };

  firebase.initializeApp(firebaseConfig);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const snapshot = await db.collection("messages").get();
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
    };

    fetchData();
  }, []);
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default HOC(Chat);

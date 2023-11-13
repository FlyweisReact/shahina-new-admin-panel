/** @format */

import HOC from "../../layout/HOC";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // You can fetch existing messages here
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const db = firebase.firestore();
      await db.collection("messages").add({
        text: newMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
        userName: user.displayName,
      });
      setNewMessage("");
    }
  };

  return <></>;
};

export default HOC(Chat);

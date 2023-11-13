/** @format */

import HOC from "../../layout/HOC";
import { useEffect, useState } from "react";
import { auth , firestore} from './firebase'

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
      const db = firestore();
      await db.collection("messages").add({
        text: newMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
        userName: user.displayName,
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.userName}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default HOC(Chat);

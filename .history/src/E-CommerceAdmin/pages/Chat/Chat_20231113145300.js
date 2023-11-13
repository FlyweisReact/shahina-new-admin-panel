/** @format */

import HOC from "../../layout/HOC";
import { useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        // Fetch all messages when the user is authenticated
        const messagesRef = firestore.collection('messages');
        const unsubscribeMessages = messagesRef.onSnapshot((snapshot) => {
          const fetchedMessages = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(fetchedMessages);
        });

        return () => unsubscribeMessages();
      } else {
        setUser(null);
        setMessages([]); // Clear messages when the user logs out
      }
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const messageRef = await firestore.collection('messages').add({
          text: newMessage,
          timestamp: new Date(),
          userId: user.uid,
          userName: user.displayName,
        });
        console.log('Message sent with ID: ', messageRef.id);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  console.log(messages)

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

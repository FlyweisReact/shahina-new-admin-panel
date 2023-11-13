/** @format */

import HOC from "../../layout/HOC";
import { useEffect, useState } from "react";
import { auth, firestore } from "./firebase";
import { GoogleAuthProvider , signInWithPopup  } from 'firebase/auth'
import { doc , setDoc , getFirestore , getDoc , onSnapshot  } from 'firebase/firestore'


const Chat = () => {


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

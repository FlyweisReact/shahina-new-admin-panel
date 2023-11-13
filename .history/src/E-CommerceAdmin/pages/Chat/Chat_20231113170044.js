/** @format */

import HOC from "../../layout/HOC";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import Message from "./Message";
import { auth, db } from "./firebase";

const Chat = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [uid, setUid] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    if (user) {
      setUid(user?.uid);
      setDisplayName(user?.displayName);
      setPhotoURL(user?.photoURL);
    }
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "messages"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, [db]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };

  if (initializing) return "Loading...";

  console.log(messages)

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (db) {
      try {
        const messageData = {
          message: newMessage,
          createdAt: serverTimestamp(),
          userID: uid,
          photoURL,
          displayName,
        };

        if (replyingTo) {
          messageData.replyTo = {
            userID: replyingTo.userID,
            displayName: replyingTo.displayName,
          };
        }

        await addDoc(collection(db, "messages"), messageData);
        setNewMessage("");
        setReplyingTo(null);
      } catch (error) {
        console.error("Error adding message:", error);
      }
    }
  };

  const handleReply = (userToReplyTo) => {
    setReplyingTo({
      userID: userToReplyTo.userID,
      displayName: userToReplyTo.displayName,
    });
  };

  return (
    <>
      {user ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <p>Welcome to the chat</p>
        </>
      ) : (
        <button onClick={() => googleSignIn()}> sing in with google </button>
      )}

      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button type="submit">Submit</button>
      </form>

      <main className="chat-box">
        <div className="messages-wrapper">
          {messages?.map((message) => (
            <Message
              key={message.id}
              message={message}
              onReply={() => handleReply(message)}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default HOC(Chat);

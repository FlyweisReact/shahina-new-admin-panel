/** @format */

import HOC from "../../layout/HOC";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  getDocs,
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
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (user) {
      setUid(user?.uid);
      setDisplayName(user?.displayName);
      setPhotoURL(user?.photoURL);
    }
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "Chat"));
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

  // Get All Document Of Collection
  const fetchChatDocuments = async () => {
    const chatCollectionRef = collection(db, "Chat");

    try {
      const snapshot = await getDocs(chatCollectionRef);
      setCollections(snapshot.docs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchChatDocuments();
  }, []);

  console.log(cole)
  // ---------------

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const documentRef = doc(db, "Chat", collectionId);
    try {
      await updateDoc(documentRef, {
        reply: arrayUnion(newMessage),
      });

      console.log("New string added to the reply array!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Get All Collection

  const fetchHandler = async () => {};

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
          {messages?.map((message, index) => (
            <Message
              key={index}
              message={message}
              setCollectionId={setCollectionId}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default HOC(Chat);

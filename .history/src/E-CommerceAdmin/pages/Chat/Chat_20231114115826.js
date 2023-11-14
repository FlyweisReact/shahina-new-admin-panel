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
  getDoc,
} from "firebase/firestore";
import Message from "./Message";
import { auth, db } from "./firebase";

const Chat = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState([]);
  const [document, setDocument] = useState(null);

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
      const chatDataArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setCollections(chatDataArray);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchChatDocuments();
  }, []);

  // ---------------

  // Get Single Document
  const fetchDocumentData = async () => {
    const documentRef = doc(db, "Chat", "1");
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        setDocument(documentSnapshot.data());
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    fetchDocumentData();
  }, []);
  // ------------------

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  if (initializing) return "Loading...";

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const documentRef = doc(db, "Chat", collectionId);
    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const existingData = documentSnapshot.data();
        const updatedReply = [
          ...existingData.reply,
          { text: newMessage, type: "sender" },
        ];

        await updateDoc(documentRef, { reply: updatedReply });
        console.log("New string added to the reply array!");
      } else {
        console.log("Document does not exist!");
      }

      // await updateDoc(documentRef, {
      //   reply: arrayUnion(newMessage),
      //   type: "sender",
      // });
      // console.log("New string added to the reply array!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  console.log(messages);

  return (
    <>
    

      <section className="sectionCont">

      <div className="chat">
      <div>
        
      </div>

      </div>

      </section>
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

      {/* All COllection */}
      <div
        style={{ border: "1px solid black", padding: "10px", margin: "20px" }}
      >
        <ul>
          {collections?.map((i, index) => (
            <li key={index}> Collection : {i.id} </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HOC(Chat);

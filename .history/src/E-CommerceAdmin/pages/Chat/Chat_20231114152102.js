/** @format */

import HOC from "../../layout/HOC";
import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import ChatMenu from "./ChatMenu";
import SendMessage from "./SendMessage";

const Chat = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [collections, setCollections] = useState([]);
  const [document, setDocument] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, stPhotoUrl] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user?.displayName);
      stPhotoUrl(user?.photoURL);
    }
  }, [user]);

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
    return unsubscribe;
  }, [initializing]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // Get Single Document
  const fetchDocumentData = async () => {
    const documentRef = doc(db, "Chat", documentId);
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
  }, [documentId]);

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
    const documentRef = doc(db, "Chat", documentId);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    const recieverDetail = {
      avatar: photoURL,
      name: displayName,
    };

    try {
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const existingData = documentSnapshot.data();
        const updatedReply = [
          ...existingData.reply,
          { text: newMessage, type: "reciver", date: formattedDate },
        ];
        await updateDoc(documentRef, {
          reply: updatedReply,
          reciver: recieverDetail,
        });
        fetchDocumentData();
        setNewMessage("");
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4   w-full flex justify-between items-center">
          <span></span>
          {user ? (
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => handleSignOut()}
            >
              Sign Out
            </button>
          ) : (
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => googleSignIn()}
            >
              Sign In
            </button>
          )}
        </div>
            {console.log(documentId)}
        {user && (
          <div className="chat">
            <div className="sidebar">
              <ChatMenu
                collections={collections}
                setDocumentId={setDocumentId}
                documentId={documentId}
              />
            </div>
            <div className="content">
              <SendMessage
                document={document}
                setNewMessage={setNewMessage}
                handleOnSubmit={handleOnSubmit}
                newMessage={newMessage}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default HOC(Chat);

/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import "firebase/firestore";
import './firebase'

const Chat = () => {

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

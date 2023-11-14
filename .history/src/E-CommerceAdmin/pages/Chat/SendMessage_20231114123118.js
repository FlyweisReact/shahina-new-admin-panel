/** @format */
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {

  return (
    <form className="send-message" onSubmit={(event) => sendMessage(event)}>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
};
export default SendMessage;

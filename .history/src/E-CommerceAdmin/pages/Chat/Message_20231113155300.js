/** @format */

import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div className="chat-bubble__right">
        <p className="user-name"> {message?.userID} </p>
        <p className="user-message">{message?.message}</p>
      </div>
    </div>
  );
};
export default Message;

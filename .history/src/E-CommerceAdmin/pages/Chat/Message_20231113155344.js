/** @format */

import React from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  return (
    <div>
      <div className="chat-bubble__right">
        <p className="user-name">User Id : {message?.userID} </p>
        <p className="user-message"> Messgae :  {message?.message}</p>
        <p className="user-message">{message?.dateTime}</p>
      </div>
    </div>
  );
};
export default Message;

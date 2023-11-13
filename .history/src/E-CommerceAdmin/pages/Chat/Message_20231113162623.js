/** @format */

import React from "react";

const Message = ({ message }) => {
  return (
    <div>
      <div className="chat-bubble__right">
        <p className="user-name">User Id : {message?.userID} </p>
        <p className="user-message"> Message : {message?.message}</p>
        <p className="user-message"> Date and Time : {message?.dateTime}</p>
        <p className="user-message"> Display Name : {message?.displayName}</p>
        <p className="user-message"> Display Name : {message?.displayName}</p>
      </div>
    </div>
  );
};
export default Message;

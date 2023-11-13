/** @format */

import React from "react";

const Message = ({ message }) => {
  return (
    <div>
      <div className="chat-bubble__right">
        <p className="user-name">User Id : {message?.userID} </p>
        <p className="user-name">User Id : {message?.userID?.avatar} </p>
        <p className="user-message"> Message : {message?.message}</p>
        <p className="user-message"> Avatar : {message?.avatar}</p>
        <p className="user-message"> Date and Time : {message?.dateTime}</p>
      </div>
    </div>
  );
};
export default Message;

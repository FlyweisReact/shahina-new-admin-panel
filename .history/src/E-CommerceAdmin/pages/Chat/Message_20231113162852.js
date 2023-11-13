/** @format */

import React from "react";

const Message = ({ message }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <div className="chat-bubble__right">
        <p className="user-name">User Id : {message?.userID} </p>
        <p className="user-message"> Message : {message?.message}</p>
        <p className="user-message"> Date and Time : {message?.dateTime}</p>
        <p className="user-message"> Display Name : {message?.displayName}</p>
        <p className="user-message">
          {" "}
          Avatar :
          <img src={message?.photoURL} alt="" />
        </p>
      </div>
    </div>
  );
};
export default Message;

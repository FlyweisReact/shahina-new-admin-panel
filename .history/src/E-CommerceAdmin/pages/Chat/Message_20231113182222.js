/** @format */

import React from "react";

const Message = ({ message, onReply }) => {
  console.log()
  return (
    <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
      <div>
        <p> Sender Id : {message?.id}</p>
        <p> Sender User name : {message?.user?.name}</p>
        <p> Sendder User ID : {message?.user?.userId}</p>
        <p> Reciver User ID : {message?.user?.userId}</p>
      </div>

      <p>Sending Messages</p>
      {message?.Message?.message?.map((i, index) => (
        <li key={index}> {i} </li>
      ))}
      <p>Reciving Messages</p>
      {message?.reply?.map((i, index) => (
        <li key={index}> {i} </li>
      ))}

      {message?.replyTo && (
        <div className="reply-info">
          <p className="reply-label">Replying to:</p>
          <p className="reply-user">
            User ID: {message?.user?.name}, Name: {message?.user?.name}
          </p>
        </div>
      )}

      <button onClick={() => onReply(message)}>Reply</button>
    </div>
  );
};

export default Message;

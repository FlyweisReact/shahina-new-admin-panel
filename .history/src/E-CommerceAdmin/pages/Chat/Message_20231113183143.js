/** @format */

import React from "react";

const Message = ({ message ,setCollectionId }) => {
  console.log(message);
  return (
    <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
      <div>
        <p> Sender Id : {message?.id}</p>
        <p> Sender User name : {message?.user?.name}</p>
        <p> Sender User ID : {message?.user?.userId}</p>
        <p> Reciver User ID : {message?.user?.userId}</p>
      </div>

      <p>Sending Messages</p>
      {message?.message?.map((i, index) => (
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

      <button onClick={() => setCollectionId(message)}>Reply</button>
    </div>
  );
};

export default Message;

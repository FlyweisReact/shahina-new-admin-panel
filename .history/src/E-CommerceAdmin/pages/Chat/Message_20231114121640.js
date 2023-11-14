/** @format */

import React from "react";

const Message = ({ message, setCollectionId }) => {
  console.log(message)
  return (
    <div style={{ border: "1px solid black", padding: "20px", margin: "20px" }}>
  
 

      <p>Reciving Messages</p>
      {message?.reply?.map((i, index) => (
        <li key={index}> {i.text} </li>
        <li key={index}> {i.type} </li>
      ))}

      {/* {message?.replyTo && (
        <div className="reply-info">
          <p className="reply-label">Replying to:</p>
          <p className="reply-user">
            User ID: {message?.user?.name}, Name: {message?.user?.name}
          </p>
        </div>
      )} */}

      <button onClick={() => setCollectionId(message?.id)}>Reply</button>
    </div>
  );
};

export default Message;

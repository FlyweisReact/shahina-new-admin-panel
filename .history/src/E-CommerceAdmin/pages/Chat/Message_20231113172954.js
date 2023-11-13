/** @format */

import React from "react";

const Message = ({ message, onReply }) => {
  const formattedDateTime = new Date(
    message?.createdAt?.seconds * 1000
  ).toLocaleString();

  console.log(message)

  return (
    <div style={{ border: "1px solid black", padding: "20px" ,margin : '20px'}}>
      <div className="chat-bubble__right">
        <p className="user-name">User ID: {message?.userID} </p>
        <p className="user-message">Message: {message?.message}</p>
        <p className="user-message">Date and Time: {formattedDateTime}</p>
      </div>

      {message?.replyTo && (
        <div className="reply-info">
          <p className="reply-label">Replying to:</p>
          <p className="reply-user">
            User ID: {message.replyTo.userID}, Name:{" "}
            {message.replyTo.displayName}
          </p>
        </div>
      )}

      <button onClick={() => onReply(message)}>Reply</button>
    </div>
  );
};

export default Message;

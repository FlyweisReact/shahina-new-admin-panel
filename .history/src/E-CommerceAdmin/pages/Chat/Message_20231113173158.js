/** @format */

import React from "react";

const Message = ({ message, onReply }) => {
  const formattedDateTime = new Date(
    message?.createdAt?.seconds * 1000
  ).toLocaleString();

  console.log(message)

  return (
    <div style={{ border: "1px solid black", padding: "20px" ,margin : '20px'}}>
      

      <div>
      <p> </p>

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

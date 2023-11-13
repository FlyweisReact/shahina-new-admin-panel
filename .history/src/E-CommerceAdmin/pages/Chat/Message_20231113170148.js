/** @format */

import React from "react";

const Message = ({ message, onReply }) => {
  const formattedDateTime = new Date(
    message?.createdAt?.seconds * 1000
  ).toLocaleString();

  return (
    <div>
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

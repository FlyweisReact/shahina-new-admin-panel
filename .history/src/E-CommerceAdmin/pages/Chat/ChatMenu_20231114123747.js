/** @format */

import React from "react";

const ChatMenu = ({ collections, setDocumentId }) => {
  return (
    <>
      <aside className="p-4 h-auto">
        <nav className="menu-list">
          {collections?.map((nav, index) => {
            return (
              <span
                key={`chats${nav.id}${index}`}
                className="container"
                onClick={() => setDocumentId(i.id)}
              >
                <img src={nav?.data?.user?.avatar} alt="" />
                <p> {nav?.data?.user?.name} </p>
              </span>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default ChatMenu;

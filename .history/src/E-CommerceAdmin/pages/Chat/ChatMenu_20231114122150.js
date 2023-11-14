/** @format */

import React from "react";

const ChatMenu = ({ messages }) => {
  return (
    <>
      <aside className="p-4 h-auto" style={{ minHeight: "100vh" }}>
        <nav className="py-6  menu-list"  >
          {messages?.map((nav, index) => {
            return (
              <span key={index} className='container' >
               
              </span>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default ChatMenu;

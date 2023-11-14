/** @format */

import React from "react";

const ChatMenu = ({ collections }) => {
  return (
    <>
      <aside className="p-4 h-auto">
        <nav className="menu-list">
          {collections?.map((nav, index) => {
            return (
              <span key={index} className="container">
                <img src={nav?.data?.user?.avatar} alt="" />
                <p> {nav?.user?.name} </p>
              </span>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default ChatMenu;

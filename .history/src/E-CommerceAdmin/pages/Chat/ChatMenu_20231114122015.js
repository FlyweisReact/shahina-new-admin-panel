/** @format */

import React from "react";

const ChatMenu = ({ messages }) => {
  return (
    <>
      <aside className="p-4 h-auto" style={{ minHeight: "100vh" }}>
        <nav className="py-6">
          {messages?.map((nav, index) => {
            return (
              <span key={index} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav?.user?.name}
                </span>
              </span>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default ChatMenu;

/** @format */

import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

const ChatMenu = ({ messages }) => {
  console.log(messages);

  return (
    <>
      <aside className="p-4 h-auto" style={{ minHeight: "100vh" }}>
        <nav className="py-6">
          {messages?.map((nav , index) => {
            return (
              <span key={n} className="">
                <span className="flex my-3 items-center cursor-pointer text-gray-900    tracking-wider p-2 rounded-sm">
                  {nav.icon} {nav.name}
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

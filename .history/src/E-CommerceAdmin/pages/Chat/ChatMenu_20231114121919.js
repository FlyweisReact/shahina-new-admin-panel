/** @format */

import React from "react";
import { MdDashboardCustomize } from "react-icons/md";

const ChatMenu = ({ messages }) => {
  console.log(messages);
  const nav = messages?.map((i) => ({
    img: "",
    name: i.name,
  }));

  return (
    <>
      <aside className="p-4 h-auto" style={{ minHeight: "100vh" }}>
        <nav className="py-6">
          {nav.map((nav) => {
            return (
              <span key={nav.name} className="">
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

/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../../layout/HOC";

const CalenderNotification = () => {
  const [data, setData] = useState([]);

  const fetchHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/notification/all/AdminNotification`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <section className="sectionCont">
      <div className="calender_notification">
        {data?.map((i, index) => (
          <div className="container" key={index}>
            {i?.orderUserId?.image && (
              <img src={i?.orderUserId?.image} alt="" />
            )}
            <div className="content">
              <h6>{i.title}</h6>
              <p className="faded"> {i.createdAt?.slice(0, 10)} </p>
              <p>{i.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HOC(CalenderNotification);

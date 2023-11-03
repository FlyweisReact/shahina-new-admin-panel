/** @format */
import HOC from "../../layout/HOC";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import axios from "axios";

const Scheduler = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState([]);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data)
    } catch {}
  };


  useE

  const events = [
    {
      title: "Aivil Durate",
      start: new Date(2023, 10, 2, 10, 0),
      end: new Date(2023, 10, 2, 12, 0),
    },
    {
      title: "Sonia Khan",
      start: new Date(2023, 10, 4, 14, 0),
      end: new Date(2023, 10, 4, 16, 0),
    },
    {
      title: "Sonia Khan",
      start: new Date(2023, 10, 4, 14, 0),
      end: new Date(2023, 10, 4, 16, 0),
    },
    {
      title: "Eyebrows waxing and threat",
      start: new Date(2023, 10, 5, 20, 0),
      end: new Date(2023, 10, 7, 23, 0),
    },
  ];

  //   2023 Year
  // 10 Month
  // 4 date

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
};

export default HOC(Scheduler);

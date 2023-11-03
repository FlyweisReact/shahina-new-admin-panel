/** @format */
import HOC from "../../layout/HOC";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
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
      setData(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  function findYear(date) {
    return date?.substr(5, 10);
  }
  function findDate(date) {
    return date?.substr(4, 6);
  }
  function findMonth(date) {
    const number = date?.substr(0, 2);
    return parseFloat(number);
  }


  //   2023, 10, 7, 23, 0
  const events = data?.map((item) => ({
    title: item.orders?.map((i) => i.services?.map((n) => n.serviceId?.name)),
    start: new Date(2023, findMonth(item.date), 10, 23, 0),
    end: new Date(2023, findMonth(item.date), 10, 23, 0),
  }));

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

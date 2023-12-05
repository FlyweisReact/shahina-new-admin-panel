/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HOC from "../../layout/HOC";

const Calender = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleAddEvent = () => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setNewEvent({
      title: "",
      date: "",
    });
  };
  return <div></div>;
};

export default HOC(Calender);

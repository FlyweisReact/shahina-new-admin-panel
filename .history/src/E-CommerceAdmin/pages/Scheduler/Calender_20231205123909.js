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
  return (
    <div className="scheduler-container">
      <h2>Scheduler</h2>
      <div>
        <label>
          Event Title:
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <div>
        <h3>Upcoming Events</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong> - {event.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HOC(Calender);

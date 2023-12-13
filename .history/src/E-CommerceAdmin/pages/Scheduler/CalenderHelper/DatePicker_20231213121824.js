import React from 'react'

const DatePicker = () => {
  return (
    <div>DatePicker</div>
  )
}

export default DatePicker

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ overflowX: "scroll", whiteSpace: "nowrap" }}>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="ISO 8601"
        showNavigation={false} // Hide next and previous buttons
      />
    </div>
  );
};

export default DatePicker;

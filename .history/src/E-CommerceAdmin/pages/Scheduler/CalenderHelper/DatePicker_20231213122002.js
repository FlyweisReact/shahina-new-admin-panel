

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
        calendarType="US"
        showNavigation={false} // Hide next and previous buttons
      />
    </div>
  );
};

export default DatePicker;

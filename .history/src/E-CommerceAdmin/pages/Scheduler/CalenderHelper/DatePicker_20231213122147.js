

import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";


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

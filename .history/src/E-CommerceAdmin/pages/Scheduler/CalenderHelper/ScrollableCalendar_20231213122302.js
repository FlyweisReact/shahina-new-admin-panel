/** @format */

import React, { useState } from "react";

const ScrollableCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <label htmlFor="datePicker">Select a Date: </label>
      <input
        type="date"
        id="datePicker"
        value={moment(selectedDate).format("YYYY-MM-DD")}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default ScrollableCalendar;

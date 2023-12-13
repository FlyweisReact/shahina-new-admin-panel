/** @format */

import React, { useState } from "react";


const ScrollableCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
      <DatePicker
        onChange={handleDateChange}
        value={selectedDate}
        calendarIcon={null} // Hide the calendar icon
        clearIcon={null} // Hide the clear icon
        formatCalendarMonth={(locale, date) =>
          new Intl.DateTimeFormat(locale, {
            month: "long",
            year: "numeric",
          }).format(date)
        }
        formatShortWeekday={(locale, date) =>
          new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date)
        }
        minDetail="year"
        showFixedNumberOfWeeks
        calendarType="US"
        className="custom-calendar" // You can apply your custom styles
      />
    </div>
  );
};

export default ScrollableCalendar;

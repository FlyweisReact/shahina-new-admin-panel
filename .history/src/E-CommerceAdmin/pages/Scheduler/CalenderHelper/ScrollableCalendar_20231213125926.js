/** @format */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScrollableCalendar = ({ selectedDate, handleDateChange, moment }) => {
  return (
    <div>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        dateFormat="eee dd MMM, yyyy"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default ScrollableCalendar;

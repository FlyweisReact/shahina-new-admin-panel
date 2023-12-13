/** @format */ import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ScrollableCalendar = ({ selectedDate, handleDateChange, moment }) => {
  return (
    <div>
      <input
        type="date"
        id="datePicker"
        value={moment(selectedDate).format("YYYY-MM-DD")}
        onChange={handleDateChange}
      />
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="ddd dd MMM, yyyy"
        placeholderText="Select a date"
      />
    </div>
  );
};

export default ScrollableCalendar;

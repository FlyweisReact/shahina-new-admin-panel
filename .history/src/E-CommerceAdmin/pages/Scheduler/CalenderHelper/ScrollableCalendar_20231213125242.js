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
    </div>
  );
};

export default ScrollableCalendar;

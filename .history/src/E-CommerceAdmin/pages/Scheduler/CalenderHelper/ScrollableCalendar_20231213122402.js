/** @format */

const ScrollableCalendar = ({ selectedDate, handleDateChange }) => {
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

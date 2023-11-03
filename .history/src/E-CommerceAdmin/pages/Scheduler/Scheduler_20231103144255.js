/** @format */
import HOC from "../../layout/HOC";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const Scheduler = () => {
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: "Aivil Durate",
      start: new Date(2023, 10, 2, 10, 0),
      end: new Date(2023, 10, 2, 12, 0),
    },
    {
      title: "Sonia Khan",
      start: new Date(2023, 10, 4, 14, 0),
      end: new Date(2023, 10, 4, 16, 0),
    },
    {
      title: "Sonia Khan",
      start: new Date(2023, 10, 4, 14, 0),
      end: new Date(2023, 10, 4, 16, 0),
    },
    {
      title: "Eyebrows waxing and threat",
      start: new Date(2023, 10, 4, 20, 0),
      end: new Date(2023, 10, 4, 23, 0),
    },
  ];

//   2023 

  return (
    <>
      <Calendar
        localizer={localizer}
          events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </>
  );
};

export default HOC(Scheduler);

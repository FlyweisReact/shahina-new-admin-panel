/** @format */
import HOC from "../../layout/HOC";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'


const Scheduler = () => {
    const localizer = momentLocalizer(moment)

  return (
    <>
        <Calendar
      localizer={localizer}
    //   events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </>
  );
};

export default HOC(Scheduler);

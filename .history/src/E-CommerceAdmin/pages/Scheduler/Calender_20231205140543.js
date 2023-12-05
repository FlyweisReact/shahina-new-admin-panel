/** @format */
import axios from "axios";
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";

const Calendar = ({ month, year, events, onPrevMonth, onNextMonth }) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const getDaysArray = () => {
    const daysArray = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (
          (i === 0 && j < firstDayOfMonth) ||
          (day > daysInMonth && i === 0)
        ) {
          week.push(null);
        } else if (day <= daysInMonth) {
          week.push(day);
          day++;
        }
      }
      daysArray.push(week);
    }

    return daysArray;
  };

  const renderEvents = (day) => {
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.StartTime);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
    return dayEvents.map((event, index) => (
      <div className="bookings" key={index}>
        <span className="time"> {event?.Time} </span>
        <span className="subject"> {event?.Subject?.slice(0, 20)} </span>
      </div>
    ));
  };

  const daysArray = getDaysArray();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="customize_calender">
      <div className="month-navigation">
        <div className="month_calender">
          <button onClick={onPrevMonth}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <p>
            {new Intl.DateTimeFormat("en-US", {
              month: "long",
              year: "numeric",
            }).format(new Date(year, month, 1))}
          </p>
          <button onClick={onNextMonth}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="">

        </div>
      </div>

      <table>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysArray.map((week, index) => (
            <tr key={index}>
              {week.map((day, index) => (
                <td key={index}>
                  <div class="e-date-header e-navigate">
                    {" "}
                    {day !== null ? day : ""}
                  </div>
                  {renderEvents(day)?.length > 0 && renderEvents(day)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Calender = () => {
  const [data, setData] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
  });

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data);
    } catch {
    } finally {
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const events = data?.flatMap((order) =>
    order?.orders?.flatMap((item) =>
      item?._doc?.services?.map((service) => ({
        Subject: service.serviceId?.name,
        StartTime: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        EndTime: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        Id: item?._doc?._id,
        serviceId: service?.serviceId?._id,
        Time: item?._doc?.time,
        FirstName: item?._doc?.user?.firstName,
        LastName: item?._doc?.user?.lastName,
        userEmail: item?._doc?.user?.email,
        userPhone: item?._doc?.user?.phone,
      }))
    )
  );

  const handlePrevMonth = () => {
    setNewEvent((prevEvent) => {
      const prevMonth = new Date(prevEvent.date);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return { ...prevEvent, date: prevMonth };
    });
  };

  const handleNextMonth = () => {
    setNewEvent((prevEvent) => {
      const nextMonth = new Date(prevEvent.date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return { ...prevEvent, date: nextMonth };
    });
  };

  return (
    <>
      <div>
        <Calendar
          month={newEvent.date.getMonth()}
          year={newEvent.date.getFullYear()}
          events={events}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </>
  );
};

export default HOC(Calender);

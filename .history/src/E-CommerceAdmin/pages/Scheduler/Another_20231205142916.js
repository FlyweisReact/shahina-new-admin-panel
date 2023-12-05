/** @format */

import React, { useCallback, useMemo } from "react";
import HOC from "../../layout/HOC";
// import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";

const Another = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    console.log(event);
    setSelectedEvent(event);
    setModalShow(true);
  };

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const events = data?.flatMap((order) =>
    order?.orders?.flatMap((item) =>
      item?._doc?.services?.map((service) => ({
        title: service.serviceId?.name,
        start: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        end: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        id: item?._doc?._id,
        serviceId: service?.serviceId?._id,
      }))
    )
  );

  // Calender Modal
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="Schedule_Enquiry_Modal">
          {data != null && (
            <>
              <div className="close_btn">
                <h4> {props?.event?.title} </h4>
                <i className="fa-solid fa-x" onClick={() => props.onHide()}></i>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  }

  //   ----
  const [myEvents, setEvents] = useState(events);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={selectedEvent}
      />
      <section className="sectionCont">
        {/* <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          //   onSelectEvent={(e) =>
          //     e.id ? openModal(e) : console.log("Not Id Here")
          //   }
          onSelectSlot={handleSelectSlot}
          style={{ height: 800 }}
        /> */}

        <Calendar
          dayLayoutAlgorithm={"no-overlap"}
          //   defaultDate={defaultDate}
          //   defaultView={Views.WEEK}
          //   events={events}
          //   localizer={localizer}
          //   onSelectEvent={handleSelectEvent}
          //   onSelectSlot={handleSelectSlot}
          
          //   scrollToTime={scrollToTime}

          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          style={{ height: 800 }}
        />
      </section>
    </>
  );
};

export default HOC(Another);

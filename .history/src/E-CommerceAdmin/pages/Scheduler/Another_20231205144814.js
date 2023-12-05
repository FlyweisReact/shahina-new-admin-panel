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
import { AppointmentCanvas } from "./Template/AppointmentCanvas";

const Another = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    const date = new Date(
      "Fri Dec 01 2023 00:25:00 GMT+0530 (India Standard Time)"
    );

    const formattedDate = date.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

    const formattedDay = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const formattedMonth = date.toLocaleDateString("en-US", {
      month: "long",
    });
    const formattedYear = date.toLocaleDateString("en-US", {
      year: "numeric",
    });
    const formattedDate2 = date.toLocaleDateString("en-US", {
      day: "numeric",
    });

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          {data != null && (
            <>
              <div className="close_btn">
                <h4> {props?.event?.title} </h4>
                <i className="fa-solid fa-x" onClick={() => props.onHide()}></i>
              </div>
            </>
          )}

          <div className="quick-info-header">
            <div
              className="quick-info-header-content"
              style={{ color: "black" }}
            >
              <div className="quick-info-title"> Appointment Details </div>
              <div className="duration-text">
                {" "}
                {formattedDay} , {formattedMonth} {formattedDate2} ,{" "}
                {formattedYear}{" "}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  //   ----
  const handleSelectSlot = () => {
    handleShow(true);
  };

  const handleSelectEvent = (e) => {
    setSelectedEvent(e);
    setModalShow(true);
  };

  const { scrollToTime } = useMemo(
    () => ({
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const [show, setShow] = useState(false);
  const [additionalProps, setAdditionalProps] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (additionalProps) => {
    setAdditionalProps(additionalProps);
    setShow(true);
  };
  return (
    <>
      <AppointmentCanvas
        startTime={additionalProps}
        show={show}
        handleClose={handleClose}
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={selectedEvent}
      />
      <section className="sectionCont">
        <Calendar
          dayLayoutAlgorithm={"no-overlap"}
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          style={{ height: 800 }}
        />
      </section>
    </>
  );
};

export default HOC(Another);

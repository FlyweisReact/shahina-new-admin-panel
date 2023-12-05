/** @format */

import React, { useCallback, useMemo } from "react";
import HOC from "../../layout/HOC";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppointmentCanvas } from "./Template/AppointmentCanvas";

const blockData = [
  {
    Id: 1,
    Subject: "Blocked Time",
    StartTime: "2023-12-03T04:30:00.000Z",
    EndTime: "2023-12-03T06:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
  },
  {
    Id: 1,
    Subject: "Blocked Time",
    StartTime: "2023-12-04T04:30:00.000Z",
    EndTime: "2023-12-04T06:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
  },
  {
    Id: 1,
    Subject: "Blocked Time",
    StartTime: "2023-12-05T00:00:00.000Z",
    EndTime: "2023-12-05T23:59:59.999Z",
    IsAllDay: false,
    IsBlock: true,
  },
  {
    Id: 1,
    Subject: "Blocked Time",
    StartTime: "2023-12-03T04:30:00.000Z",
    EndTime: "2023-12-03T06:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
  },
];

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
        Time: item?._doc?.time,
        FirstName: item?._doc?.user?.firstName,
        LastName: item?._doc?.user?.lastName,
        userEmail: item?._doc?.user?.email,
        userPhone: item?._doc?.user?.phone,
      }))
    )
  );

  // Calender Modal
  function MyVerticallyCenteredModal(props) {
    const date = props?.event?.start;
    const formattedDay = date?.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const formattedMonth = date?.toLocaleDateString("en-US", {
      month: "long",
    });
    const formattedYear = date?.toLocaleDateString("en-US", {
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
        <Modal.Body style={{ padding: 0 }}>
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
          <div className="Schedule_Enquiry_Modal">
            <div className="close_btn">
              <h4>{props?.event?.Subject}</h4>
            </div>
            <p> First name : {props?.event?.FirstName} </p>
            <p> Last name : {props?.event?.LastName} </p>
            <p> User Email : {props?.event?.userEmail} </p>
            <p> Phone Number : {props?.event?.userPhone} </p>
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

  //   ---
  const combinedDataSource = [...events, ...blockData];

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
          events={combinedDataSource}
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

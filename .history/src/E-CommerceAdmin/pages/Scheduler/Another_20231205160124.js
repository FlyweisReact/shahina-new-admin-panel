/** @format */

import React, { useMemo } from "react";
import HOC from "../../layout/HOC";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppointmentCanvas } from "./Template/AppointmentCanvas";
import { motion } from "framer-motion";

const blockData = [
  {
    id: 1,
    title: "Blocked Time",
    start: new Date("2023-12-03T00:00:00.000Z"),
    end: new Date("2023-12-03T17:59:59.999Z"),
    isBlock: true,
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
        isBlock: false, // Add isBlock property for regular events
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
    const formattedDate2 = date?.toLocaleDateString("en-US", {
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
          <div className="Schedule_Enquiry_Modal" style={{ padding: "10px" }}>
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
    if (e.isBlock === false) {
      setSelectedEvent(e);
      setModalShow(true);
    }
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

  const combinedDataSource = [...events, ...blockData];
  const eventStyleGetter = (event) => {
    const isBlockedTime = blockData.some(
      (blockEvent) => blockEvent.id === event.id
    );

    if (isBlockedTime) {
      return {
        style: {
          backgroundColor: "lightgray",
          cursor: "not-allowed",
        },
      };
    }

    return {};
  };

  //   -------
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
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
        <div className="react_calender_base">
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
            eventPropGetter={eventStyleGetter}
          />

          <div className="motion_Handler">
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
                display: "none",
                zIndex: -100,
              }}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                zIndex: 200,
              }}
              transition={{ duration: 0.3 }}
              exit={{
                height: 0,
                opacity: 0,
                display: "none",
                zIndex: -100,
              }}
            >
              <div className="content">
                <div className="search-input">
                  <img src="/asessts/navbar/search.png" alt="" />
                  <input type="search" />
                </div>
              </div>
            </motion.div>

            <div style={{display : 'fe'}}>
              <div className="plus_icon">
                <i className="fa-solid fa-plus" onClick={handleToggleOpen}></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Another);

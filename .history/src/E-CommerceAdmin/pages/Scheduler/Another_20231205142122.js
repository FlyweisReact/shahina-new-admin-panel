/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Another = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
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
    const [data, setData] = useState(null);

    const fetchHandler = async () => {
      try {
        const { data } = await axios.get(
          `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${props.event?.id}`
        );
        setData(data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchHandler();
      }
    }, [props]);

    const filterdServices =
      data != null &&
      data?.services?.filter(
        (i) => i.serviceId?._id === props.event?.serviceId
      );

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
                <h4>{filterdServices?.[0]?.serviceId?.name}</h4>
                <i className="fa-solid fa-x" onClick={() => props.onHide()}></i>
              </div>
              <p>User First name : {data?.user?.firstName} </p>
              <p>User Last Name : {data?.user?.lastName} </p>
              <p>User Email : {data?.user?.email} </p>
              <p>User Phone Number : {data?.user?.phone} </p>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={selectedEvent}
      />
      <section className="sectionCont">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={}
          style={{ height: 800 }}
        />
      </section>
    </>
  );
};

export default HOC(Another);

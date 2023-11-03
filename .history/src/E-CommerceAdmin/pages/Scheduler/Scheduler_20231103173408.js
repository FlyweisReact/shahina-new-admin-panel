/** @format */
import HOC from "../../layout/HOC";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Scheduler = () => {
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

  const events = data?.map((i) => ({
    title: i.orders?.map((item) =>
      item.services?.map((c) => c.serviceId?.name)
    ),
    start: new Date(2023, i.month, i.day, 10, 0),
    end: new Date(2023, i.month, i.day, 23, 0),
    id: i.orders?.map((item) => item?._id),
  }));

  // Calender Modal
  function MyVerticallyCenteredModal(props) {
    const [data, setData] = useState({});

    const fetchHandler = async () => {
      try {
        const { data } = await axios.get(
          `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${props.event?.id?.[0]}`
        );
        setData(data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchHandler();
      }
    }, [props]);

    console.log(data)

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{ backgroundColor: "rgb(59 130 246 / 0.5)" }}>
          <h4>{data?.services?.[0]?.serviceId?.name}</h4>
          <p>Time : {data?.time} </p>
          <p>Amount : {data?.total} </p>
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
          onSelectEvent={openModal}
          style={{ height: 500 }}
        />
      </section>
    </>
  );
};

export default HOC(Scheduler);

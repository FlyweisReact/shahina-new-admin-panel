/** @format */
import { useState , useEffect } from 'react'
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";

const AppointmentDetails = ({ show, handleClose, startTime }) => {
  const [type, setType] = useState("Info");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    autoplay: false,
  };


  const all = [
    {
      name: "Info",
    },
    {
      name: "Notes",
    },
    {
      name: "Payments",
    },
  ];

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Body style={{ padding: "0" }}>
        <div className="appointment_detail_header">
          <div className="upper">
            <i className="fa-solid fa-xmark" onClick={() => handleClose()} />
          </div>
          <p>Booked</p>
        </div>

        <div className="Appointment_Canvas" ></div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;

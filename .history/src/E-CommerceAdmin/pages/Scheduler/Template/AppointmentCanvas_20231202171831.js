/** @format */

import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AppointmentCanvas = ({ show, handleClose }) => {
  const [type, setType] = useState("");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>New Appointment</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="selector">
          <Slider {...settings}>
            <div>
              <p>Info</p>
            </div>
            <div>
              <p>Notes</p>
            </div>
            <div>
              <p>Payments</p>
            </div>
            <div>
              <p>Forms</p>
            </div>
            <div>
              <p>Activity</p>
            </div>
          </Carousel>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

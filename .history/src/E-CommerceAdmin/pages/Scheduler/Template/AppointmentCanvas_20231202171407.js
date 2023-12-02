/** @format */

import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

export const AppointmentCanvas = ({ show, handleClose }) => {
  const [type, setType] = useState("");
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
          <ul>
            <li>Info</li>
            <li>Notes</li>
            <li>Payments</li>
            <li>Forms</li>
            <li>Activity</li>
          </ul>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

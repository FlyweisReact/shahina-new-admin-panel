/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const AppointmentDetails = ({ show, handleClose, startTime }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>Booked</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas"></Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;

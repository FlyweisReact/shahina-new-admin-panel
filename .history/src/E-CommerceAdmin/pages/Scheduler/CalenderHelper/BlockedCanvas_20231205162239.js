/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import axios from "axios";

const BlockedCanvas = ({ show, handleClose, startTime }) => {
 

  

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          Add blocked time
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body></Offcanvas.Body>
    </Offcanvas>
  );
};

export default BlockedCanvas;

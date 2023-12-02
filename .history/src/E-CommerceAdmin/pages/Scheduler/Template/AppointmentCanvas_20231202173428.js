/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AppointmentCanvas = ({ show, handleClose }) => {
  const [type, setType] = useState("Info");
  const [width, setWidth] = useState();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: width,
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
    {
      name: "Forms",
    },
    {
      name: "Activity",
    },
  ];

  useEffect(() => {
    if()
    if (window.innerWidth < 786) {
      setWidth(1);
    } else {
      setWidth(4);
    }
  }, []);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          New Appointment
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="selector">
          <Slider {...settings}>
            {all?.map((i, index) => (
              <div>
                <p
                  onClick={() => setType(i.name)}
                  className={i.name === type ? "active" : ""}
                  key={`Index${index}`}
                >
                  {" "}
                  {i.name}{" "}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

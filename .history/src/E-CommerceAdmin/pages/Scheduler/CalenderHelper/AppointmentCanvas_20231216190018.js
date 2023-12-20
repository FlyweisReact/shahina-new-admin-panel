/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Slider from "react-slick";
import { toast } from "react-toastify";
import axios from "axios";
import { EditService, ServiceCanvas, UserCanvas } from "./Modals/modal";
import info from "./Constant/constant.json";
import img from "../../../../Images/list.png";
import { addService } from "../../../../Respo/Api";

export const AppointmentCanvas = ({ show, handleClose, startTime }) => {
  const [type, setType] = useState("Info");
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedService, setSelectedService] = useState({});
  const [openService, setOpenService] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
  const [edit_service, set_edit_service] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  useEffect(() => {
    if (show) {
      setType("Info");
      setUserVisible(true);
    }
  }, [show]);

  const payload = {
    quantity: 1,
    userId,
    date,
    time,
  };

  const addInCart = () => {
    addService(productId, payload);
  };

  useEffect(() => {
    if (startTime?.start) {
      const originalDate = new Date(startTime?.start);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
      const formattedTime = originalDate.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
    }
  }, [startTime]);

  const userHandler = (i) => {
    setUserId(i._id);
    setSelectedUser(i);
    setUserVisible(false);
    setOpenService(true);
  };

  const serviceHandler = (i) => {
    setProductId(i._id);
    setSelectedService(i);
  };

  const [isChecked, setIsChecked] = useState(true);
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  let slider;
  if (type === "Info") {
    const SlidingComponent = () => {
      return (
        <>
          <div className="user_select_container">
            <div className="user_select">
              <div className="img">
                {" "}
                {selectedUser?.firstName?.slice(0, 1)}{" "}
              </div>
              <div className="content">
                <p className="heading">
                  {" "}
                  {selectedUser?.firstName + " " + selectedUser?.lastName}{" "}
                </p>
                <p className="faded"> +{selectedUser?.phone} </p>
                <p className="faded"> {selectedUser?.email} </p>
              </div>
            </div>
          </div>

          <div className="service_selector_container">
            <div
              className="service_selector"
              // onClick={() => set_edit_service(true)}
              onClick={() => setOpenService(true)}
            >
              <div>
                <p className="title"> {selectedService?.name} </p>
                <p className="faded"> 2h </p>
              </div>
              <p className="price"> ${selectedService?.price} </p>
            </div>
          </div>
          {/* <div className="add_another" onClick={() => setOpenService(true)}>
            <p>Add another service</p>
            <i className="fa-solid fa-plus"></i>
          </div> */}
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    const SlidingComponent = () => {
      return (
        <div className="info_tab">
          <p className="title">Appointment notes</p>
          <textarea />
          <p className="note">visible only to your team members</p>
        </div>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Payments") {
    const SlidingComponent = () => {
      return (
        <div className="payment_class">
          <div className="toggle_button_cont">
            <Form.Check
              type="switch"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <p>Confirm appointment with card</p>
          </div>
          {isChecked && (
            <p className="faded">
              Once appointment is saved client will recieve a notification
              requiring them to confirm appointment with card and accept your
              poilcy of <strong style={{ color: "#000" }}>100% free</strong> for
              not showing up and{" "}
              <strong style={{ color: "#000" }}> 50% free</strong> for late
              cancellation under{" "}
              <strong style={{ color: "#000" }}>48 hours </strong> notice{" "}
            </p>
          )}
        </div>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Forms") {
    const SlidingComponent = () => {
      return (
        <div className="awaited_payment mt-3">
          <img src={img} alt="" />
          <p className="head mt-2">No forms</p>
          <p className="faded mt-0">
            Forms will appear here once appointment has been saved
          </p>
        </div>
      );
    };
    slider = <SlidingComponent />;
  }

  function closeService() {
    setOpenService(false);
  }
  function closeUser() {
    setUserVisible(false);
  }

  return (
    <>
      <EditService show={edit_service} setShow={set_edit_service} />
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
      />
      <UserCanvas
        show={userVisible}
        handleClose={closeUser}
        userHandler={userHandler}
      />
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
          <div className="select_container">
            <div>
              <div className="selector">
                <Slider {...settings}>
                  {info.appointmentInfo.map((i, index) => (
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
              {slider}
            </div>
            <div className="last_button">
              <div className="text">
                <p>Total</p>
                <p>
                  From ${selectedService?.price} ({selectedService?.totalMin}{" "}
                  min){" "}
                </p>
              </div>

              <div className="btn_container">
                <button className="checkout">Checkout</button>
                <button className="save" onClick={() => addInCart()}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
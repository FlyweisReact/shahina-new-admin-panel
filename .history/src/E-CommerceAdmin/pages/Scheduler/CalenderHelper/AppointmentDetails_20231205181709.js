/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import axios from "axios";

const AppointmentDetails = ({ show, handleClose, data }) => {
  const [type, setType] = useState("Info");
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [service, setServices] = useState([]);
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const token = localStorage.getItem("AdminToken");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedService, setSelectedService] = useState([]);

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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


  const payload = {
    quantity: 1,
    userId,
    date,
    time,
  };

  const addInCart = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/service/${productId}`,
        payload,
        Auth
      );
      toast.success("Sercvice Added");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (startTime) {
      const originalDate = new Date(startTime);
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

  const filteredServices = searchTerm
    ? service?.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : service;

  //   Filtered Users

  const filtereUser = search
    ? users?.filter(
        (option) =>
          option.firstName.toLowerCase().includes(search.toLowerCase()) ||
          option.lastName.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  // ---
  const userHandler = (i) => {
    setUserId(i._id);
    setSelectedUser(i);
    setStep(2);
  };

  const serviceHandler = (i) => {
    setProductId(i._id);
    setSelectedService((prev) => [...prev, i]);
    setStep(3);
  };

  useEffect(() => {
    if (show) {
      setStep(1);
    }
  }, [show]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  // Toggle Button Condition
  const [isChecked, setIsChecked] = useState(true);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

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
        {step === 1 ? (
          <>
            <div className="heading">
              <p>Select Client</p>
            </div>
            <div className="search_input">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                placeholder="search Client"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="user_select_container">
              {filtereUser?.map((i, index) => (
                <div
                  className="user_select"
                  key={index}
                  onClick={() => userHandler(i)}
                >
                  <div className="img"> {i.firstName?.slice(0, 1)} </div>
                  <div className="content">
                    <p className="heading">
                      {" "}
                      {i.firstName + " " + i.lastName}{" "}
                    </p>
                    <p className="faded"> +{i.phone} </p>
                    <p className="faded"> {i.email} </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}

        {step === 2 ? (
          <>
            <div className="heading">
              <p>Select Service</p>
            </div>
            <div className="search_input">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="search"
                placeholder="search by service name"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="service_selector_container">
              {filteredServices?.map((i, index) => (
                <div
                  className="service_selector"
                  key={`service${index}`}
                  onClick={() => serviceHandler(i)}
                >
                  <div>
                    <p className="title"> {i.name} </p>
                    <p className="faded"> 2h </p>
                  </div>
                  <p className="price"> ${i.price} </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}

        {step === 3 ? (
          <>
            <div className="select_container">
              <div>
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

                {type === "Info" && (
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
                            {selectedUser?.firstName +
                              " " +
                              selectedUser?.lastName}{" "}
                          </p>
                          <p className="faded"> +{selectedUser?.phone} </p>
                          <p className="faded"> {selectedUser?.email} </p>
                        </div>
                      </div>
                    </div>

                    <div className="service_selector_container">
                      {selectedService?.map((i, index) => (
                        <div
                          className="service_selector"
                          key={`service${index}`}
                        >
                          <div>
                            <p className="title"> {i.name} </p>
                            <p className="faded"> 2h </p>
                          </div>
                          <p className="price"> ${i.price} </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {type === "Notes" && (
                  <>
                    <div className="info_tab">
                      <p className="title">Appointment notes</p>
                      <textarea />
                      <p className="note">visible only to your team members</p>
                    </div>
                  </>
                )}

                {type === "Payments" && (
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
                        Once appointment is saved client will recieve a
                        notification requiring them to confirm appointment with
                        card and accept your poilcy of{" "}
                        <strong style={{ color: "#000" }}>100% free</strong> for
                        not showing up and{" "}
                        <strong style={{ color: "#000" }}> 50% free</strong> for
                        late cancellation under{" "}
                        <strong style={{ color: "#000" }}>48 hours </strong>{" "}
                        notice{" "}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="last_button">
                <div className="text">
                  <p>Total</p>
                  <p>From $30 (30 min) </p>
                </div>

                <div className="btn_container">
                  <button className="checkout">Checkout</button>
                  <button className="save">Save</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;

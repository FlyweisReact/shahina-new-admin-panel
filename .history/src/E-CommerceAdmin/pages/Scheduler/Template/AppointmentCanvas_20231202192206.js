/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import axios from "axios";

export const AppointmentCanvas = ({ show, handleClose, startTime }) => {
  const [type, setType] = useState("Info");
  const [step, setStep] = useState(2);
  const [width, setWidth] = useState();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [service, setServices] = useState([]);
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
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
    if (show) {
      if (window.innerWidth < 786) {
        setWidth(1);
      } else {
        setWidth(4);
      }
    }
  }, [show]);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/getAllUser`
      );
      setUsers(data.data);
    } catch {}
  };

  const fetchService = async () => {
    try {
      const res = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/Service/all/paginateServiceSearch`
      );
      const data = res.data.data?.docs;
      setServices(data);
    } catch {}
  };

  useEffect(() => {
    fetchUsers();
    fetchService();
  }, []);

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
      // -----
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

  console.log(selectedService);
  console.log(selectedUser);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%", paddingTop: "100px" }}
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

            <div className="user_select_container">
              <div className="user_select">
                <div className="img"> {i.firstName?.slice(0, 1)} </div>
                <div className="content">
                  <p className="heading"> {i.firstName + " " + i.lastName} </p>
                  <p className="faded"> +{i.phone} </p>
                  <p className="faded"> {i.email} </p>
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

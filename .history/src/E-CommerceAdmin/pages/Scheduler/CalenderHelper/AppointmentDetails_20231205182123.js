/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";
import axios from "axios";

const AppointmentDetails = ({ show, handleClose, startTime }) => {
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
          Booked
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
      
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;

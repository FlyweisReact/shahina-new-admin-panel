/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";

export const AppointmentCanvas = ({ show, handleClose , startTime}) => {
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
    if (show) {
      if (window.innerWidth < 786) {
        setWidth(1);
      } else {
        setWidth(4);
      }
    }
  }, [show]);

//   -----------------------
const [users, setUsers] = useState([]);
  const [service, setServices] = useState([]);
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const intl = new Internationalization();
  const token = localStorage.getItem("AdminToken");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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

  const addInCart = async (e) => {
    e.preventDefault();
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
    if (props?.StartTime) {
      setTime(intl.formatDate(props.StartTime, { skeleton: "hm" }));
      const originalDate = new Date(props?.StartTime);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
    }
  }, [props]);

  //   Filtered Service
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = searchTerm
    ? service?.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : service;

  //   Filtered Users
  const [search, setSearch] = useState("");

  const filtereUser = search
    ? users?.filter(
        (option) =>
          option.firstName.toLowerCase().includes(search.toLowerCase()) ||
          option.lastName.toLowerCase().includes(search.toLowerCase())
      )
    : users;


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

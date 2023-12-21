/** @format */

import React, { useEffect, useState } from "react";
import { Offcanvas, Form, FloatingLabel, CarouselItem } from "react-bootstrap";
import Slider from "react-slick";
import { EditService, ServiceCanvas, UserCanvas } from "./Modals/modal";
import info from "./Constant/constant.json";
import img from "../../../../Images/list.png";
import { addNote, addService, checkout, getCart } from "../../../../Respo/Api";
import emailjs from "emailjs-com";

export const AppointmentCanvas = ({ show, handleClose, startTime }) => {
  const [type, setType] = useState("Info");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedService, setSelectedService] = useState({});
  const [openService, setOpenService] = useState(false);
  const [userVisible, setUserVisible] = useState(false);
  const [edit_service, set_edit_service] = useState(false);
  const [cart, setCart] = useState({});
  const [notes, setNotes] = useState("");
  const [serviceId, setServiceId] = useState("");

  const addSuggestion = async (e) => {
    e.preventDefault();
    const payload = {
      suggestion: notes,
    };
    await addNote(userId, payload);
    fetchCart();
  };

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

  const addInCart = (productId) => {
    addService(productId, payload, fetchCart);
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
    setUserVisible(false);
    setOpenService(true);
  };

  const fetchCart = () => {
    getCart(userId, setCart);
  };

  const serviceHandler = async (i) => {
    setSelectedService(i);
    await addInCart(i._id);
  };

  const [isChecked, setIsChecked] = useState(true);
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  useEffect(() => {
    if (cart?.suggesstion) {
      setNotes(cart?.suggesstion);
    }
  }, [cart]);

  const openServiceEdit = (i) => {
    setServiceId(i);
    set_edit_service(true);
  };

  const checkoutHandler = async () => {
    await checkout(cart?.user?._id);
    fetchCart();
    handleClose();
  };

  let slider;
  if (type === "Info") {
    const SlidingComponent = () => {
      return (
        <>
          <div className="user_select_container">
            <div className="user_select">
              <div className="img"> {cart?.user?.firstName?.slice(0, 1)} </div>
              <div className="content">
                <p className="heading">
                  {" "}
                  {cart?.user?.firstName + " " + cart?.user?.lastName}{" "}
                </p>
                <p className="faded"> +{cart?.user?.phone} </p>
                <p className="faded"> {cart?.user?.email} </p>
              </div>
            </div>
          </div>

          <div className="service_selector_container">
            {cart?.services?.map((i, index) => (
              <div
                className="service_selector"
                key={`Service${index}`}
                onClick={() => openServiceEdit(i?.serviceId?._id)}
              >
                <div>
                  <p className="title"> {i?.serviceId?.name} </p>
                  <p className="faded"> {i?.serviceId?.totalTime} </p>
                </div>
                <p className="price"> ${i?.subTotal} </p>
              </div>
            ))}
          </div>
          <div className="add_another" onClick={() => setOpenService(true)}>
            <p>Add another service</p>
            <i className="fa-solid fa-plus"></i>
          </div>
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    slider = (
      <div className="info_tab">
        <p className="title">Appointment notes</p>
        <form onSubmit={addSuggestion}>
          <Form.Control
            as="textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <p className="note">visible only to your team members</p>
          <button type="submit">Save</button>
        </form>
      </div>
    );
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

  console.log(cart);

  // Code to Send Email user with pdf
  const sendEmail = async () => {
    const attachments = [];
    const serviceToPdfPathMap = {};

    for (const service of cart?.services) {
      const serviceName = service.serviceId.name;
      const pdfFileName = serviceToPdfPathMap[serviceName];
      if (pdfFileName) {
        const templateParams = {
          to_name: cart?.user?.firstName + " " + cart?.user?.lastName,
          from_name: "Your Name",
          message_html: "Your service order has been confirmed.",
        };
        const pdfFileContent = "";
        attachments.push({
          filename: pdfFileName,
          content: pdfFileContent,
        });
      }
    }

    // Replace 'mailgun' and 'user_your_emailjs_user_id' with your Email.js service name and user ID
    await emailjs.send(
      "info@shahinahoja.com'",
      "your_email_template_id",
      templateParams,
      "react1@flyweis.technology"
    );

    console.log('Sended')

    // ... (other code)
  };

  return (
    <>
      <EditService
        show={edit_service}
        setShow={set_edit_service}
        userId={cart?.user?._id}
        serviceId={serviceId}
        fetchCart={fetchCart}
        date={date}
        time={time}
      />
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
        userDetail={cart?.user}
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
            <button>Send Email</button>
            <div className="last_button">
              <div className="text">
                <p>Total</p>
                <p>
                  From ${cart?.total} ({cart?.timeInMin})
                </p>
              </div>

              <div className="btn_container">
                <button className="checkout">Checkout</button>
                <button className="save" onClick={() => checkoutHandler()}>
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

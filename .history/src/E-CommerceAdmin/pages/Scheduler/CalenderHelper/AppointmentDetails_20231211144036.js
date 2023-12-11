/** @format */
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";

const AppointmentDetails = ({ show, handleClose, startTime }) => {
  const [type, setType] = useState("Info");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

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

  // ----
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
            {selectedService?.map((i, index) => (
              <div className="service_selector" key={`service${index}`}>
                <div>
                  <p className="title"> {i.name} </p>
                  <p className="faded"> 2h </p>
                </div>
                <p className="price"> ${i.price} </p>
              </div>
            ))}
          </div>
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
  }

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Body style={{ padding: "0" }}>
        <div className="appointment_detail_header">
          <div className="upper">
            <i className="fa-solid fa-xmark" onClick={() => handleClose()} />
          </div>
          <p>Booked</p>
        </div>

        <div className="Appointment_Canvas">
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
              {slider}
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
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;

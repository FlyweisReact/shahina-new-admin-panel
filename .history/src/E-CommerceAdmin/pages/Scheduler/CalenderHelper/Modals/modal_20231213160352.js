/** @format */

import React from "react";
import { Modal , Offcanvas } from "react-bootstrap";

export const EditNotes = ({ show, setShow, setEdit, edit }) => {
  function selector() {
    setEdit(!edit);
    setShow(false);
  }
  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={() => setShow(false)}
      className="text_Modal"
      style={{ top: "80%" }}
    >
      <div className="phone_dialoag">
        <button onClick={() => selector()}>Edit appointment notes</button>
      </div>
      <div className="close_btn" onClick={() => setShow(false)}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

export const ProfileDetail = ({ show, setShow, view_profile }) => {
  function openProfile() {
    view_profile(true);
    setShow(false);
  }
  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={() => setShow(false)}
      className="text_Modal"
      style={{ top: "70%" }}
    >
      <div className="phone_dialoag">
        <button onClick={() => openProfile()}>View Profile</button>
        <button>Edit Profile</button>
        <button>Remove Client</button>
      </div>
      <div className="close_btn" onClick={() => setShow(false)}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

export const RescheduleCanvas = ({ show, handleClose }) => {


  let conditionalRender;
  if (step === 1) {
    const Component = () => {
      return (
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
                  <p className="heading"> {i.firstName + " " + i.lastName} </p>
                  <p className="faded"> +{i.phone} </p>
                  <p className="faded"> {i.email} </p>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    };
    conditionalRender = <Component />;
  } else if (step === 2) {
    const Component = () => {
      return (
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
      );
    };
    conditionalRender = <Component />;
  } else if (step === 3) {
    const Component = () => {
      return (
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
              <button className="save" onClick={() => addInCart()}>
                Save
              </button>
            </div>
          </div>
        </div>
      );
    };
    conditionalRender = <Component />;
  }

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
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          Update Appointment
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        {conditionalRender}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
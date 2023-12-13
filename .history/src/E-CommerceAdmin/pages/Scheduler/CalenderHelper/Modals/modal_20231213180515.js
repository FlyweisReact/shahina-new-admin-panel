/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Offcanvas, Form } from "react-bootstrap";
import Slider from "react-slick";

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

export const RescheduleCanvas = ({ show, handleClose, setIsReschedule }) => {
  function selector() {
    setIsReschedule(false);
    handleClose();
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
          Update appointment
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="select_container">
          <div className="notify_check_box">
            <input type="checkbox" />
            <div>
              <p>Notify LeRon about reschedule</p>
              <span>
                Send a message informing LeRon their their appointment was
                reschedule
              </span>
            </div>
          </div>
          <div className="last_button">
            <div className="btn_container">
              <button className="save w-100" onClick={selector}>
                Update
              </button>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const SelectDate = ({ show, handleClose }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "700" }}>
          Appointment details
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="booked_appointment_modal">
          <form>
            <div>
              <p>Date</p>
              <input type="date" />
            </div>

            <div>
              <p>Frequency</p>
              <select>
                <option></option>
                <option>Doesn't repeat</option>
                <option>repeat </option>
              </select>
            </div>
            <button>Apply Changes</button>
          </form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const BookedCanvas = ({
  show,
  handleClose,
  setIsBooked,
  isReschedule,
  setIsReschedule,
}) => {
  const [type, setType] = useState("Info");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [userOpen, setUserOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [user_profile, set_user_profile] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [notesVisible, setNotesVisible] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  function closeService() {
    setOpenService(false);
  }

  function hideDate() {
    setDateVisible(false);
  }

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
            <div
              className="user_select"
              style={{ justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                {" "}
                <div className="img">L</div>
                <div className="content">
                  <p className="heading">LeRon Rich Sr.</p>
                  <p className="faded">+1 214-280-4084 </p>
                  <p className="faded">mrrichierich2521@yahoo.com </p>
                  <span className="tags">New Client</span>
                </div>
              </div>

              <i
                className="fa-solid fa-ellipsis-vertical"
                style={{ width: "40px", textAlign: "center" }}
                onClick={() => set_user_profile(true)}
              ></i>
            </div>
          </div>

          <div className="date_container">
            <p>Saturday , 30 Dec 2023</p>
            <button onClick={() => setDateVisible(true)}>Edit</button>
          </div>

          <div className="booked_service">
            <div
              className="service_selector"
              style={{ borderLeft: "4px solid #70AFFA" }}
            >
              <div>
                <p className="title"> jeTOP Hair Loss Treatment </p>
                <p className="faded"> 11:30am - 11:45am (15min) </p>
                <p className="faded"> Shahina Hoja </p>
                <p className="faded"> $199 </p>
              </div>
            </div>
          </div>

          <div className="add_another">
            <p>Add another service</p>
            <i
              className="fa-solid fa-plus"
              onClick={() => setOpenService(true)}
            ></i>
          </div>
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    const SlidingComponent = () => {
      return (
        <>
          <div className="info_tab">
            <p className="title">Appointment notes</p>
            <textarea />
            <p className="note">visible only to your team members</p>
          </div>
        </>
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

  const serviceHandler = (i) => {
    console.log(i);
  };

  const selector = () => {
    setIsReschedule(!isReschedule);
    setIsNotes(false);
    handleClose();
  };
  return (
    <>
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
      />
      <SelectDate show={dateVisible} handleClose={hideDate} />
      <DetailDialog isNotes={isNotes} setIsNotes={setIsNotes} />

      <EditNotes
        show={open_notes_modal}
        setShow={set_open_notes_modal}
        setEdit={setEdit}
        edit={edit}
      />

      <ProfileDetail
        show={user_profile}
        setShow={set_user_profile}
        view_profile={setUserOpen}
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontWeight: "900" }}>
            New appointment
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "0" }}>
          <div className="Appointment_Canvas Booked_Detail">
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
                  <p> $199 (15 min) </p>
                </div>

                <div className="btn_container">
                  <button className="checkout">Checkout</button>
                  <button
                    className="save"
                    onClick={() => {
                      setIsBooked(false);
                      handleClose();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export const ServiceCanvas = ({ show, handleClose, serviceHandler }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [searchTerm, setSearchTerm] = useState("");
  const [service, setServices] = useState([]);

  // Fetching Service
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
    fetchService();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const filteredServices = searchTerm
    ? service?.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : service;

  const selectHandler = (i) => {
    serviceHandler(i);
    handleClose();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
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

        <div className="recently_booked">
          <p className="heading">Recently booked by LeRon Rich Sr.</p>
          <Slider {...settings}>
            <div className="service">
              <p className="title">JeTop Hair Loss Treatment</p>
              <p className="faded">21 Oct 2023 </p>
              <p className="price">$199</p>
            </div>
            <div className="service">
              <p className="title">JeTop Hair Loss Treatment</p>
              <p className="faded">21 Oct 2023 </p>
              <p className="price">$199</p>
            </div>
            <div className="service">
              <p className="title">JeTop Hair Loss Treatment</p>
              <p className="faded">21 Oct 2023 </p>
              <p className="price">$199</p>
            </div>
            <div className="service">
              <p className="title">JeTop Hair Loss Treatment</p>
              <p className="faded">21 Oct 2023 </p>
              <p className="price">$199</p>
            </div>
            <div className="service">
              <p className="title">JeTop Hair Loss Treatment</p>
              <p className="faded">21 Oct 2023 </p>
              <p className="price">$199</p>
            </div>
          </Slider>
        </div>

        <div className="service_selector_container">
          {filteredServices?.map((i, index) => (
            <div
              className="service_selector"
              key={`service${index}`}
              onClick={() => selectHandler(i)}
            >
              <div>
                <p className="title"> {i.name} </p>
                <p className="faded"> 2h </p>
              </div>
              <p className="price"> ${i.price} </p>
            </div>
          ))}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const DetailDialog = ({ show, setShow, selector }) => {
  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={() => setShow(false)}
      className="text_Modal"
      style={{ top: "55%" }}
    >
      <div className="phone_dialoag">
        <p>Edit appointment notes</p>
        <button onClick={() => selector()}> Reschedule </button>
        <p> Ask client to confirm </p>
        <p style={{ color: "red" }}> No-show </p>
        <p style={{ color: "red" }}> Cancel </p>
      </div>
      <div className="close_btn" onClick={() => setShow(false)}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

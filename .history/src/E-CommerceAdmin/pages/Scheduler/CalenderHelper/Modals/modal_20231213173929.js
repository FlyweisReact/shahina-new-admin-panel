/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Offcanvas } from "react-bootstrap";
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

export const BookedCanvas = ({
  show,
  handleClose,
  setIsReschedule,
  isReschedule,
  setIsBooked,
}) => {
  const [type, setType] = useState("Info");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [userOpen, setUserOpen] = useState(false);
  const userClose = () => setUserOpen(false);
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [user_profile, set_user_profile] = useState(false);
  const [openService, setOpenService] = useState(false);
  function closeService() {
    setOpenService(false);
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
            <p>29 Dec 2023</p>
            <button>Edit</button>
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
            <i className="fa-solid fa-plus"></i>
          </div>
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    const SlidingComponent = () => {
      return (
        <>
          <div className="define_notes">
            {edit ? (
              <div className="info_tab" style={{ width: "90%", padding: 0 }}>
                <textarea placeholder="Every Time $199" />
              </div>
            ) : (
              <p>Every Time $199</p>
            )}{" "}
            <i
              className="fa-solid fa-ellipsis-vertical cursor-pointer"
              onClick={() => set_open_notes_modal(true)}
            ></i>
          </div>
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Payments") {
    const SlidingComponent = () => {
      return (
        <div className="awaited_payment">
          {/* <img src={img} alt="" /> */}
          <p className="head">Awaiting confirmation</p>
          <p className="faded">
            LeRon recieved a notification to confirm this appointment with a
            card
          </p>
          <button>Send reminder</button>
        </div>
      );
    };
    slider = <SlidingComponent />;
  }

  const [isNotes, setIsNotes] = useState(false);

  const NotesModal = () => {
    const selector = () => {
      setIsReschedule(!isReschedule);
      setIsNotes(false);
      handleClose();
    };
    return (
      <Modal
        title="Copy to Clipboard"
        show={isNotes}
        onHide={() => setIsNotes(false)}
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
        <div className="close_btn" onClick={() => setIsNotes(false)}>
          <p>Close</p>
        </div>
      </Modal>
    );
  };

  const serviceHandler = (i) => {
    console.log(i);
  };

  return (
    <>
      <NotesModal isNotes={isNotes} setIsNotes={setIsNotes} />
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
      />
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

                <div className="elipse_container">
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={() => setIsNotes(true)}
                  />

                  <button>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

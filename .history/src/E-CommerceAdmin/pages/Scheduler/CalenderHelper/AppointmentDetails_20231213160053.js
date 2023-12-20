/** @format */
import { useState, useEffect } from "react";
import { Offcanvas, Modal } from "react-bootstrap";
import Slider from "react-slick";
import UserDetailCanvas from "./UserDetailCanvas";
import img from "../../../../Images/credit-card.png";
import { EditNotes, ProfileDetail } from "./Modals/modal";

const AppointmentDetails = ({ show, handleClose, setIsReschedule }) => {
  const [type, setType] = useState("Info");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [userOpen, setUserOpen] = useState(false);
  const userClose = () => setUserOpen(false);
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [user_profile, set_user_profile] = useState(false);

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
            <div className="service_selector">
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
          <img src={img} alt="" />
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
          <button onClick={() => setIsReschedule()} > Reschedule </button>
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

  return (
    <>
      <NotesModal isNotes={isNotes} setIsNotes={setIsNotes} />
      <UserDetailCanvas show={userOpen} handleClose={userClose} />
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
        <Offcanvas.Body style={{ padding: "0" }}>
          <div className="appointment_detail_header">
            <div className="upper">
              <i className="fa-solid fa-xmark" onClick={() => handleClose()} />
            </div>
            <p>Booked</p>
          </div>

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

export default AppointmentDetails;
/** @format */
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import UserDetailCanvas from "./UserDetailCanvas";
import img from "../../../../Images/credit-card.png";
import {
  DetailDialog,
  EditNotes,
  EditService,
  ProfileDetail,
  SelectDate,
  ServiceCanvas,
} from "./Modals/modal";
import img1 from "../../../../Images/list.png";
import info from "./Constant/constant.json";
import { getBookingDetail } from "../../../../Respo/Api";

const AppointmentDetails = ({
  show,
  handleClose,
  setIsReschedule,
  isReschedule,
  setIsBooked,
  startTime,
}) => {
  const [type, setType] = useState("Info");
  const [userOpen, setUserOpen] = useState(false);
  const userClose = () => setUserOpen(false);
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [user_profile, set_user_profile] = useState(false);
  const [service_edit_visible, setService_Edit_Visible] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [detail, setDetail] = useState({});

  const id = startTime?.id;

  const fetchBooking = () => {
    getBookingDetail(id, setDetail);
  };

  useEffect(() => {
    if (show === true) {
      fetchBooking();
    }
  }, [show]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  // Servic Date
  const start = startTime?.start;
  const month = start?.toLocaleDateString("en-US", {
    month: "long",
  });
  const year = start?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const day = start?.toLocaleDateString("en-US", {
    day: "numeric",
  });

  const date = day + " " + month?.slice(0, 3) + " " + year;

  console.log(detail);

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
            <p> {date} </p>
            <button onClick={() => setOpenDate(true)}>Edit</button>
          </div>

          <div className="booked_service ">
            {detail?.services?.map((i, index) => (
              <div
                className="service_selector"
                key={`Service${index}`}
                onClick={() => setService_Edit_Visible(true)}
              >
                <div>
                  <p className="title"> {i.serviceId?.name} </p>
                  <p className="faded">({i.serviceId?.totalMin}min) </p>
                  <p className="faded"> Shahina Hoja </p>
                  <p className="faded"> $199 </p>
                </div>
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
  } else if (type === "Forms") {
    const SlidingComponent = () => {
      return (
        <div className="awaited_payment mt-3">
          <img src={img1} alt="" />
          <p className="head mt-2">No forms</p>
          <p className="faded mt-0">
            Forms will appear here once appointment has been saved
          </p>
        </div>
      );
    };
    slider = <SlidingComponent />;
  }

  const [isNotes, setIsNotes] = useState(false);
  const selector = () => {
    setIsReschedule(!isReschedule);
    setIsNotes(false);
    handleClose();
  };

  function closeDate() {
    setOpenDate(false);
  }
  const serviceHandler = (i) => {
    console.log(i);
  };
  function closeService() {
    setOpenService(false);
  }

  useEffect(() => {
    if (show) {
      setType("Info");
    }
  }, [show]);
  return (
    <>
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
      />
      <DetailDialog
        show={isNotes}
        setShow={setIsNotes}
        selector={selector}
        type={setType}
      />
      <SelectDate show={openDate} handleClose={closeDate} />
      <EditService
        show={service_edit_visible}
        setShow={setService_Edit_Visible}
      />
      <UserDetailCanvas
        show={userOpen}
        handleClose={userClose}
        setIsBooked={setIsBooked}
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
                  <button onClick={handleClose}>Checkout</button>
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

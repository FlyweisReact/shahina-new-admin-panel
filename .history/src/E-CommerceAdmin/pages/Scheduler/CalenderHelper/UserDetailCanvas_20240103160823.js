/** @format */
import { useEffect, useState } from "react";
import { Offcanvas, Modal } from "react-bootstrap";
import { Call, Mail, SendSms } from "../../../../Helper/Helper";
import { getOrders } from "../../../../Respo/Api";
import { UserDialog } from "./Modals/modal";

const UserDetailCanvas = ({ show, handleClose, setIsBooked, Details }) => {
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [textToCopy, setTextToCopy] = useState("Text to be copied");
  const [status, setStatus] = useState("Pending");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  const fullName = Details?.user?.firstName + " " + Details?.user?.lastName;

  useEffect(() => {
    if (show === true) {
      if (status === "all") {
        getOrders(setData, "", Details?.user?._id);
      } else {
        getOrders(setData, status, Details?.user?._id);
      }
    }
  }, [status, show]);

  function TimeFetcher(date, type) {
    const start = new Date(date);
    const month = start?.toLocaleDateString("en-US", {
      month: "long",
    });
    const year = start?.toLocaleDateString("en-US", {
      year: "numeric",
    });
    const day = start?.toLocaleDateString("en-US", {
      day: "numeric",
    });
    const formattedTime = start.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dayOfWeek = start?.toLocaleDateString("en-US", {
      weekday: "long",
    });
    if (type === "full") {
      return `${dayOfWeek?.slice(
        0,
        3
      )}, ${day} ${month} ${year} at ${formattedTime}`;
    } else {
      return (
        <>
          <p className="day"> {day} </p>
          <p className="mth"> {month?.slice(0, 3)} </p>
        </>
      );
    }
  }

  function TextReturn() {
    if (status === "Pending") {
      return <span className="faded_span">Upcoming</span>;
    } else if (status === "all") {
      return <span className="faded_span">All</span>;
    } else if (status === "Done") {
      return <span className="faded_span">Past</span>;
    }
  }

  return (
    <>
      <UserDialog show={open} setShow={setOpen} data={Details} />
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        style={{ top: "65%" }}
        className="text_Modal"
      >
        {type === "phone" ? (
          <>
            <div className="phone_dialoag">
              <p onClick={() => Call(Details?.user?.phone)}>Call phone</p>
              <p onClick={() => SendSms(Details?.user?.phone)}>Send message</p>
              <p onClick={handleCopyToClipboard}> Copy phone</p>
            </div>
            <div className="close_btn" onClick={() => setModalShow(false)}>
              <p>Close</p>
            </div>
          </>
        ) : (
          <>
            <div className="phone_dialoag">
              <p onClick={() => Mail(Details?.user?.email)}>Send Mail</p>
              <p onClick={handleCopyToClipboard}> Copy Email Address</p>
            </div>
            <div className="close_btn" onClick={() => setModalShow(false)}>
              <p>Close</p>
            </div>
          </>
        )}
      </Modal>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Body style={{ padding: 0, backgroundColor: "#dedddc" }}>
          <div className="user_detail_canvas">
            <div className="white_backgroud" style={{ marginTop: "0" }}>
              <i className="fa-solid fa-arrow-left" onClick={handleClose}></i>
              <div className="user_detail">
                <div className="img"> {fullName?.slice(0, 1)} </div>
                <div className="content">
                  <p className="heading">{fullName} </p>
                  <p
                    className="faded"
                    onClick={() => {
                      setType("phone");
                      setTextToCopy(Details?.user?.phone);
                      setModalShow(true);
                    }}
                  >
                    {Details?.user?.phone}
                  </p>

                  <p
                    className="faded"
                    onClick={() => {
                      setType("email");
                      setTextToCopy(Details?.user?.email);
                      setModalShow(true);
                    }}
                  >
                    {Details?.user?.email}
                  </p>
                </div>
              </div>
              <div className="tags">
                <span>New Client</span>
              </div>

              <div className="btns_upper">
                <i
                  className="fa-solid fa-ellipsis-vertical"
                  onClick={() => setOpen(true)}
                ></i>
                <button
                  onClick={() => {
                    setIsBooked(true);
                    handleClose();
                  }}
                >
                  Book now
                </button>
              </div>
            </div>

            <div className="activity_dialog">
              <div className="heading">
                <h5>Activity</h5>
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option></option>
                  <option value={"Pending"}>Upcoming Activity</option>
                  <option value={"Done"}>Past Activity</option>
                  <option value={"all"}>All Activity</option>
                </select>
              </div>
              {TextReturn()}
            </div>

            {data?.map((i, index) => (
              <div className="white_backgroud" key={`Services${index}`}>
                <div className="appointment_details">
                  <div className="dates_stuff">
                    <div className="date">{TimeFetcher(i.fromTime)}</div>
                    <div className="content_stuff">
                      <p className="head">Appointment</p>
                      <p className="faded">
                        {" "}
                        {TimeFetcher(i.fromTime, "full")}
                      </p>
                      <span>Booked</span>
                    </div>
                  </div>

                  {i.services?.map((item) => (
                    <div className="service_details">
                      <div>
                        <p className="title"> {item?.serviceId?.name} </p>
                        <p className="faded"> {item?.serviceId?.totalTime} </p>
                      </div>
                      <p className="price">
                        {" "}
                        $
                        {Details?.user?.isSubscription === true
                          ? item?.serviceId?.mPrice
                          : item?.serviceId?.price}{" "}
                      </p>
                    </div>
                  ))}

                  {console.log(i)}

                  <div className="notes">
                    {/* {i?.suggesstion && (
                      <>
                        <p className="heading">Appointment note</p>
                        <p className="faded"> {i?.suggesstion?.suggesstion} </p>
                      </>
                    )} */}

                    <button>
                      <i className="fa-solid fa-credit-card"></i>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserDetailCanvas;

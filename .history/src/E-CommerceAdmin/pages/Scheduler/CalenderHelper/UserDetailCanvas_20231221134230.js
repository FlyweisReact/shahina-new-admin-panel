/** @format */
import { useEffect, useState } from "react";
import { Offcanvas, Modal } from "react-bootstrap";
import { getOrders } from "../../../../Respo/Api";

const UserDetailCanvas = ({ show, handleClose, setIsBooked, Details }) => {
  const [modalShow, setModalShow] = useState(false);
  const [type, setType] = useState("");
  const [textToCopy, setTextToCopy] = useState("Text to be copied");
  const [status, setStatus] = useState("Pending");
  const [data, setData] = useState([]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  const fullName = Details?.user?.firstName + " " + Details?.user?.lastName;

  useEffect(() => {
    if ((show, status)) {
      getOrders(setData, status);
    }
  }, [status, show]);

  function TimeFetcher(date) {
    const start = new Date("2023-09-30T00:00:00.000Z");
    const month = start?.toLocaleDateString("en-US", {
      month: "long",
    });
    const year = start?.toLocaleDateString("en-US", {
      year: "numeric",
    });
    const day = start?.toLocaleDateString("en-US", {
      day: "numeric",
    });
    console.log(day , month , year);
    // const date = day + " " + month?.slice(0, 3) + " " + year;
  }
  // console.log(data);

  TimeFetcher()
  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        style={{ top: "65%" }}
        className="text_Modal"
      >
        {type === "phone" ? (
          <>
            <div className="phone_dialoag">
              <p>Call phone</p>
              <p>Send message</p>
              <p onClick={handleCopyToClipboard}> Copy phone</p>
            </div>
            <div className="close_btn" onClick={() => setModalShow(false)}>
              <p>Close</p>
            </div>
          </>
        ) : (
          <>
            <div className="phone_dialoag">
              <p>Send Mail</p>
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
                <i className="fa-solid fa-ellipsis-vertical"></i>
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
                <select>
                  <option>All Activity</option>
                </select>
              </div>
              <span className="faded_span">upcoming</span>
            </div>

            {data?.map((i, index) => (
              <div className="white_backgroud" key={`Services${index}`}>
                <div className="appointment_details">
                  <div className="dates_stuff">
                    <div className="date">
                      <p className="day">2</p>
                      <p className="mth">DEC</p>
                    </div>
                    <div className="content_stuff">
                      <p className="head">Appointment</p>
                      <p className="faded">
                        {" "}
                        {TimeFetcher(i.fromTime)} {i.date} Sat, 02 December at
                        11:30am{" "}
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

                  <div className="notes">
                    {i?.suggesstion && (
                      <>
                        <p className="heading">Appointment note</p>
                        <p className="faded"> {i?.suggesstion} </p>
                      </>
                    )}

                    <button>
                      <i className="fa-solid fa-credit-card"></i>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="activity_dialog">
              <span className="faded_span">Past</span>
            </div>
            <div className="white_backgroud">
              <div className="appointment_details">
                <div className="dates_stuff">
                  <div className="date">
                    <p className="day">10</p>
                    <p className="mth">NOV</p>
                  </div>
                  <div className="content_stuff">
                    <p className="head">Appointment</p>
                    <p className="faded">Sat, 02 December at 11:30am </p>
                    <span>Booked</span>
                  </div>
                </div>

                <div className="service_details">
                  <div>
                    <p className="title"> jeTOP Hair Loses Treatment </p>
                    <p className="faded"> 2h </p>
                  </div>
                  <p className="price"> $199 </p>
                </div>

                <div className="notes">
                  <p className="heading">Appointment note</p>
                  <p className="faded"> Every time $199 </p>
                  <button>
                    <i className="fa-solid fa-credit-card"></i>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            <div className="white_backgroud">
              <div className="appointment_details">
                <div className="dates_stuff">
                  <div className="date">
                    <p className="day">10</p>
                    <p className="mth">NOV</p>
                  </div>
                  <div className="content_stuff">
                    <p className="head">Appointment</p>
                    <p className="faded">Sat, 02 December at 11:30am </p>
                    <span>Booked</span>
                  </div>
                </div>

                <div className="service_details">
                  <div>
                    <p className="title"> jeTOP Hair Loses Treatment </p>
                    <p className="faded"> 2h </p>
                  </div>
                  <p className="price"> $199 </p>
                </div>

                <div className="notes">
                  <p className="heading">Appointment note</p>
                  <p className="faded"> Every time $199 </p>
                  <button>
                    <i className="fa-solid fa-credit-card"></i>
                    Checkout
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

export default UserDetailCanvas;

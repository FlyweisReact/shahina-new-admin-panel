/** @format */
import { useState, useEffect } from "react";
import { Offcanvas, Modal } from "react-bootstrap";

const UserDetailCanvas = ({ show, handleClose }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        style={{ top: "65%" }}
        className="text_Modal"
      >
        <div className="phone_dialoag">
          <p>Call phone</p>
          <p>Send message</p>
          <p>Copy phone</p>
        </div>
        <div className="close_btn" onClick={() => setModalShow(false)}>
          <p>Close</p>
        </div>
      </Modal>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Body style={{ padding: 0 }}>
          <div className="user_detail_canvas">
            <div className="white_backgroud">
              <div className="user_detail">
                <div className="img">L</div>
                <div className="content">
                  <p className="heading">LeRon Rich Sr.</p>
                  <p className="faded" onClick={() => setModalShow(true)}>
                    +1 214-280-4084{" "}
                  </p>
                  <p className="faded">mrrichierich2521@yahoo.com </p>
                </div>
              </div>
              <div className="tags">
                <span>New Client</span>
              </div>

              <div className="btns_upper">
                <i className="fa-solid fa-ellipsis-vertical"></i>
                <button>Book now</button>
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

            <div className="white_backgroud">
              <div className="appointment_details">
                <div className="dates_stuff">
                  <div className="date">
                    <p className="day">2</p>
                    <p className="mth">DEC</p>
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
                <p className="faded"></p>


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

/** @format */
import { Offcanvas } from "react-bootstrap";

const AppointmentDetails = ({ show, handleClose, startTime }) => {
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
          <i className="fa-solid fa-x-mark" />

          </div>

          <p>Booked</p>
          
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;
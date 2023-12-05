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
      <Offcanvas.Body sty>
        <div className="appointment_detail_header">
          <p>Booked</p>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;

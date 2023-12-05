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
      <Offcanvas.Header closeButton className="appointment_detail_header" >
        <Offcanvas.Title style={{ fontWeight: "900" }}>Booked</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="appointment_detail_header">
        

        </div>

      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AppointmentDetails;

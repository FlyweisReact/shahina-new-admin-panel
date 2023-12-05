/** @format */

import { Offcanvas } from "react-bootstrap";

const BlockedCanvas = ({ show, handleClose, startTime }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          Add blocked time
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="booked_appointment_modal" >
      <form>
        <div>
          <p>Title</p>
          <input type='text' />
        </div>
      </form>

      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BlockedCanvas;

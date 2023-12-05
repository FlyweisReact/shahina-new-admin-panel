/** @format */
import { Offcanvas } from "react-bootstrap";

const BlockedCanvas = ({ show, handleClose, startTime }) => {
  const start = startTime?.start;

  const day = start?.toLocaleDateString(undefined, {
    month: "long",
  });

  const formattedDate = start?.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get the formatted time
  const formattedTime = start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Get AM/PM
  const ampm = start
    ?.toLocaleTimeString([], { hour: "numeric", hour12: true })
    ?.slice(-2);



  console.log(day);

  const value = day?. + " " + formattedTime;

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
      <Offcanvas.Body className="booked_appointment_modal">
        <form>
          <div>
            <p>Title</p>
            <input type="text" placeholder="e.g. lunch meeting (optional)" />
          </div>
          <div>
            <p>Date</p>
            <input type="text" defaultValue={value} />
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BlockedCanvas;

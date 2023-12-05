/** @format */
import { Offcanvas } from "react-bootstrap";

const BlockedCanvas = ({ show, handleClose, startTime }) => {
  const start = startTime?.start;
  const formattedDay = date?.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedMonth = date?.toLocaleDateString("en-US", {
    month: "long",
  });
  const formattedYear = date?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const formattedDate2 = date?.toLocaleDateString("en-US", {
    day: "numeric",
  });

  const value = "";

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

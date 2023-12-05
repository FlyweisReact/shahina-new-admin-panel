/** @format */
import { Offcanvas } from "react-bootstrap";

const BlockedCanvas = ({ show, handleClose, startTime }) => {
  const start = startTime?.start;
  const Day = start?.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const formattedMonth = start?.toLocaleDateString("en-US", {
    month: "long",
  });
  const formattedYear = start?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const date = start?.toLocaleDateString("en-US", {
    day: "numeric",
  });


  console.log(Day?.slice(0,3))

  const value = Day?.slice(0,3);

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

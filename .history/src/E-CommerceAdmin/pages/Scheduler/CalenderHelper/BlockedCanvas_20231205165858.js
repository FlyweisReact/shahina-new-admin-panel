/** @format */

import { useState  , useEffect} from "react";
import { Offcanvas } from "react-bootstrap";

const BlockedCanvas = ({ show, handleClose, startTime }) => {
  const [ date , setDate ] = useState("")
  const [ time , setTime ] = useState("")
  console.log(startTime?.start);

  const start  = star

  useEffect(() => {
    if (startTime?.start) {
      const originalDate = new Date(startTime);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
      // -----
      const formattedTime = originalDate.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formattedTime);
    }
  }, [startTime]);
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
            <input type="text" placeholder="e.g. lunch meeting (optional)" />
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BlockedCanvas;

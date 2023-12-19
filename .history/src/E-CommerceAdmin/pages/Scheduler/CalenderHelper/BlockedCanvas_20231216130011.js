/** @format */
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";

const BlockedCanvas = ({ show, handleClose, startTime }) => {
  const start = startTime?.start;
  const Day = start?.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const month = start?.toLocaleDateString("en-US", {
    month: "long",
  });
  const year = start?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const date = start?.toLocaleDateString("en-US", {
    day: "numeric",
  });

  const startingTime = start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const end = startTime?.end;
  const endingTime = end?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const value =
    Day?.slice(0, 3) + " , " + date + " " + month?.slice(0, 3) + " " + year;

  const timeValue = startingTime + " to " + endingTime;


  console.log(start.getMonth() + 1)


  const formatedDate = year +''

  // ----
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submiHandler = (e) => {
    e.preventDefault()
    const payload = { title , description , }
  }

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
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. lunch meeting (optional)"
            />
          </div>
          <div>
            <p>Date</p>
            <input type="text" defaultValue={value} />
          </div>
          <div>
            <p>Time</p>
            <input type="text" defaultValue={timeValue} />
          </div>
          {/* <div>
            <p>Frequency</p>
            <select>
              <option>Doesn't repeat</option>
              <option>Doesn't repeat</option>
              <option>repeat </option>
            </select>
          </div> */}
          <div>
            <p>Description</p>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description or note (optional)"
            />
          </div>

          <button type='submit' > Save</button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BlockedCanvas;

/** @format */
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createBlockedTime } from "../../../../Respo/Api";
import { selectModalById } from "../../../../Store/Slices/modalSlices";

const BlockedCanvas = ({ show, handleClose, fetchHandler }) => {
  const { modalData } = useSelector(selectModalById("blockedCanvas"));

  const start = new Date(modalData?.start);
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
  const end = new Date(modalData?.end);
  const endingTime = end?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const endingTime2 = end?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  console.log(endingTime2)

  const value =
    Day?.slice(0, 3) + " , " + date + " " + month?.slice(0, 3) + " " + year;

  const timeValue = startingTime + " to " + endingTime;

  // ----
  const monthFormated = parseInt(start?.getMonth()) + 1;
  const dayFormated = start?.getDate();
  const monthStr = monthFormated < 10 ? `0${monthFormated}` : monthFormated;
  const dayStr = dayFormated < 10 ? `0${dayFormated}` : dayFormated;

  const formatedDate = `${year}-${monthStr}-${dayStr}`;
  const from = startingTime?.slice(0, 5);
  const to = endingTime?.slice(0, 5);
  // ----
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submiHandler = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      date: formatedDate endingTime2,
      to: from,
      from: formatedDate,
    };
    createBlockedTime(payload, fetchHandler, handleClose);
  };

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
        <form onSubmit={submiHandler}>
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

          <div>
            <p>Description</p>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description or note (optional)"
            />
          </div>

          <button type="submit"> Save</button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default BlockedCanvas;

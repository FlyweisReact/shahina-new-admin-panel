/** @format */
import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createBlockedTime, unblock_slot } from "../../../../Respo/Api";
import { selectModalById } from "../../../../Store/Slices/modalSlices";

const UnBlockCanvas = ({ show, handleClose, fetchHandler }) => {
  const { modalData } = useSelector(selectModalById("unblockedCanvas"));

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

  const value =
    Day?.slice(0, 3) + " , " + date + " " + month?.slice(0, 3) + " " + year;

  const timeValue = startingTime + " to " + endingTime;

  const endingTime2 = end?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const startingTime2 = start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // ----
  const monthFormated = parseInt(start?.getMonth()) + 1;
  const dayFormated = start?.getDate();
  const monthStr = monthFormated < 10 ? `0${monthFormated}` : monthFormated;
  const dayStr = dayFormated < 10 ? `0${dayFormated}` : dayFormated;
  const formatedDate = `${year}-${monthStr}-${dayStr}`;
  const from = startingTime?.slice(0, 5);
  const to = endingTime?.slice(0, 5);
  // ----

  const submiHandler = (e) => {
    e.preventDefault();
    const payload = {
      date: formatedDate,
      to: endingTime2,
      from: startingTime2,
    };
    unblock_slot(payload, fetchHandler, handleClose);
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
          Unblock slot
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="booked_appointment_modal">
        <form onSubmit={submiHandler}>
          <div>
            <p>Date</p>
            <input type="text" defaultValue={value} />
          </div>
          <div>
            <p>Time</p>
            <input type="text" defaultValue={timeValue} />
          </div>

          <button type="submit"> Save</button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UnBlockCanvas;

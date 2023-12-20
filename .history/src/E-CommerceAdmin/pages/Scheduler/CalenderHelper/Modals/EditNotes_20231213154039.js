/** @format */

import React from "react";
import { Modal } from "react-bootstrap";

const EditNotes = ({ show, setShow }) => {
  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={() => setShow(false)}
      className="text_Modal"
      style={{ top: "75%" }}
    >
      <div className="phone_dialoag">
        <p>Edit appointment notes</p>
      </div>
      <div className="close_btn">
        <p>Close</p>
      </div>
    </Modal>
  );
};

export default EditNotes;
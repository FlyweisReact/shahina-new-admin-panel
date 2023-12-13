/** @format */

import React from "react";
import { Modal } from "react-bootstrap";

const EditNotes = ({ show, setShow, setEdit , edit }) => {
    function selector() {
        setEdit(true)

    }
  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={() => setShow(false)}
      className="text_Modal"
      style={{ top: "80%" }}
    >
      <div className="phone_dialoag">
        <p onClick={() => setEdit(true)}>Edit appointment notes</p>
      </div>
      <div className="close_btn" onClick={() => setShow(false)}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

export default EditNotes;

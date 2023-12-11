/** @format */
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";

const UserDetailCanvas = ({ show, handleClose }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Body style={{ padding: "0" }}>
       
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserDetailCanvas;

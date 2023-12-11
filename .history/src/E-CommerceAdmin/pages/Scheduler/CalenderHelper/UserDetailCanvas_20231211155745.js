/** @format */
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { motion } from "framer-motion";

const UserDetailCanvas = ({ show, handleClose }) => {
  const [modalShow , setModalShow] = useState(false);
  return (

    <>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  );
};

export default UserDetailCanvas;

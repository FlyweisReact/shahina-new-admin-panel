/** @format */
import { useState, useEffect } from "react";
import { Offcanvas, Modal } from "react-bootstrap";

const UserDetailCanvas = ({ show, handleClose }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div className="Copy_text_Modal">
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          style={{ top }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        </Modal>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Body style={{ padding: "0" }}>
          <div className="user_detail_canvas">
            <div className="user_detail">
              <div className="img">L</div>
              <div className="content">
                <p className="heading">LeRon Rich Sr.</p>
                <p className="faded" onClick={() => setModalShow(true)}>
                  +1 214-280-4084{" "}
                </p>
                <p className="faded">mrrichierich2521@yahoo.com </p>
              </div>
            </div>
            <div className="tags">
              <span>New Client</span>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserDetailCanvas;

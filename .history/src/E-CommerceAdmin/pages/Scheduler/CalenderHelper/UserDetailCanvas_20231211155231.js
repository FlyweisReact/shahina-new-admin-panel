/** @format */
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";

const UserDetailCanvas = ({ show, handleClose }) => {
  const [textShow, setTextShow] = useState(false);
  return (
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
              <p className="faded">+1 214-280-4084 </p>
              <p className="faded">mrrichierich2521@yahoo.com </p>
            </div>
          </div>
          <div className="tags">
            <span>New Client</span>
          </div>

          <div className="motion_Handler">
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              exit={{
                height: 0,
                opacity: 0,
              }}
            >
              <div className={isOpen ? "open_handler" : "d-none"}>
                <div
                  onClick={() => {
                    setIsBlocked(true);
                    setIsOpen(false);
                  }}
                >
                  <p>New blocked time </p>
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div
                  onClick={() => {
                    setIsBlocked(false);
                    setIsOpen(false);
                  }}
                >
                  <p>New appointment </p>
                  <i className="fa-regular fa-calendar"></i>
                </div>
              </div>
            </motion.div>

           
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserDetailCanvas;

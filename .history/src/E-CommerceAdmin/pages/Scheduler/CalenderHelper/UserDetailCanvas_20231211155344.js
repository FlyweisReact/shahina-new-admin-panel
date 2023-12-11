/** @format */
import { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { motion } from "framer-motion";

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
                height: textShow ? "auto" : 0,
                opacity: textShow ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              exit={{
                height: 0,
                opacity: 0,
              }}
            >
              <div>dsasdsa</div>
            </motion.div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserDetailCanvas;

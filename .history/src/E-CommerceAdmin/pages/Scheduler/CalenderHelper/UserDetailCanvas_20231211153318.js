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
        <div className="user_detail_canvas" >

        <div className="user_select_container">
            <div className="user_select">
              <div className="img">
        
              </div>
              <div className="content">
                <p className="heading">
                  {" "}
                  {selectedUser?.firstName + " " + selectedUser?.lastName}{" "}
                </p>
                <p className="faded"> +{selectedUser?.phone} </p>
                <p className="faded"> {selectedUser?.email} </p>
              </div>
            </div>
          </div>

        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserDetailCanvas;

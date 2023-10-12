/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, Alert, Modal, Button, FloatingLabel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { toast } from "react-toastify";

const Ad = () => {
  const [data, setData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://krish-vapes-backend.vercel.app/api/v1/Notification"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [message, setMessage] = useState(null);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://krish-vapes-backend.vercel.app/api/v1/Notification",
          {
            message,
          },
          Auth
        );
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
        const msg = e.response.data.message;
        toast.error(msg);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create / Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <FloatingLabel className="mb-3" label="Your Ad Text">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Ad Screen
          </span>
          <div className="d-flex gap-1">
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider mr-5"
              onClick={() => setModalShow(true)}
            >
              Create / Edit
            </button>
          </div>
        </div>

        {!data || data?.length === 0 ? (
          <Alert>Create Ad First !</Alert>
        ) : (
          <div className="Info_Box">
            <p className="desc"> {data?.message} </p>
          </div>
        )}
      </section>
    </>
  );
};

export default HOC(Ad);

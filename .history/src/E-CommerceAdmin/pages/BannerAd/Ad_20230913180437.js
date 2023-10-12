/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, Alert, Modal, Button } from "react-bootstrap";
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
    const [fb, setFb] = useState(null);
    const [twitter, setTwitter] = useState(null);
    const [google, setGoogle] = useState(null);
    const [instagram, setInstagram] = useState(null);
    const [basketball, setBasketBall] = useState(null);
    const [behance, setBehance] = useState(null);
    const [dribbble, setDribble] = useState(null);
    const [pinterest, setPinterest] = useState(null);
    const [linkedIn, setlinkedin] = useState(null);
    const [youtube, setYoutube] = useState(null);
    const [map, setMap] = useState(null);
    const [address, setAddress] = useState(null);
    const [phone, setPhone] = useState(null);
    const [supportEmail, setSuportEmail] = useState(null);
    const [openingTime, setOpeningTime] = useState(null);
    const [infoEmail, setInfoEmail] = useState(null);
    const [contactAddress, setContactAddress] = useState(null);
    const [tollfreeNo, setTollFreeNo] = useState(null);

    const payload = {
      fb,
      twitter,
      google,
      instagram,
      basketball,
      behance,
      dribbble,
      pinterest,
      linkedIn,
      youtube,
      map,
      phone,
      address,
      supportEmail,
      infoEmail,
      openingTime,
      contactAddress,
      tollfreeNo,
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://krish-vapes-backend.vercel.app/api/v1/ContactDetails/addContactDetails",
          payload,
          Auth
        );
        toast.success(data.message);
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
            Create Contact Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Facebook </Form.Label>
              <Form.Control onChange={(e) => setFb(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Twitter </Form.Label>
              <Form.Control onChange={(e) => setTwitter(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Google</Form.Label>
              <Form.Control onChange={(e) => setGoogle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instagram</Form.Label>
              <Form.Control onChange={(e) => setInstagram(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ball</Form.Label>
              <Form.Control onChange={(e) => setBasketBall(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Behance</Form.Label>
              <Form.Control onChange={(e) => setBehance(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dribble</Form.Label>
              <Form.Control onChange={(e) => setDribble(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pinterest</Form.Label>
              <Form.Control onChange={(e) => setPinterest(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Linkedin</Form.Label>
              <Form.Control onChange={(e) => setlinkedin(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Map</Form.Label>
              <Form.Control onChange={(e) => setMap(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Support Email</Form.Label>
              <Form.Control onChange={(e) => setSuportEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Opening Time</Form.Label>
              <Form.Control onChange={(e) => setOpeningTime(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Info Email</Form.Label>
              <Form.Control onChange={(e) => setInfoEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Address</Form.Label>
              <Form.Control
                onChange={(e) => setContactAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Toll Free Number</Form.Label>
              <Form.Control
                type="tel"
                maxLength={12}
                minLength={8}
                onChange={(e) => setTollFreeNo(e.target.value)}
              />
            </Form.Group>
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
        <div
          className="pb-4  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <div>Ad Screen</div>
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

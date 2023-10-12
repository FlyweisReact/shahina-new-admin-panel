/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, Alert, Modal } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
  const [data, setData] = useState([]);
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
        "https://krish-vapes-backend.vercel.app/api/v1/ContactDetails/viewContactDetails"
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
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Facebook</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
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

      <p className="headP">Dashboard / Contact Detail</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <div></div>
        <div className="d-flex gap-1">
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider mr-5"
            onClick={() => setModalShow(true)}
          >
            Create Contact-Detail
          </button>
        </div>
      </div>

      <section className="sectionCont">
        {!data || data?.length === 0 ? (
          <Alert>Create Contact Detail First !</Alert>
        ) : (
          ""
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Facebook </Form.Label>
            <Form.Control value={data?.fb} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Twitter </Form.Label>
            <Form.Control value={data?.twitter} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Google</Form.Label>
            <Form.Control value={data?.google} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Instagram</Form.Label>
            <Form.Control value={data?.instagram} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ball</Form.Label>
            <Form.Control value={data?.basketball} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Behance</Form.Label>
            <Form.Control value={data?.behance} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dribble</Form.Label>
            <Form.Control value={data?.dribbble} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pinterest</Form.Label>
            <Form.Control value={data?.pinterest} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Linkedin</Form.Label>
            <Form.Control value={data?.linkedIn} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Map</Form.Label>
            <Form.Control value={data?.map} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control value={data?.address} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control value={data?.phone} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Support Email</Form.Label>
            <Form.Control value={data?.supportEmail} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Opening Time</Form.Label>
            <Form.Control value={data?.openingTime} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Info Email</Form.Label>
            <Form.Control value={data?.infoEmail} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Address</Form.Label>
            <Form.Control value={data?.contactAddress} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Toll Free Number</Form.Label>
            <Form.Control value={data?.tollfreeNo} />
          </Form.Group>
        </Form>
      </section>
    </>
  );
};

export default HOC(Contact);

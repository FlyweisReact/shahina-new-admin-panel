/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, Alert, Modal, Button } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../../Baseurl";

const Contact = () => {
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
        `${Baseurl}api/v1/ContactDetails/viewContactDetails`
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

  function ValueChecker(holder, string) {
    return holder ? (
      <div className="Desc-Container">
        <p className="title"> {string} </p>
        <p className="desc"> {holder} </p>
      </div>
    ) : (
      ""
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
            Contact Details
          </span>
          <div className="d-flex gap-1">
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => setModalShow(true)}
            >
              Create / Update
            </button>
          </div>
        </div>

        {data?.image && (
          <div className="Desc-Container mb-3">
            <p className="title"> Image </p>
            <div className="img-cont">
              <img src={data?.image} alt="" className="centerImage" />
            </div>
          </div>
        )}
        {ValueChecker(data?.fb, "Facebook")}
        {ValueChecker(data?.twitter, "Twitter")}
        {ValueChecker(data?.google, "Google")}
        {ValueChecker(data?.instagram, "instagram")}
        {ValueChecker(data?.map, "Embeded Map")}
        {ValueChecker(data?.address, "Address ")}
        {ValueChecker(data?.phone, "Phone Number ")}
        {ValueChecker(data?.email, "Email Address ")}
        {ValueChecker(data?.name, "Title ")}
        {ValueChecker(data?.mapLink, "Map Link ")}
      </section>
    </>
  );
};

export default HOC(Contact);

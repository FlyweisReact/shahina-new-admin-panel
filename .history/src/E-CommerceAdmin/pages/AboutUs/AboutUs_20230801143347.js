/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://krish-vapes-backend.vercel.app/api/v1/AboutUs/all`
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <p className="headP">Dashboard / About Us</p>

      <section className="sectionCont">


        <Form>

            <img src='' />

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control as="textarea" style={{ height: "100px" }} />
            </FloatingLabel>
          </Form.Group>

          <div className="w-100 d-flex justify-content-between">
            <Link to="/Orders">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </>
  );
};

export default HOC(AboutUs);

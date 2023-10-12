/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const CreateAboutUs = () => {
  const [aboutusImages, setAboutUsImages] = useState([]);
  const [aboutusImage, setAboutUsImage] = useState([]);
  const [desc, setDesc] = useState([]);
  const [title, setTitle] = useState([]);
  const [titleName, setTitleName] = useState("");
  const [descName, setDescName] = useState("");

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const TitleSelector = (item) => {
    setTitle((prev) => [...prev, item]);
    setTitleName("");
  };

  const RemoveTitle = (index) => {
    setTitle((prev) => prev.filter((_, i) => i !== index));
  };

  const DescSelector = (item) => {
    setDesc((prev) => [...prev, item]);
    setDescName("");
  };

  const RemoveDesc = (index) => {
    setDesc((prev) => prev.filter((_, i) => i !== index));
  };

  const fd = new FormData();
  Array.from(aboutusImages).forEach((img) => {
    fd.append("aboutusImages", img);
  });
  fd.append("aboutusImage", aboutusImage);
  Array.from(desc).forEach((item) => {
    fd.append("desc", item);
  });
  Array.from(title).forEach((item) => {
    fd.append("title", item);
  });

  const postHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://krish-vapes-backend.vercel.app/api/v1/AboutUs/addAboutUs`,
        fd,
        Auth
      );
      toast.success(res.data.message);
    } catch (e) {
      console.log(e);
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <section>
      <p className="headP">Dashboard / Create About-Us</p>
      <section className="sectionCont">
        <Form onSubmit={postHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Single Image</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
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
            <Button variant="success" type="submit">
              Submit
            </Button>

            <Link to="/about-us">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateAboutUs);

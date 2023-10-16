/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const CreateAboutUs = () => {
  const [aboutusImages, setAboutUsImages] = useState([]);
  const [aboutusImage, setAboutUsImage] = useState([]);
  const [desc, setDesc] = useState([]);
  const [title, setTitle] = useState([]);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
            <Form.Control
              type="file"
              onChange={(e) => setAboutUsImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Multiple Image</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setAboutUsImages(e.target.files)}
            />
          </Form.Group>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90%", margin: "0" }}>
                  <Form.Control
                    type="text"
                    onChange={(e) => setTitleName(e.target.value)}
                    value={titleName}
                  />
                </div>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => TitleSelector(titleName)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <ul className="mt-2">
                {title?.map((i, index) => (
                  <li
                    key={index}
                    onClick={() => RemoveTitle(index)}
                    style={{ listStyle: "disc" }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {i}{" "}
                      <i
                        className="fa-solid fa-minus ml-2 "
                        style={{ cursor: "pointer" }}
                      ></i>
                    </span>
                  </li>
                ))}
              </ul>
            </Form.Group>
          </div>

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90%", margin: "0" }}>
                  <Form.Control
                    type="text"
                    onChange={(e) => setDescName(e.target.value)}
                    value={descName}
                  />
                </div>
                <i
                  className="fa-solid fa-plus"
                  onClick={() => DescSelector(descName)}
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <ul className="mt-2">
                {desc?.map((i, index) => (
                  <li
                    key={index}
                    onClick={() => RemoveDesc(index)}
                    style={{ listStyle: "disc" }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      {i}{" "}
                      <i
                        className="fa-solid fa-minus ml-2 "
                        style={{ cursor: "pointer" }}
                      ></i>
                    </span>
                  </li>
                ))}
              </ul>
            </Form.Group>
          </div>

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

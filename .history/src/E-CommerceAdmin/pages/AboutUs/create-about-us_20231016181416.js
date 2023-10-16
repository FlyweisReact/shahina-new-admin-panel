/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";

const CreateAboutUs = () => {
  const [desc, setDesc] = useState([]);
  const [descName, setDescName] = useState("");
  const [ title , setTitle ] = useState("")
  const [ designation  , setDesignation ] = useState("")
  const [ image , setImage ] = useState('')

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };


  const DescSelector = (item) => {
    setDesc((prev) => [...prev, item]);
    setDescName("");
  };

  const RemoveDesc = (index) => {
    setDesc((prev) => prev.filter((_, i) => i !== index));
  };

  const fd = new FormData();
  Array.from(desc).forEach((item) => {
    fd.append("description", item);
  });
  fd.append("title" , title)
  fd.append("designation" , designation)
  fd.append("image" , image)
  
  const postHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
         ` ${Baseurl}api/v1/static/createAboutus ` ,
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
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
      
          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDesignation(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>

            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                className="mb-3"
                value={descName}
                onChange={(e) => setDescName(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="dark" onClick={() => DescSelector()}>
              Add
            </Button>
          </Form.Group>

          {desc?.map((i, index) => (
            <ul
              className="mt-2"
              style={{
                border: "1px solid #000",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              <li style={{ listStyle: "disc" }} className="mt-1">
                {i}
              </li>

              <li className="mt-3">
                <Button onClick={() => RemoveDesc(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}
      


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

/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";

const AddServiceBanner = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [ images, setImages ] = useState([])

 
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fd = new FormData();
  Array.from(images).forEach((img) => {
    fd.append("images", img);
  });


  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await axios.post(
        `${Baseurl}api/v1/ServicePage/addServicePage`,
        fd,
        Auth
      );
      toast.success(res.data.message);
      setSubmitLoading(false);
    } catch (e) {
      console.log(e);
      const msg = e.response.data.message;
      toast.error(msg);
      setSubmitLoading(false);
    }
  };

  return (
    <section>
      <section className="sectionCont">
        <p className="headP">Dashboard / Create New Service Banner</p>

        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Service Image</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setShopImage(e.target.files)}
            />
          </Form.Group>


          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>

            <Link to="/Orders">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(AddServiceBanner);

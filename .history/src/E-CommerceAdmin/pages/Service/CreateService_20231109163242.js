/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";

const CreateService = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [beforeAfterImage, setBeforeAfterImage] = useState("");
  const [catArr, setCatArr] = useState([]);
  const [type, setType] = useState("Service");

  const fetchNut = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/Category/allCategory`
      );
      setCatArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchNut();
  }, []);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fd = new FormData();
  Array.from(images).forEach((img) => {
    fd.append("image", img);
  });
  fd.append("categoryId", categoryId);
  fd.append("name", name);
  fd.append("description", description);
  fd.append("price", price);
  fd.append("beforeAfterImage", beforeAfterImage);
  fd.append("type", type);
  if(type === 'offer') {
    fd.append("discountActive", discountActive);
    fd.append("discount", discount);
  }

  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await axios.post(
        `${Baseurl}api/v1/admin/Service/addService`,
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
        <p className="headP">Dashboard / Create New Service</p>

        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
              <option>Selete Your Prefrence</option>
              {catArr?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i?.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Before / After Image</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setBeforeAfterImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select onChange={(e) => setType(e.target.value)}>
              <option>Selete Your Prefrence</option>
              <option value="Service"> Service </option>
              <option value="offer"> Offer </option>
            </Form.Select>
          </Form.Group>

          {type === "offer" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Discount Status</Form.Label>
                <Form.Select
                  onChange={(e) => setDiscountActive(e.target.value)}
                >
                  <option>Select Your Prefrence</option>
                  <option value="true"> Activate </option>
                  <option value="false"> DeActivate </option>
                </Form.Select>
              </Form.Group>

              {discountActive === "true" && (
                <Form.Group className="mb-3">
                  <Form.Label>Discount </Form.Label>
                  <Form.Control
                    type="number"
                    min={0}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Form.Group>
              )}
            </>
          )}

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>

            <Link to="/service">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};
export default HOC(CreateService);

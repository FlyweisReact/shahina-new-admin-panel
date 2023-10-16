/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";

const CreateProduct = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [nutritionId, setNutritionId] = useState("");
  const [skinTypeId, setSkinTypeId] = useState("");
  const [productTypeId, setProductTypeId] = useState("");
  const [skinConditionId, setSkinConditionId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [steps, setSteps] = useState("");
  const [StepDescription, setStepDescription] = useState("");
  const [benfit, setBenefit] = useState("");
  const [discountAllow, setDiscountAllow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [nutritionArray, setNutritionArray] = useState("");
  const [skinTypeArray, setSkinTypeArray] = useState("");
  const [productTypeArr, setProductTypeArr] = useState("");
  const [setSkinConditionArr, skinConditionArr] = useState("");
  const [setBrandArr, brandArr] = useState("");
  const [] = useState("");

  const fetchNut = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/Nutrition/allNutrition`
      );
      setNutritionArray(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchSkinType = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/Nutrition/allNutrition`
      );
      setSkinTypeArray(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchProductType = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/Nutrition/allNutrition`
      );
      setProductTypeArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchSkinCondition = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/Nutrition/allNutrition`
      );
      skinConditionArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchBrand = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/Nutrition/allNutrition`
      );
      brandArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchNut();
    fetchSkinType()
    fetchProductType()
    fetchSkinCondition()
    fetchBrand()
  }, []);

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
        `https://krish-vapes-backend.vercel.app/api/v1/Product/addProduct`,
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
      <p className="headP">Dashboard / Create New Product</p>
      <section className="sectionCont">
        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nutrition</Form.Label>
            <Form.Select onChange={(e) => setNutritionId(e.target.value)}>
              <option>Select Your Prefrence</option>
              {nutritionArray?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skin Type</Form.Label>
            <Form.Select onChange={(e) => setNutritionId(e.target.value)}>
              <option>Select Your Prefrence</option>
              {skinTypeArray?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Type</Form.Label>
            <Form.Select onChange={(e) => setNutritionId(e.target.value)}>
              <option>Select Your Prefrence</option>
              {nutritionArray?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
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

          <div>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "90%", margin: "0" }}>
                  <Form.Control type="text" />
                </div>
                <i
                  className="fa-solid fa-plus"
                  style={{ cursor: "pointer" }}
                ></i>
              </div>
              <ul className="mt-2">
                <li style={{ listStyle: "disc" }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <i
                      className="fa-solid fa-minus ml-2 "
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                </li>
              </ul>
            </Form.Group>
          </div>

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

export default HOC(CreateProduct);

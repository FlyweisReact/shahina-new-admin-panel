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
  const [benfit, setBenefit] = useState("");
  const [discountAllow, setDiscountAllow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [nutritionArray, setNutritionArray] = useState([]);
  const [skinTypeArray, setSkinTypeArray] = useState([]);
  const [productTypeArr, setProductTypeArr] = useState([]);
  const [skinConditionArr, SkinConditionArr] = useState([]);
  const [brandArr, setBrandArr] = useState([]);
  const [stock, setStock] = useState(1);
  const [step, setStep] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [howToUse, setHowToUse] = useState([]);

  const descObject = {
    step,
    stepDescription,
  };

  const use_adder = () => {
    setHowToUse((prev) => [...prev, descObject]);
    step("");
    stepDescription("");
  };

  const use_remover = (index) => {
    setHowToUse((prev) => prev.filter((_, i) => i !== index));
  };

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
        `${Baseurl}api/v1/admin/SkinType/allSkinType`
      );
      setSkinTypeArray(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchProductType = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/ProductType/allProductType`
      );
      setProductTypeArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchSkinCondition = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/SkinCondition/allSkinCondition`
      );
      SkinConditionArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchBrand = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/Brand/allBrand`);
      setBrandArr(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchNut();
    fetchSkinType();
    fetchProductType();
    fetchSkinCondition();
    fetchBrand();
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
            <Form.Select>
              <option>Selete Your Prefrence</option>
              {nutritionArray?.map((i, index) => (
                <option key={index}> {i?.name} </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skin Type</Form.Label>
            <Form.Select onChange={(e) => setSkinTypeId(e.target.value)}>
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
            <Form.Select onChange={(e) => setProductTypeId(e.target.value)}>
              <option>Select Your Prefrence</option>
              {productTypeArr?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Skin Condition</Form.Label>
            <Form.Select onChange={(e) => setSkinConditionId(e.target.value)}>
              <option>Select Your Prefrence</option>
              {skinConditionArr?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Brands</Form.Label>
            <Form.Select onChange={(e) => setBrandId(e.target.value)}>
              <option>Select Your Prefrence</option>
              {brandArr?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min={1}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>How To Use</Form.Label>
            <Form.Control
              type="text"
              value={step}
              placeholder="Step"
              onChange={(e) => setStep(e.target.value)}
              className="mb-3"
            />

            <FloatingLabel label="Step Description">
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                className="mb-3"
                
                onChange={(e) => setStepDescription(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="dark" onClick={() => use_adder()}>
              Add
            </Button>
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

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [nutritionArray, setNutritionArray] = useState([]);
  const [skinTypeArray, setSkinTypeArray] = useState([]);
  const [productTypeArr, setProductTypeArr] = useState([]);
  const [skinConditionArr, SkinConditionArr] = useState([]);
  const [brandArr, setBrandArr] = useState([]);
  const [stock, setStock] = useState(1);
  const [step, setStep] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [howToUse, setHowToUse] = useState([]);
  const [ingredients, setIngredeints] = useState("");
  const [price, setPrice] = useState(0);
  const [benfit, setBenefit] = useState([]);
  const [benefitName, setBenefitName] = useState("");
  const [multipleSize, setMultipleSize] = useState("false");
  const [shopId, setShopId] = useState("");
  const [id, setId] = useState("");
  const [sizes, setSizes] = useState("");
  const [multiplePrice, setMultiplePrice] = useState(0);
  const [multipleStock, setMultipleStock] = useState(0);
  const [multipleArr, setMultipleArr] = useState([]);

  // New Field
  const [keyIngredients, setKeyIngredients] = useState([]);
  const [keyIngredientsName, setKeyIngredientsName] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [acneType, setAcneType] = useState("");
  const [considerAcne, setConsiderAcne] = useState("");

  const descObject = {
    step,
    stepDescription,
  };

  const multipleObj = {
    sizes,
    multiplePrice,
    multipleStock,
  };

  const multiple_adder = () => {
    setMultipleArr((prev) => [...prev, multipleObj]);
    setSizes("");
    setMultiplePrice(0);
    setMultipleStock(0);
  };

  const multiple_remover = (index) => {
    setMultipleArr((prev) => prev.filter((_, i) => i !== index));
  };

  const use_adder = () => {
    setHowToUse((prev) => [...prev, descObject]);
    setStep("");
    setStepDescription("");
  };

  const use_remover = (index) => {
    setHowToUse((prev) => prev.filter((_, i) => i !== index));
  };

  const benefit_adder = () => {
    setBenefit((prev) => [...prev, benefitName]);
    setBenefitName("");
  };

  const benefit_remover = (index) => {
    setBenefit((prev) => prev.filter((_, i) => i !== index));
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

  const key_ingredients_adder = () => {
    setKeyIngredients((prev) => [...prev, keyIngredientsName]);
    setKeyIngredientsName("");
  };

  const key_ingredients_remover = (index) => {
    setKeyIngredients((prev) => prev.filter((_, i) => i !== index));
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
    fd.append("image", img);
  });
  fd.append(shopId, id);
  fd.append("name", name);
  fd.append("description", description);
  fd.append("stock", stock);
  Array.from(howToUse).forEach((i) => {
    fd.append("step", i.step);
    fd.append("stepDescription", i.stepDescription);
  });
  Array.from(multipleArr).forEach((i) => {
    fd.append("sizes", i.sizes);
    fd.append("multiplePrice", i.multiplePrice);
    fd.append("multipleStock", i.multipleStock);
  });
  Array.from(benfit).forEach((i) => {
    fd.append("benfit", i);
  });
  fd.append("price", price);
  fd.append("ingredients", ingredients);
  fd.append("multipleSize", multipleSize);

  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await axios.post(
        `${Baseurl}api/v1/admin/Product/addProduct`,
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

  const selectHandler = (first, second) => {
    setShopId(second);
    setId(first);
  };

  return (
    <section>
      <section className="sectionCont">
        <p className="headP">Dashboard / Create New Product</p>

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
            <Form.Select
              onChange={(e) => selectHandler(e.target.value, "nutritionId")}
            >
              <option>Selete Your Prefrence</option>
              {nutritionArray?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i?.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Skin Type</Form.Label>
            <Form.Select
              onChange={(e) => selectHandler(e.target.value, "skinTypeId")}
            >
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
            <Form.Select
              onChange={(e) => selectHandler(e.target.value, "productTypeId")}
            >
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
            <Form.Select
              onChange={(e) => selectHandler(e.target.value, "skinConditionId")}
            >
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
            <Form.Select
              onChange={(e) => selectHandler(e.target.value, "brandId")}
            >
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
                value={stepDescription}
                onChange={(e) => setStepDescription(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="dark" onClick={() => use_adder()}>
              Add
            </Button>
          </Form.Group>

          {howToUse?.map((i, index) => (
            <ul
              className="mt-2"
              style={{
                border: "1px solid #000",
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            >
              <li style={{ listStyle: "disc" }} className="mt-1">
                {i.step}
              </li>
              <li style={{ listStyle: "disc" }} className="mt-1">
                {i.stepDescription}
              </li>
              <li className="mt-3">
                <Button onClick={() => use_remover(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
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
            <Form.Label>Ingredients</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={(e) => setIngredeints(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Multiple Sizes</Form.Label>
            <Form.Select onChange={(e) => setMultipleSize(e.target.value)}>
              <option>Selete Your Prefrence</option>
              <option value={"true"}>Activate</option>
              <option value={"false"}> Deactivate</option>
            </Form.Select>
          </Form.Group>

          {multipleSize === "false" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  onChange={(e) => setPrice(e.target.value)}
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
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Multiple Sizes Detail</Form.Label>
                <Form.Control
                  type="text"
                  value={sizes}
                  placeholder="Size"
                  onChange={(e) => setSizes(e.target.value)}
                  className="mb-3"
                />

                <Form.Control
                  type="number"
                  min={0}
                  value={multiplePrice}
                  placeholder="Price"
                  onChange={(e) => setMultiplePrice(e.target.value)}
                  className="mb-3"
                />

                <Form.Control
                  type="number"
                  value={multipleStock}
                  placeholder="Stock"
                  min={0}
                  onChange={(e) => setMultipleStock(e.target.value)}
                  className="mb-3"
                />

                <Button variant="dark" onClick={() => multiple_adder()}>
                  Add
                </Button>
              </Form.Group>

              {multipleArr?.map((i, index) => (
                <ul
                  className="mt-2"
                  style={{
                    border: "1px solid #000",
                    paddingTop: "10px",
                    paddingBottom: "20px",
                  }}
                >
                  <li style={{ listStyle: "disc" }} className="mt-1">
                    {i.sizes}
                  </li>
                  <li style={{ listStyle: "disc" }} className="mt-1">
                    {i.multiplePrice}
                  </li>
                  <li style={{ listStyle: "disc" }} className="mt-1">
                    {i.multipleStock}
                  </li>
                  <li className="mt-3">
                    <Button onClick={() => multiple_remover(index)}>
                      Remove This One
                    </Button>
                  </li>
                </ul>
              ))}
            </>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Benefit</Form.Label>

            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                className="mb-3"
                value={benefitName}
                onChange={(e) => setBenefitName(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="dark" onClick={() => benefit_adder()}>
              Add
            </Button>
          </Form.Group>

          {benfit?.map((i, index) => (
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
                <Button onClick={() => benefit_remover(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}

          {/* Key Ingredients */}
          <Form.Group className="mb-3">
            <Form.Label>Key Ingredients</Form.Label>

            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                className="mb-3"
                value={keyIngredientsName}
                onChange={(e) => setKeyIngredientsName(e.target.value)}
              />
            </FloatingLabel>

            <Button variant="dark" onClick={() => key_ingredients_adder()}>
              Add
            </Button>
          </Form.Group>

          {keyIngredients?.map((i, index) => (
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
                <Button onClick={() => key_ingredients_remover(index)}>
                  Remove This One
                </Button>
              </li>
            </ul>
          ))}

          {/* Return Policu */}
          <Form.Group className="mb-3">
            <Form.Label>Return Policy</Form.Label>

            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                className="mb-3"
                onChange={(e) => setKeyIngredientsName(e.target.value)}
              />
            </FloatingLabel>
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

export default HOC(CreateProduct);

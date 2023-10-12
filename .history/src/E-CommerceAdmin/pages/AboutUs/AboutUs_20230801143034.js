/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Badge, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

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
      setTotal(data.data.total);
    } catch (e) {
      console.log(e);
    }
  };

  function Prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function Next() {
    setPage(page + 1);
  }

  const getImageLink = (item) => {
    if (item?.colorActive === true) {
      return item?.colors?.[0]?.img;
    } else {
      return item?.img;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, query]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://krish-vapes-backend.vercel.app/api/v1/Product/deleteProduct/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <>
      <p className="headP">Dashboard / About Us</p>

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
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
              <option>-- Select Category --</option>
              {categoryData?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Select onChange={(e) => setSubCategoryId(e.target.value)}>
              <option>-- Select Sub-Category --</option>
              {subCategoryData?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
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

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Include Tax</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setTaxInclude(e.target.value)}
            >
              <option>-- Select Prefrence --</option>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </Form.Select>
          </Form.Group>

          {taxInclude === "true" ? (
            <Form.Group className="mb-3">
              <Form.Label>Tax</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setTax(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3">
            <Form.Label>Include Discount</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setDiscount(e.target.value)}
            >
              <option>-- Select Prefrence --</option>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </Form.Select>
          </Form.Group>

          {discount === "true" ? (
            <Form.Group className="mb-3">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3">
            <Form.Label>Is Color Active</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setColorActive(e.target.value)}
            >
              <option>-- Select Prefrence --</option>
              <option value={"true"}>True</option>
              <option value={"false"}>False</option>
            </Form.Select>
          </Form.Group>

          {colorActive === "true" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Size</Form.Label>
                <Form.Select onChange={(e) => setSize(e.target.value)}>
                  <option>-- Select Prefrence --</option>
                  <option value={"true"}>True</option>
                  <option value={"false"}>False</option>
                </Form.Select>
              </Form.Group>

              {size === "true" ? (
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
                        <Form.Control
                          type="text"
                          onChange={(e) => setColorName(e.target.value)}
                          value={colorName}
                        />
                      </div>
                      <i
                        className="fa-solid fa-plus"
                        onClick={() => ColorSelector(colorName)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                    <ul className="mt-2">
                      {color?.map((i, index) => (
                        <li
                          key={index}
                          onClick={() => RemoveColor(index)}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImages(e.target.files)}
                      multiple
                    />
                  </Form.Group>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {size === "false" ? (
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
                    <Form.Control
                      type="text"
                      onChange={(e) => setColorName(e.target.value)}
                      value={colorName}
                    />
                  </div>
                  <i
                    className="fa-solid fa-plus"
                    onClick={() => ColorSelector(colorName)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <ul className="mt-2">
                  {color?.map((i, index) => (
                    <li
                      key={index}
                      onClick={() => RemoveColor(index)}
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
              <Form.Group className="mb-3">
                <Form.Label>Images</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImages(e.target.files)}
                  multiple
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ width: "90%", margin: "0" }}>
                    <Form.Control
                      type="number"
                      onChange={(e) => setQuantityDigit(e.target.value)}
                      value={quantityDigit}
                    />
                  </div>
                  <i
                    className="fa-solid fa-plus"
                    onClick={() => QuantitySelector(quantityDigit)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
                <ul className="mt-2">
                  {arrayQuantity.map((i, index) => (
                    <li
                      key={index}
                      onClick={() => RemoveQuantity(index)}
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
          ) : (
            ""
          )}

          {colorActive === "false" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
            </div>
          ) : (
            " "
          )}

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

/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProduct = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [subcategoryId, setSubCategoryId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [taxInclude, setTaxInclude] = useState(false);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [colorActive, setColorActive] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [arrayQuantity, setArrayQuantity] = useState([]);

  const fd = new FormData();
  fd.append("categoryId", categoryId);
  fd.append("subcategoryId", subcategoryId);
  fd.append("name", name);
  fd.append("description", description);
  fd.append("price", price);
  fd.append("taxInclude", taxInclude);
  fd.append("tax", tax);
  fd.append("discount", discount);
  fd.append("discountPrice", discountPrice);
  fd.append("colorActive", colorActive);

  if (colorActive === true) {
    if (size === false) {
      fd.append("color", color);
      fd.append("images", images);
      fd.append("arrayQuantity", arrayQuantity);
    } else {
      fd.append("color", color);
      fd.append("images", images);
    }
  } else {
    fd.append("image", image);
    fd.append("quantity", quantity);
  }

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const { res } = await axios.post(
        `https://krish-vapes-backend.vercel.app/api/v1/Product/addProduct`,
        fd
      );
      console.log(res);
    } catch (e) {
      console.log(e);
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <section>
      <p className="headP">Dashboard / Create New Product</p>
      <section className="sectionCont">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>-- Select Category --</option>
              <option value="64be3ea62591b241463b2528">
                64be3ea62591b241463b2528
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sub-Category</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>-- Select Sub-Category --</option>
              <option value="64be45844bbd0ae3dcbe3e18">
                64be45844bbd0ae3dcbe3e18
              </option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Form.Group>

          <Link to="/Orders">
            <Button variant="dark">Back</Button>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);

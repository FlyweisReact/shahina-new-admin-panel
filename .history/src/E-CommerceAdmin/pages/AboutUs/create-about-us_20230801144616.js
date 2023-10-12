import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const CreateAboutUs = () => {
    const [name, setName] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [subcategoryId, setSubCategoryId] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [taxInclude, setTaxInclude] = useState(false);
    const [tax, setTax] = useState(0);
    const [discount, setDiscount] = useState(false);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [colorActive, setColorActive] = useState(false);
    const [size, setSize] = useState(null);
    const [color, setColor] = useState([]);
    const [colorName, setColorName] = useState("");
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [arrayQuantity, setArrayQuantity] = useState([]);
    const [quantityDigit, setQuantityDigit] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const [subCategoryData, setSubCategoryData] = useState([]);
  
    const getCategory = async () => {
      try {
        const res = await axios.get(
          "https://krish-vapes-backend.vercel.app/api/v1/Category/allCategory"
        );
        setCategoryData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
  
    const getSubCategory = async () => {
      try {
        const res = await axios.get(
          "https://krish-vapes-backend.vercel.app/api/v1/SubCategory/all/SubCategoryForAdmin"
        );
        setSubCategoryData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      getCategory();
      getSubCategory();
    }, []);
  
    const ColorSelector = (colors) => {
      setColor((prev) => [...prev, colors]);
      setColorName("");
    };
  
    const RemoveColor = (index) => {
      setColor((prev) => prev.filter((_, i) => i !== index));
    };
  
    const QuantitySelector = (quantity) => {
      setArrayQuantity((prev) => [...prev, quantity]);
      setQuantityDigit("");
    };
  
    const RemoveQuantity = (index) => {
      setArrayQuantity((prev) => prev.filter((_, i) => i !== index));
    };
  
    const token = localStorage.getItem("AdminToken");
    const Auth = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
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

  
    const createProduct = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `https://krish-vapes-backend.vercel.app/api/v1/Product/addProduct`,
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
          <Form onSubmit={createProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
              />
            </Form.Group>
  
    
  
         
  
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                />
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

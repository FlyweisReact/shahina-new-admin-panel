/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProduct = () => {

    const [categoryId , setCategoryId ] = useState(null)
    const [subcategoryId , setSubCategoryId ] = useState(null)
    const [name , setName ] = useState(null)
    const [description  , setDescription ] = useState(null)
    const [price , setPrice ] = useState(null)
    const [taxInclude , setTaxInclude ] = useState(false)
    const [tax , setTax ] = useState(null)
    const [discount , setDiscount ] = useState(null)
    const [ discountPrice , setDiscountPrice] = useState()
    const [colorActive , setColorActive  ] = useState()
    const [ size , setSize ] = useState()
    const [color ,setColor ] = useState()
    const [ images , setImages] = useState()
    const [ quantity , setQuantity ] = useState()

    const createProduct = async (e) => {
        e.preventDefault()

        const fd = new FormData()
        fd.append("categoryId" , categoryId)
        fd.append("subcategoryId" , subcategoryId)
        fd.append("categoryId" , categoryId)
        fd.append("categoryId" , categoryId)
        fd.append("categoryId" , categoryId)
        fd.append("categoryId" , categoryId)
        fd.append("categoryId" , categoryId)

        try{
            const res = await axios.post(`https://krish-vapes-backend.vercel.app/api/v1/Product/addProduct` )
        }catch(e) { 
            console.log(e)
            const msg = e.response.data.message
            toast.error(msg)
        }
    }

  return (
    <section>
      <p className="headP">Dashboard / Create New Product</p>
      <section className="sectionCont">
        <Form>
          <Link to="/Orders">
            <Button variant="dark">Back</Button>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);

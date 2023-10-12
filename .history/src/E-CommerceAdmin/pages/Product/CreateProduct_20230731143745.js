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
    const [tax , setTax ] = useState(0)
    const [discount , setDiscount ] = useState(null)
    const [ discountPrice , setDiscountPrice] = useState(0)
    const [colorActive , setColorActive  ] = useState(null)
    const [ size , setSize ] = useState(null)
    const [color ,setColor ] = useState([])
    const [ images , setImages] = useState([])
    const [ image  , setImage ] = useState(null)
    const [ quantity , setQuantity ] = useState(0)
    const [ arrayQuantity , setArrayQuantity ] = useState([])


    const fd = new Form

    if(colorActive === true) {

    }else{
        const fd = new FormData()
    }

    const createProduct = async (e) => {
        e.preventDefault()

    
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

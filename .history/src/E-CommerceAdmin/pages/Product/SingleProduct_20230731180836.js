/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";

  const getOrder = async () => {
    try {
      const response = await axios.get(`${BaseUrl}api/v1/Product/${id}`);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getImageLink = (item) => {
    if (item?.productId?.colorActive === true) {
      return item?.productColorId?.img;
    } else {
      return item?.productId?.img;
    }
  };
  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <section>
      <p className="headP">Dashboard / {data?.name}</p>
      <section className="sectionCont">
        <Form>
          <div className="img-cont">
            {data?.colors
              ? data?.colors?.map((i) => (
                  <img src={i.img} alt="" className="centerImage" key={i._id} />
                ))
              : ""}
          </div>
          <img src={getImageLink(data)} alt="" className="centerImage" />
          {ValueChecker(data?.name, "Product Name")}
          {ValueChecker(data?.description, "Description")}
          {ValueChecker(data?.price, "Price")}
          {ValueChecker(data?.quantity, "Quantity")}
          {ValueChecker(data?.discountPrice, "Discount Price")}
          {ValueChecker(data?.tax, "Tax")}
          {ValueChecker(data?.ratings, "Ratings")}

          {data?.colors
            ? data?.colors?.map((i) => (
                <Form.Group className="mb-3">
                  <Form.Label>Colors </Form.Label>

                  <Form.Control
                    placeholder={i.color}
                    disabled
                    className="mt-2"
                    key={i._id}
                  />
                  <span style={{backgroundColor : "#e9ecef"}} >
                    {i.}
                  </span>
                </Form.Group>
              ))
            : ""}

          {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

          <Link to="/Product">
            <Button variant="dark">Back</Button>
          </Link>
        </Form>
      </section>
    </section>
  );
};

export default HOC(SingleProduct);

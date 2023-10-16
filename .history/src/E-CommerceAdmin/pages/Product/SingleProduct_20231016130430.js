/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const token = localStorage.getItem("AdminToken");

  const getOrder = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/Product/${id}`);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <div className="Desc-Container">
        <p className="title"> {string} </p>
        <p className="desc"> {holder} </p>
      </div>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <p className="headP">Dashboard / {data?.name}</p>
        <section className="sectionCont">
          <Form>
            <div className="img-cont">
              {data?.productImages
                ? data?.productImages?.map((i) => (
                    <img
                      src={i.image}
                      alt=""
                      className="centerImage"
                      key={i._id}
                    />
                  ))
                : ""}
            </div>
            {ValueChecker(data?.name, "Product Name")}
            {ValueChecker(data?.description, "Description")}
            {ValueChecker(data?.price, "Price")}
            {ValueChecker(data?.stock, "In Stock")}
            {ValueChecker(data?.discountPrice, "Discount Price")}
            {ValueChecker(data?.numOfReviews, "Number of Reviews")}
            {ValueChecker(data?.ingredients, "Ingredeints")}
            {ValueChecker(data?.brandId?.name, "Brand Name")}
            {ValueChecker(data?.discountAllow, "")}

            {data?.benfit && (
              <div className="Desc-Container">
                <p className="title"> Benefits </p>
                {data?.benfit?.map((i, index) => (
                  <p className="desc" key={index}>
                    {" "}
                    {i}{" "}
                  </p>
                ))}
              </div>
            )}
            {data?.discountAllow && (
              <div className="Desc-Container">
                <p className="title"> Discount Status </p>
                  <p className="desc" key={index}>
                  </p>
              </div>
            )}

            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleProduct);

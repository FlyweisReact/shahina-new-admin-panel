/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/user/viewOrder/${id}`,
        Auth
      );
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getImageLink = (item) => {
    if (item?.colorActive === true) {
      return item?.colors?.[0]?.img;
    } else {
      return item?.img;
    }
  };

  function ValueChecker(holder, string) {
    return (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    );
  }

  return (
    <section>
      <p className="headP">Dashboard / Order</p>
      <section className="sectionCont">
        <Form>
        <img src=""
          {ValueChecker(data?.address?.alias, "Address Alias")}
          {ValueChecker(data?.address?.address, "Address")}
          {ValueChecker(data?.address?.addressComplement, "Address Compliment")}
          {ValueChecker(data?.address?.city, "City")}
          {ValueChecker(data?.address?.pincode, "Pincode")}
          {ValueChecker(data?.address?.country, "Country")}
          {ValueChecker(data?.address?.phone, "Phone Number")}
          {ValueChecker(data?.orderId, "OrderId")}
          {ValueChecker(data?.userId?.fullName, "Full Name")}
          {ValueChecker(data?.userId?.email, "Email Address")}
          {ValueChecker(data?.productId?.name, "Product Name")}
          {ValueChecker(data?.productId?.country, "Country")}
        </Form>
      </section>
    </section>
  );
};

export default HOC(SingleOrder);

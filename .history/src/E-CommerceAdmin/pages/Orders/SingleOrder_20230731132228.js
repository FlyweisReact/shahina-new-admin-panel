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
        {ValueChecker()}
          <Form.Group className="mb-3">
            <Form.Label>Address Alias</Form.Label>
            <Form.Control placeholder={data?.address?.alias} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address </Form.Label>
            <Form.Control placeholder={data?.address?.address} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address Compliment</Form.Label>
            <Form.Control
              placeholder={data?.address?.addressComplement}
              disabled
            />
          </Form.Group>
        </Form>
      </section>
    </section>
  );
};

export default HOC(SingleOrder);

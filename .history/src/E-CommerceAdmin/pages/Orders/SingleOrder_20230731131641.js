/** @format */

import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleOrder = () => {
  const { id } = useParams();

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrder = async () => {
    try {
        const response = await axios.get(`/api/v1/user/viewOrder/64c25d2c2ba30c636d979c54`)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section>
      <p className="headP">Dashboard / Order</p>
      <section className="sectionCont"></section>
    </section>
  );
};

export default HOC(SingleOrder);

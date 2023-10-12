/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

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

  return (
    <section>
      <p className="headP">Dashboard / Order</p>
      <section className="sectionCont">
        
      </section>
    </section>
  );
};

export default HOC(SingleOrder);

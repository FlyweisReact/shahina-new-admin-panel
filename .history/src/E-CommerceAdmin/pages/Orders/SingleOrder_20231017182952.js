/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import html2pdf from "html2pdf.js";
import logo from "../../../Images/logo.png";
import { Baseurl } from "../../../Baseurl";

const SingleOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem("AdminToken");

  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/viewproductOrder/652d32c7ff66d876a125088f/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
    <>
      <section className="sectionCont">
        <p className="headP">Dashboard / {data?.orderId}</p>
      </section>
    </>
  );
};

export default HOC(SingleOrder);

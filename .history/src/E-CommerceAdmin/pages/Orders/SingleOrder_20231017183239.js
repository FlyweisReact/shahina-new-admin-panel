/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Baseurl } from "../../../Baseurl";

const SingleOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem("AdminToken");


  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/viewproductOrder/${id}`,
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
      <section className="sectionCont">
        <p className="headP">Dashboard / {data?.orderId}</p>

        {ValueChecker(data?.orderId , "Order Id")}
        {ValueChecker(data?.total , "Total Amount")}
        {ValueChecker(data?.discount , "Discount Amount")}
        {ValueChecker(data?.subTotal , "SubTotal Amount")}
        {ValueChecker(data?.shipping , "Shipping Amount")}
        {ValueChecker(data?.memberShip , "Membership Amount")}
      </section>
    </>
  );
};

export default HOC(SingleOrder);

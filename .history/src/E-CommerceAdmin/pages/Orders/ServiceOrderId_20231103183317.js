/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Baseurl } from "../../../Baseurl";

const ServiceOrderId = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem("AdminToken");

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/viewserviceOrder/${id}`,
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

        {ValueChecker(data?.orderId, "Order Id")}
        {ValueChecker(data?.time, "Time")}
        {ValueChecker(data?.total, "Total Amount")}
        {ValueChecker(data?.total, "Total Amount")}
        {ValueChecker(data?.memberShip, "Membership Amount")}
        {ValueChecker(data?.grandTotal, "Grand Total Amount")}
        {ValueChecker(data?.user?.firstName, "User First Name")}
        {ValueChecker(data?.user?.lastName, "User Last Name")}
        {ValueChecker(data?.user?.phone, "User Contact Detail")}
        {ValueChecker(data?.user?.email, "User Email Address")}

        {data?.serviceAddresss && (
          <div className="Desc-Container">
            <p className="title"> Service Address </p>
            <p className="desc">
              {" "}
              Appartment : {data?.serviceAddresss?.appartment}{" "}
            </p>
            <p className="desc">
              {" "}
              Landmark : {data?.serviceAddresss?.landMark}{" "}
            </p>
          </div>
        )}

        {data?.services?.map((i, index) => (
          <div className="Desc-Container" key={index}>
            <p className="title"> Service Details </p>
            <p className="desc">Title : {i.serviceId?.name}</p>
            <p className="desc"> Quantity : {i?.quantity}</p>
            <p className="desc"> MRP : {i?.serviceId?.price}</p>
            <p className="desc">
              {" "}
              Discount Price : {i?.serviceId?.discountPrice}
            </p>
            <p className="desc">
              {" "}
              Discount Status : {i?.serviceId?.discountActive === true ? "Active" : "Not Active"}
            </p>
          </div>
        ))}
        {data?.AddOnservicesSchema?.map((i, index) => (
          <div className="Desc-Container" key={index}>
            <p className="title"> Ad On Service Details </p>
            <p className="desc">Title : {i.addOnservicesId?.name}</p>
            <p className="desc"> Quantity : {i?.quantity}</p>
            <p className="desc"> MRP : {i?.addOnservicesId?.price}</p>
            <p className="desc"> Time : {i?.addOnservicesId?.time}</p>
          
          </div>
        ))}

        {ValueChecker(data?.orderStatus, "Order Status")}
        {ValueChecker(data?.paymentStatus, "Payment Status")}
        {ValueChecker(data?.serviceStatus, "Service Status")}
        {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}
      </section>
    </>
  );
};

export default HOC(ServiceOrderId);

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
        `${Baseurl}api/v1/admin/viewproductOrder/${id}`,
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
        {ValueChecker(data?.total, "Total Amount")}
        {ValueChecker(data?.discount, "Discount Amount")}
        {ValueChecker(data?.subTotal, "SubTotal Amount")}
        {ValueChecker(data?.shipping, "Shipping Amount")}
        {ValueChecker(data?.memberShip, "Membership Amount")}
        {ValueChecker(data?.grandTotal, "Grand Total Amount")}
        {ValueChecker(data?.user?.firstName, "User First Name")}
        {ValueChecker(data?.user?.lastName, "User Last Name")}
        {ValueChecker(data?.user?.phone, "User Contact Detail")}
        {ValueChecker(data?.user?.email, "User Email Address")}

        {data?.billingAddresss && (
          <div className="Desc-Container">
            <p className="title"> Billing Address </p>
            <p className="desc"> Address : {data?.billingAddresss?.address} </p>
            <p className="desc">
              {" "}
              Apartment : {data?.billingAddresss?.appartment}{" "}
            </p>
            <p className="desc"> City : {data?.billingAddresss?.city} </p>
            <p className="desc">
              {" "}
              Zip Code : {data?.billingAddresss?.zipCode}{" "}
            </p>
          </div>
        )}
        {data?.deliveryAddresss && (
          <div className="Desc-Container">
            <p className="title"> Delivery Address </p>
            <p className="desc">
              {" "}
              Address : {data?.deliveryAddresss?.address}{" "}
            </p>
            <p className="desc">
              {" "}
              Apartment : {data?.deliveryAddresss?.appartment}{" "}
            </p>
            <p className="desc"> City : {data?.deliveryAddresss?.city} </p>
            <p className="desc">
              {" "}
              Zip Code : {data?.deliveryAddresss?.zipCode}{" "}
            </p>
          </div>
        )}

        {data?.pickupFromStore === true ? (
          <div className="Desc-Container">
            <p className="title"> Pick up Store </p>
            <p className="desc"> Yes </p>
          </div>
        ) : (
          <div className="Desc-Container">
            <p className="title"> Pick up Store </p>
            <p className="desc"> No </p>
          </div>
        )}

        {data?.products?.map((i, index) => (
          <div className="Desc-Container" key={index}>
            <p className="title"> Product Details </p>
            <p className="desc">Title : {i.productId?.name}</p>
            <p className="desc"> Quantity{i?.quantity}</p>
            {i?.size && <p className="desc"> Size : {i?.size}</p>}
          </div>
        ))}

        {ValueChecker(data?.orderStatus, "Order Status")}
        {ValueChecker(data?.paymentStatus, "Payment Status")}
        {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}
      </section>
    </>
  );
};

export default HOC(SingleOrder);


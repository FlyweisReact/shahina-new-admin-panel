/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";
import { Baseurl } from "../../../Baseurl";

const UserData = () => {
  const { id } = useParams();
  const token = localStorage.getItem("AdminToken");
  const [user, setUser] = useState([]);
  const [address, setAddress] = useState({});

  const Auth = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/viewUser/${id}`);
      console.log(data);
      setUser(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const handleApproveReject = async (status) => {
    try {
      const { data } = await axios.put(
        `https://krish-vapes-backend.vercel.app/api/v1/admin/approveRejectUser/${id}`,
        {
          status,
        },
        Auth
      );
      toast.success(data.msg);
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

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
      <p className="headP">Dashboard / {user?.firstName} </p>
      <section className="sectionCont">
        {ValueChecker(user?.firstName, "First Name")}
        {ValueChecker(user?.lastName, "Last Name")}
        {ValueChecker(user?.dob, "Date of Birth")}
        {ValueChecker(user?.email, "Email Address")}
        {ValueChecker(user?.countryCode, "Country Code")}
        {ValueChecker(user?.phone, "Phone Number")}
        {ValueChecker(user?.gender, "Gender")}
        {ValueChecker(user?.isSubscription, "Subcription")}
        {ValueChecker(user?.refferalCode, "Refferal Code")}
        {ValueChecker(
          user?.subscriptionExpiration?.slice(0, 10),
          "Subscription Expiration"
        )}
        {ValueChecker(user?.createdAt?.slice(0, 10), "Created At")}

        {user?.isSubscription === true ? (
          <div className="Desc-Container">
            <p className="title"> Subscription </p>
            <p className="desc"> Active </p>
          </div>
        ) : (
          <div className="Desc-Container">
            <p className="title"> Subscription </p>
            <p className="desc"> Active </p>
          </div>
        )}
      </section>
    </>
  );
};

export default HOC(UserData);

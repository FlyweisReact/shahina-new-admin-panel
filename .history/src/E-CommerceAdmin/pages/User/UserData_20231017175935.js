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
  const [ address , setAddress ] = useState({})

  const Auth = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/viewUser/${id}`)
    console.log(data)
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
          {ValueChecker(user?.country, "Country Code")}
          {ValueChecker(user?.phone, "Phone Number")}
          {ValueChecker(user?.vatNumber, "Vat Number")}
          {ValueChecker(user?.status, "Status")}
          {ValueChecker(user?.registrationNo, "Registration Number")}
          {ValueChecker(address?.address, "Buisness Address")}
          {ValueChecker(address?.addressComplement, "Buisness Address Complement")}
          {ValueChecker(address?.city, "City")}
          {ValueChecker(address?.country, "Country")}
          {ValueChecker(address?.pincode, "Postal Code")}
          {ValueChecker(user?.createdAt?.slice(0, 10), "Created At")}
   

      </section>
    </>
  );
};

export default HOC(UserData);

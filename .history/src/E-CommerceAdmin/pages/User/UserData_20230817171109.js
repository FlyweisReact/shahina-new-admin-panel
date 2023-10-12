/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

const UserData = () => {
  const { id } = useParams();
  const token = localStorage.getItem("AdminToken");
  const [user, setUser] = useState([]);

  const Auth = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getUser = async () => {
    const url = `https://krish-vapes-backend.vercel.app/api/v1/admin/viewUser/${id}`;
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <>
      <p className="headP">Dashboard / {user?.fullName} </p>
      <section className="sectionCont">
        <Form>
          {ValueChecker(user?.courtesyTitle, "Social title")}
          {ValueChecker(user?.firstName, "First Name")}
          {ValueChecker(user?.lastName, "Last Name")}
          {ValueChecker(user?.fullName, "Full Name")}
          {ValueChecker(user?.dob, "Date of Birth")}
          {ValueChecker(user?.email, "Email Address")}
          {ValueChecker(user?.company, "Company")}
          {ValueChecker(user?.country, "Country")}
          {ValueChecker(user?.phone, "Phone Number")}
          {ValueChecker(user?.vatNumber, "Vat Number")}
          {ValueChecker(user?.status, "Status")}
          {ValueChecker(user?.createdAt?.slice(0, 10), "Created At")}
        </Form>

        {user?.status === "Approved" ? (
          <Button
            variant="danger"
            onClick={() => handleApproveReject("Reject")}
          >
            Reject
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={() => handleApproveReject("Approved")}
          >
            Approved
          </Button>
        )}
          <div className="mb-5"></div>
          <Link to="/user" className="mt-5">
          <Button variant="dark">Back</Button>
        </Link>
      </section>
    </>
  );
};

export default HOC(UserData);

/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Baseurl } from "../../../Baseurl";
import { Button } from "react-bootstrap";

const UserData = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/viewUser/${id}`);
      setUser(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUser();
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
        <p className="headP">Dashboard / {user?.firstName} </p>

        <div className="img-cont">
          <img src={user?.image} alt="" className="centerImage" />
        </div>
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
            <p className="desc"> Not Active </p>
          </div>
        )}

        <Button variant="dark">Back</Button>
      </section>
    </>
  );
};

export default HOC(UserData);

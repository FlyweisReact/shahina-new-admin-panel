/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Internationalization } from "@syncfusion/ej2-base";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ContentTemplate = (props) => {
  const [users, setUsers] = useState([]);
  const [service, setServices] = useState([]);
  const [productId, setProductId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const intl = new Internationalization();
  const token = localStorage.getItem("AdminToken");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/getAllUser`
      );
      setUsers(data.data);
    } catch {}
  };

  const fetchService = async () => {
    try {
      const res = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/Service/all/paginateServiceSearch`
      );
      const data = res.data.data?.docs;
      setServices(data);
    } catch {}
  };

  useEffect(() => {
    fetchUsers();
    fetchService();
  }, []);

  const payload = {
    quantity: 1,
    userId,
    date,
    time,
  };

  const addInCart = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/service/${productId}`,
        payload,
        Auth
      );
      toast.success(data.message);
      fetch_user_service();
      //   props.fetchHandler();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (props?.StartTime) {
      setTime(intl.formatDate(props.StartTime, { skeleton: "hm" }));
      const originalDate = new Date(props?.StartTime);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
    }
  }, [props]);

  //   Filtered Service
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = searchTerm
    ? service?.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : service;

  //   Filtered Users
  const [search, setSearch] = useState("");

  const filtereUser = search
    ? users?.filter(
        (option) =>
          option.firstName.toLowerCase().includes(search.toLowerCase()) ||
          option.lastName.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  // Get User Cart
  const [cart, setCart] = useState([]);

  const fetch_user_service = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/getCart/${userId}`,
        Auth
      );
      setCart(data.cart);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userId) {
      fetch_user_service();
    }
  }, [userId]);

  const deleteService = async (payload) => {
    try {
      const { res } = await axios.delete(
        `${process.env.React_App_Baseurl}api/admin/cart/delete/service/${payload}/${userId}`,
        Auth
      );
      toast.success("Removed");
      fetchData();
    } catch {}
  };

  return props?.Id ? (
    <div className="Schedule_Enquiry_Modal">
      <div className="close_btn">
        <h4>{props.Subject}</h4>
      </div>

      <p> First name : {props.FirstName} </p>
      <p> Last name : {props.LastName} </p>
      <p> User Email : {props.userEmail} </p>
      <p> Phone Number : {props.userPhone} </p>
    </div>
  ) : (
    <div className="Add_Service_Modal">
      <form onSubmit={addInCart}>
        <div>
          <input
            type="text"
            placeholder="Start typing to search for services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setProductId(e.target.value)}>
            <option>open to see results...</option>
            {filteredServices?.length > 0 ? (
              filteredServices?.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))
            ) : (
              <option>No Matching result found for {searchTerm}</option>
            )}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Start typing to search for users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select onChange={(e) => setUserId(e.target.value)}>
            <option>open to see results...</option>
            {filtereUser?.length > 0 ? (
              filtereUser?.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.firstName + " " + option.lastName}
                </option>
              ))
            ) : (
              <option>No Matching result found for {search}</option>
            )}
          </select>
        </div>

        <button className="Add_Service_Modal_button" type="submit">
          Add Service
        </button>
      </form>

      <div className="overFlowCont mt-5">
        <Table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart?.services?.map((i, index) => (
              <tr key={index}>
                <td> {i.serviceId?.name} </td>
                <td>
                  {" "}
                  <i className="fa-solid fa-dollar-sign"></i>
                  {i.total}{" "}
                </td>
                <td>
                  <span className="flexCont">
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => navigate(`/service/${i.serviceId?._id}`)}
                    ></i>
                    <i
                      className="fa-sharp fa-solid fa-trash"
                      // onClick={() => deleteService(i.serviceId?._id)}
                    ></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ContentTemplate;

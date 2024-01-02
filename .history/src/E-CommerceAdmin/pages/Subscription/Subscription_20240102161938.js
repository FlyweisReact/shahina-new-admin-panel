/** @format */

import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { View_description } from "../../../Helper/Helper";

const Subscription = () => {
  const token = localStorage.getItem("AdminToken");
  const [subCat, setSubcat] = useState([]);


  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.React_App_Baseurl}api/v1/subscription`);
      setSubcat(data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getSubCategory();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.React_App_Baseurl}api/v1/subscription/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data?.message);
      getSubCategory();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section>
        <section className="sectionCont">
          <p className="headP">Dashboard / Subscription</p>
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className=" text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Subscription's ({subCat?.length})
            </span>
            <Link to="/create-subscription">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
                Create New
              </button>
            </Link>
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Plan</th>
                  <th>Price</th>
                  <th>Month</th>
                  <th>Discount</th>
                  <th>Detail</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subCat?.map((ele, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele?.plan}</td>
                    <td>{ele?.price}</td>
                    <td>{ele?.month}</td>
                    <td>{ele?.discount}</td>
                    <td>
                    <View_description />
                    {console.log(ele?.details?.[0])}
                      <ul style={{ listStyle: "disc" }}>
                        {ele?.details?.map((i, index) => (
                          <li key={index}> {i} </li>
                        ))}
                      </ul>
                    </td>
                    <td>{ele?.createdAt?.slice(0, 10)}</td>
                    <td>
                      <span className="flexCont">
                        <Link to={`/edit-subscription/${ele?._id}`}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>{" "}
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(ele._id)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(Subscription);

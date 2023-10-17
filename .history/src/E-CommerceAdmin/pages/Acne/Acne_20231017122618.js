/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Badge, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";

const Acne = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/AcneQuiz`);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/Product/deleteProduct/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };


  
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Acne Quiz
          </span>
          <div className="d-flex gap-1">
            <Link to="/create-product">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                Create New
              </button>
            </Link>
          </div>
        </div>

        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="overFlowCont">
              {data?.docs?.length === 0 || !data ? (
                <Alert>No Product Found</Alert>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Question</th>
                      <th>Option1</th>
                      <th>Option1 Image</th>
                      <th>Option2</th>
                      <th>Option2 Image</th>
                      <th>Option3</th>
                      <th>Option3 Image</th>
                      <th>Option4</th>
                      <th>Option4 Image</th>
                      <th>Created At </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i.question} </td>
                        <td> {i.option1} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option1image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.option2} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option2image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.option3} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option3image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.option4} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option4image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.createdAt?.slice(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <Link to={`/edit-product/${i._id}`}>
                              <i className="fa-solid fa-pen-to-square" />
                            </Link>
                        
                            <i
                              className="fa-sharp fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(Acne);

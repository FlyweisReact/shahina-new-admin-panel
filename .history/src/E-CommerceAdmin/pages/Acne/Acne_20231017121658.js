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
  const [total, setTotal] = useState(0);

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
      setTotal(data.data.length);
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
                Create Product
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
                      <th> </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.docs?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td style={{ cursor: "pointer" }}>
                          <div className="CarouselImages">
                            <img src={i.productImages?.[0]?.image} alt="" />
                          </div>
                        </td>

                        <td> {i.name} </td>
                        <td> {i.price} </td>
                        <td>{i.discountPrice}</td>
                        <td>
                          {i.stock >= 100 ? (
                            <Badge bg="success">{i.stock} In Stock</Badge>
                          ) : (
                            <Badge bg="danger">{i.stock} In Stock</Badge>
                          )}
                        </td>
                        <td>
                          {" "}
                          {i.discountAllow === true
                            ? "Active"
                            : "Not Active"}{" "}
                        </td>
                        <td>
                          <span className="flexCont">
                            <Link to={`/edit-product/${i._id}`}>
                              <i className="fa-solid fa-pen-to-square" />
                            </Link>
                            <Link to={`/product/${i._id}`}>
                              <i className="fa-solid fa-eye" />
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

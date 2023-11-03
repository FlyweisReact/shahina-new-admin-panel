import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { useNavigate } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";

const Scheduler = () => {  
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <section className="sectionCont">
          <p className="headP">Dashboard / All User</p>
  
          <div className="pb-4  w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All User's ( Total : {total} )
            </span>
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => setModalShow(true)}
            >
              Create New
            </button>
          </div>
  
          {data?.length === 0 || !data ? (
            <SpinnerComp />
          ) : (
            <>
              <div className="overFlowCont">
                {data?.length === 0 || !data ? (
                  <Alert>No User Found</Alert>
                ) : (
                  <Table>
                    <thead>
                      <tr>
                        <th>Sno.</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Mobile Number</th>
                        <th>Email Address</th>
                        <th>Gender</th>
                        <th>Cart</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((i, index) => (
                        <tr key={index}>
                          <td> #{index + 1} </td>
                          <td> {i.firstName} </td>
                          <td> {i.lastName} </td>
                          <td>{i.phone}</td>
                          <td>{i.email}</td>
                          <td>{i.gender}</td>
                          <td>
                            <button
                              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
                              onClick={() => navigate(`/cart/${i._id}`)}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <span className="flexCont">
                              <i
                                className="fa-solid fa-eye"
                                onClick={() => navigate(`/user-data/${i._id}`)}
                              ></i>
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

export default HOC(Scheduler)
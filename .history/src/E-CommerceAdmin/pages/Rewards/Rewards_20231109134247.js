/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Badge , Modal } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { Baseurl } from "../../../Baseurl";

const Rewards = () => {
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
      const { data } = await axios.get(
        `${Baseurl}api/v1/admin/getAllcoupan`,
        Auth
      );
      setData(data?.cart);
      setTotal(data?.cart?.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="sectionCont">
        <p className="headP">Dashboard / All Rewards</p>

        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Rewards's ( Total : {total} )
          </span>
        </div>

        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="overFlowCont">
              {data?.length === 0 || !data ? (
                <Alert>No Data Found</Alert>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>User </th>
                      <th>Title</th>
                      <th>Code</th>
                      <th>Price</th>
                      <th>Discount</th>
                      <th>Email</th>
                      <th>Used</th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td>
                          {" "}
                          {i.senderUser?.firstName +
                            " " +
                            i.senderUser?.lastName}{" "}
                        </td>
                        <td> {i.title} </td>
                        <td>{i.code}</td>
                        <td>${i.price}</td>
                        <td>{i.discount}</td>
                        <td>{i.email}</td>
                        <td>{i.used === true ? "Yes" : "No"}</td>
                        <td>
                          <Badge>{i.orderStatus}</Badge>
                        </td>
                        <td>
                          <Badge>{i.paymentStatus}</Badge>
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

export default HOC(Rewards);

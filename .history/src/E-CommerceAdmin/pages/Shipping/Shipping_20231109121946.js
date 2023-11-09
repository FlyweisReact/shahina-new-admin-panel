/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const Shipping = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/getAllShipment`,
        Auth
      );
    setData(response.data.data)
    setTotal(response.data.data?.length)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);



  return (
    <>
      <section>
        <section className="sectionCont">
          <p className="headP">Dashboard / Order</p>

          <div className="pb-4  w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Order's (Total : {total})
            </span>
          </div>
   

          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Order Id</th>
                      <th>Grand Total</th>
                      <th>MemberShip Amount </th>
                      <th>Total Amount </th>
                      <th>Pick up Store </th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th>Delivery Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                       <td>

                     <a></a>
                       </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Shipping);

/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const ServiceOrder = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const FinalFromDate =
    fromDate === "" || fromDate?.length < 5 ? "" : `${fromDate}T00:00:00.000Z`;
  const FinalToDate =
    toDate === null || toDate?.length < 5 ? "" : `${toDate}T23:59:59.000Z`;

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/ServiceOrders?search=${search}&fromDate=${FinalFromDate}&toDate=${FinalToDate}&page=${page}&limit=${limit}`,
        Auth
      );
      setData(response.data.data?.docs?.reverse());
      setTotal(response.data.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  function Prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function Next() {
    setPage(page + 1);
  }

  useEffect(() => {
    getOrders();
    window.scrollTo(0, 0);
  }, [search, FinalFromDate, FinalToDate, page, limit]);

  return (
    <>
      <section>
        <section className="sectionCont">
          <p className="headP">Dashboard / Service Order</p>

          <div className="pb-4  w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Service Order's (Total : {total})
            </span>
          </div>

          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Search by OrderId"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="searchByDate">
            <div>
              <label>Starting Date </label>
              <input
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <label>Ending Date </label>
              <input type="date" onChange={(e) => setToDate(e.target.value)} />
            </div>
          </div>

          <div className="searchByDate">
            <div>
              <label>Showing : </label>
              <select onChange={(e) => setLimit(e.target.value)}>
                <option>
                  {" "}
                  Showing {data?.length} out of {total}{" "}
                </option>
                <option value={total}> All </option>
                <option value={10}> 10 </option>
                <option value={20}> 20 </option>
                <option value={50}> 50 </option>
                <option value={100}> 100 </option>
              </select>
            </div>
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
                      <th>Sub Total</th>
                      <th>MemberShip Amount </th>
                      <th>Total Amount </th>
                      <th>Offer Discount </th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th>Service Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i.orderId} </td>
                        <td> ${i?.grandTotal} </td>
                        <td> ${i?.subTotal} </td>
                        <td> ${i.memberShip} </td>
                        <td> ${i.total} </td>
                        <td> ${i.offerDiscount} </td>
                        <td>
                          {" "}
                          <Badge>{i.orderStatus}</Badge>{" "}
                        </td>
                        <td>
                          {" "}
                          <Badge>{i.paymentStatus}</Badge>{" "}
                        </td>
                        <td>
                          {" "}
                          <Badge>{i.serviceStatus}</Badge>{" "}
                        </td>

                        <td>
                          <span className="flexCont">
                            <span>
                              <Link to={`/service-order/${i._id}`}>
                                <i className="fa-solid fa-eye" />
                              </Link>
                            </span>
                          </span>
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

export default HOC(ServiceOrder);

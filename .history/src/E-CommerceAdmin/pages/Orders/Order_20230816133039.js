/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import HOC from "../../layout/HOC";

const Order = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const FinalFromDate = fromDate === null ? null : `${fromDate}T00:00:00.000Z`;
  const FinalToDate = toDate === null ? null : `${toDate}T00:00:00.000Z`;

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/admin/paginateAllOrdersSearch/OrdersSearch?search=${query}&page=${page}&limit=10&fromDate=${FinalFromDate}&toDate=${FinalToDate}`
      );
      setData(response.data.data.docs);
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
  }, [page, query, FinalFromDate, FinalToDate]);

  return (
    <>
      <section>
        <p className="headP">Dashboard / Order</p>

        <div
          className="pb-4  w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Order's (Total : {total})
          </span>
        </div>
        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Search by OrderId"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="searchByDate">
            <div>
              <label>Starting Date : </label>
              <input
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <label>Ending Date : </label>
              <input
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                min={fromDate}
              />
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
                      <th>Total Price</th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th>Delivery Amount </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i.orderId} </td>
                        <td> £{i?.paidAmount} </td>
                        <td>
                          {" "}
                          <Badge>{i.orderStatus}</Badge>{" "}
                        </td>
                        <td>
                          {" "}
                          <Badge>{i.paymentStatus}</Badge>{" "}
                        </td>
                        <td>£{i.delivery ? i.delivery : 0} </td>

                        <td>
                          <span className="flexCont">
                            <span>
                              <Link to={`/order/${i._id}`}>
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

          <div className="pagination">
            <button onClick={() => Prev()} className="prevBtn">
              <i className="fa-solid fa-backward"></i>
            </button>

            <button onClick={() => Next()} className="nextBtn">
              {" "}
              <i className="fa-sharp fa-solid fa-forward"></i>
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(Order);

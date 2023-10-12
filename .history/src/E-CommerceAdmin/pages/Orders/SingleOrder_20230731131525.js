/** @format */

import React from "react";
import HOC from "../../layout/HOC";

const SingleOrder = () => {
  return (
    <section>
    <p className="headP">Dashboard / Order</p>

    <div
      className="pb-4 sticky top-0  w-full flex justify-between items-center"
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
      {data?.length === 0 || !data ? (
        <Alert>No Data Found</Alert>
      ) : (
        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Order Id</th>
                <th>full name</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.orderId} </td>
                  <td> {i.userId?.fullName} </td>
                  <td> {i.productId?.name} </td>
                  <td> £{i.productPrice} </td>
                  <td> {i.quantity} </td>
                  <td> £{i.total} </td>
                  <td>
                    {" "}
                    <Badge>{i.orderStatus}</Badge>{" "}
                  </td>
                  <td>
                    {" "}
                    <Badge>{i.paymentStatus}</Badge>{" "}
                  </td>

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
      )}
    </section>
  </section>
  );
};

export default HOC(SingleOrder);

/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const EAdminOrders = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrders = async () => {
    try {
      const response = await axios.get(`${BaseUrl}api/v1/admin/Orders`, Auth);
      setData(response.data.data);
      setTotal(response.data.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  function EditStatus(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select aria-label="Default select example" className="mb-3">
              <option>--Edit Status--</option>
              <option value="1">Shipped</option>
              <option value="2">Pending</option>
              <option value="3">Canceled</option>
            </Form.Select>
            <Button variant="outline-success">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <EditStatus show={modalShow} onHide={() => setModalShow(false)} />
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
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setBigId(i._id);
                                setEdit(true);
                                setModalShow(true);
                              }}
                            ></i>
                            <i
                              className="fa-solid fa-eye"
                              onClick={() => {
                                setId(i._id);
                                setModalShow2(true);
                              }}
                            ></i>
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
    </>
  );
};

export default HOC(EAdminOrders);

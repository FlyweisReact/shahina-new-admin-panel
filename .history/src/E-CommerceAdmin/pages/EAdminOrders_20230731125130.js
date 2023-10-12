/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Form, Modal, Table } from "react-bootstrap";
import HOC from "../layout/HOC";

const EAdminOrders = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);

  const BaseUrl = "https://krish-vapes-backend.vercel.app/"
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }

  const getOrders = async () => {
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data?.data);
      setData(data?.data);
    } catch (err) {
      console.log(err?.message);
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
            All Order's (Total : {data?.length})
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
                      <th>Sr. No</th>
                      <th>Order Id</th>
                      <th>Customer name</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Product Name</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i.orderId} </td>
                        <td> {i.userId?.fullName} </td>
                        <td> {i.categoryId?.name} </td>
                        <td> {i.subcategoryId?.name} </td>
                        <td> {i.productId?.name} </td>
                        <td> {i.productId?.price} </td>

                      
                        <td>
                          {" "}
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setModalShow(true);
                            }}
                          ></i>
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

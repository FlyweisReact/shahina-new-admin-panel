/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const Order = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalshow, setModalShow] = useState(false);
  const [productOrderId, setProductOrderId] = useState("");

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/ProductOrder`,
        Auth
      );
      setData(response?.data?.data?.docs?.reverse());
      setTotal(response?.data?.data?.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
    window.scrollTo(0, 0);
  }, []);

  // Create Shipment

  function MyVerticallyCenteredModal(props) {
    const [first_mile_option, setFile_Mile_Option] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [units, setUnits] = useState("");
    const [customer_reference, setCustomer_Refrence] = useState("");
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [address_line1, setAddress_Line_1] = useState("");
    const [suburb, setSuburb] = useState("");
    const [state_name, setState_Name] = useState("");
    const [postcode, setPostCode] = useState("");
    const [country, setCountry] = useState("");
    const [ instructions , setInstructions ] = useState("");
    const [ name2 , setName2 ] = useState("")
    const [ email , setEmail ] = useState("")
    const [ company , setCompany] = useState("")

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create Shipment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form></Form>
        </Modal.Body>
      </Modal>
    );
  }

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
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input type="search" placeholder="Search by OrderId" />
          </div>
          <div className="searchByDate">
            <div>
              <label>Starting Date : </label>
              <input type="date" />
            </div>

            <div>
              <label>Ending Date : </label>
              <input type="date" />
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
                      <th>Shipping Amount</th>
                      <th>Coupon Amount</th>
                      <th>MemberShip Amount </th>
                      <th>Total Amount </th>
                      <th>Pick up Store </th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th>Delivery Status</th>
                      <th>Shipment</th>
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
                        <td> ${i?.shipping} </td>
                        <td> ${i?.coupan} </td>
                        <td> ${i.memberShip} </td>
                        <td> ${i.total} </td>
                        <td> {i.pickupFromStore === true ? "Yes" : "No"} </td>
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
                          <Badge>{i.deliveryStatus}</Badge>{" "}
                        </td>
                        <td>
                          <Button>Create</Button>
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
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Order);

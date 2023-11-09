/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Badge, Modal, Button, Form } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { Baseurl } from "../../../Baseurl";
import { toast } from "react-toastify";

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

  // Create / Edit Modal
  function MyVerticallyCenteredModal(props) {
    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState("");
    const [price, setPrice] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [activationDate, setActivationDate] = useState("");
    const [per, setPer] = useState("");
    const [completeVisit, setCompleteVisit] = useState("");
    const [image, setImage] = useState("");

    const fd = new FormData();
    fd.append("user", user);
    fd.append("title", title);
    fd.append("email", email);
    fd.append("description", description);
    fd.append("discount", discount);
    fd.append("price", price);
    fd.append("expirationDate", expirationDate);
    fd.append("activationDate", activationDate);
    fd.append("per", per);
    fd.append("completeVisit", completeVisit);
    fd.append("image", image);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/admin/addCoupan`,
          fd,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>User</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUser(e.target.value)}
              />
            </Form.Group>



            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>{" "}
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            
            <Form.Group className="mb-3">
              <Form.Label>setDiscount</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

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

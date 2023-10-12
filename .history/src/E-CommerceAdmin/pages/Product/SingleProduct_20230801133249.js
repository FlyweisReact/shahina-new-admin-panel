/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";

  const getOrder = async () => {
    try {
      const response = await axios.get(`${BaseUrl}api/v1/Product/${id}`);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getImageLink = (item) => {
    if (item?.productId?.colorActive === true) {
      return item?.productColorId?.img;
    } else {
      return item?.productId?.img;
    }
  };
  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  // Size Modal
  function SizeModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Size and Quantity
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"></Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <SizeModal show={modalShow} onHide={() => setModalShow(false)} />
      <section>
        <p className="headP">Dashboard / {data?.name}</p>
        <section className="sectionCont">
          <Form>
            <div className="img-cont">
              {data?.colors
                ? data?.colors?.map((i) => (
                    <img
                      src={i.img}
                      alt=""
                      className="centerImage"
                      key={i._id}
                    />
                  ))
                : ""}
            </div>
            <img src={getImageLink(data)} alt="" className="centerImage" />
            {ValueChecker(data?.name, "Product Name")}
            {ValueChecker(data?.description, "Description")}
            {ValueChecker(data?.price, "Price")}
            {ValueChecker(data?.quantity, "Quantity")}
            {ValueChecker(data?.discountPrice, "Discount Price")}
            {ValueChecker(data?.tax, "Tax")}
            {ValueChecker(data?.ratings, "Ratings")}

            {data?.colors
              ? data?.colors?.map((i) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Form.Group className="mb-3" style={{ width: "90%" }}>
                      <Form.Label>Colors </Form.Label>

                      <Form.Control
                        placeholder={i.color}
                        disabled
                        className="mt-2"
                        key={i._id}
                      />
                      <div
                        style={{
                          backgroundColor: "#e9ecef",
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        <ul style={{ listStyle: "disc" }}>
                          {i.colorSize?.map((item) => (
                            <li key={item._id}>
                              {" "}
                              {item.size}{" "}
                              {item.quantity
                                ? ` , Quantity  : ${item.quantity}`
                                : ""}{" "}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Form.Group>

                    <i
                      className="fa-solid fa-plus"
                      onClick={() => setModalShow(true)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </div>
                ))
              : ""}

            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleProduct);

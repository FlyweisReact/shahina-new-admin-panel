/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { useNavigate, useParams } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";

const Cart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/getCart/${id}`);
      setData(data.cart);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/admin/deleteUser/${id}`,
        Auth
      );
      toast.success("User Deleted");
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  // Regestration Modal
  function MyVerticallyCenteredModal(props) {
    const [products, setProducts] = useState([]);
    const [ productId , setProductId] = useState("")
    const [ quantity , setQuantity ] = useState("")

    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${Baseurl}api/v1/Product/all/paginateProductSearch`
        );
        const data = res.data.data?.docs;
        setProducts(data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        getProducts();
      }
    }, [props]);

    const payload = {
        quantity , 
        userId : id
    };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/admin/addtoCart/product/${productId}`,
          payload,
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
              <Form.Label>Products</Form.Label>
              <Form.Select onChange={(e) => setProductId} >
                <option>Select Your Prefrence</option>
                {products?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" min={0} />
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section className="sectionCont">
        <p className="headP">Dashboard / User Cart</p>

        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            User Cart
          </span>
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
            onClick={() => setModalShow(true)}
          >
            Add Product
          </button>
        </div>

        <div className="overFlowCont">
          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Mobile Number</th>
                  <th>Email Address</th>
                  <th>Gender</th>
                  <th>Cart</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.firstName} </td>
                    <td> {i.lastName} </td>
                    <td>{i.phone}</td>
                    <td>{i.email}</td>
                    <td>{i.gender}</td>
                    <td>
                      <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                        View
                      </button>
                    </td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-eye"
                          onClick={() => navigate(`/user-data/${i._id}`)}
                        ></i>
                        <i
                          className="fa-sharp fa-solid fa-trash"
                          onClick={() => deleteHandler(i._id)}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </section>
    </>
  );
};

export default HOC(Cart);

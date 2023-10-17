/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Badge, Alert, Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";

const Acne = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/AcneQuiz`);
      setData(data.data);
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
        `${Baseurl}api/v1/Product/deleteProduct/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option1image, setOption1Image] = useState("");
    const [option2, setOption2] = useState("");
    const [option2image, setOption2Image] = useState("");
    const [option3, setOption3] = useState("");
    const [option3image, setOption3Image] = useState("");
    const [option4, setOption4] = useState("");
    const [option4image, setOption4Image] = useState("");

    const fd = new FormData();
    fd.append("option1image", option1image);
    fd.append("option2image", option2image);
    fd.append("option3image", option3image);
    fd.append("option4image", option4image);
    fd.append("question", question);
    fd.append("option1", option1);
    fd.append("option2", option2);
    fd.append("option3", option3);
    fd.append("option4", option4);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/AcneQuiz/addAcneQuiz`,
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

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `${Baseurl}api/v1/static/privacy/${id}`,
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
            {" "}
            {edit ? "Edit" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Option 1</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Acne Quiz
          </span>
          <div className="d-flex gap-1">
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
              onClick={() => setModalShow(true)}
            >
              Create New
            </button>
          </div>
        </div>

        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="overFlowCont">
              {data?.docs?.length === 0 || !data ? (
                <Alert>No Product Found</Alert>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Sno.</th>
                      <th>Question</th>
                      <th>Option1</th>
                      <th>Option1 Image</th>
                      <th>Option2</th>
                      <th>Option2 Image</th>
                      <th>Option3</th>
                      <th>Option3 Image</th>
                      <th>Option4</th>
                      <th>Option4 Image</th>
                      <th>Created At </th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i.question} </td>
                        <td> {i.option1} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option1image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.option2} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option2image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.option3} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option3image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.option4} </td>
                        <td>
                          {" "}
                          <img
                            src={i.option4image}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />{" "}
                        </td>
                        <td> {i.createdAt?.slice(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <Link to={`/edit-product/${i._id}`}>
                              <i className="fa-solid fa-pen-to-square" />
                            </Link>

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
          </>
        )}
      </section>
    </>
  );
};

export default HOC(Acne);

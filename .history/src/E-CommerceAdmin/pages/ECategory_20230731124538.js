/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ECategory = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  
  const token = localStorage.getItem("AdminToken");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://krish-vapes-backend.vercel.app/api/v1/Category/allCategory"
      );
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
        `https://krish-vapes-backend.vercel.app/api/v1/Category/deleteCategory/${id}`,
        Auth
      );
      console.log(data);
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("image", image);
      fd.append("name", name);

      try {
        const { data } = await axios.post(
          "https://krish-vapes-backend.vercel.app/api/v1/Category/addCategory",
          fd,
          Auth
        );
        toast.success(`Category Added Successfully`);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      const fd = new FormData();
      fd.append("image", image);
      fd.append("name", name);
      try {
        const { data } = await axios.patch(
          `https://krish-vapes-backend.vercel.app/api/v1/Category/updateCategory/${id}`,
          fd,
          Auth
        );
        toast.success(data.message);
        fetchData();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? "Edit Category" : " Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
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

      <section>
        <p className="headP">Dashboard / Category</p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Category's ( Total : {data?.length} )
          </span>
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider"
          >
            Add Category
          </button>
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Categories Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <img
                            src={i.image}
                            alt=""
                            style={{ maxWidth: "60px" }}
                          />
                        </td>
                        <td>{i.name} </td>
                        <td>
                         <span className="flexCont">
                         <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          />
                           <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setEdit(true);
                                setId(i._id)
                                setModalShow(true);
                              }}
                            ></i>
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

export default HOC(ECategory);

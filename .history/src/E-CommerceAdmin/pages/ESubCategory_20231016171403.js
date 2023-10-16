/** @format */

import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl } from "../../Baseurl";

const ESubCategory = () => {
  const token = localStorage.getItem("AdminToken");
  const [modalShow, setModalShow] = React.useState(false);
  const [subCat, setSubcat] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/subscription`);
      setSubcat(data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getSubCategory();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [category, setCategory] = useState([]);

    const getCategory = async () => {
      try {
        const { data } = await axios.get(
          "https://krish-vapes-backend.vercel.app/api/v1/Category/allCategory"
        );
        setCategory(data?.data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      getCategory();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const url =
        "https://krish-vapes-backend.vercel.app/api/v1/SubCategory/addSubcategory";
      try {
        const { data } = await axios.post(
          url,
          {
            name,
            categoryId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(`Sub Category Added Successfully`);
        getSubCategory();
        props.onHide();
      } catch (err) {
        const msg = err.response.data.message;
        toast.error(msg);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      const url = `https://krish-vapes-backend.vercel.app/api/v1/SubCategory/updateSubcategory/${id}`;
      try {
        const { data } = await axios.put(
          url,
          {
            name,
            categoryId,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success(`Sub Category Edited Successfully`);
        getSubCategory();
        props.onHide();
      } catch (err) {
        const msg = err.response.data.message;
        toast.error(msg);
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
            {edit ? "Edit" : "Add"} Sub-Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>--select parent category--</option>
              {category?.map((ele, i) => (
                <option value={ele?._id} key={i}>
                  {ele?.name}
                </option>
              ))}
            </Form.Select>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const [query, setQuery] = useState("");

  const searchData = !query
    ? subCat
    : subCat?.filter((ele, i) => {
        return ele?.name?.toLowerCase()?.includes(query?.toLowerCase());
      });

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://krish-vapes-backend.vercel.app/api/v1/SubCategory/deleteSubcategory/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Deleted");
      getSubCategory();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <section className="sectionCont">
          <p className="headP">Dashboard / Subscription</p>
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className=" text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Subscription's
            </span>
            <button
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            >
              Create New
            </button>
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Plan</th>
                  <th>Price</th>
                  <th>Month</th>
                  <th>Discount</th>
                  <th>De</th>
                  </tr>
              </thead>
              <tbody>
                {searchData?.map((ele, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele?.plan}</td>
                    <td>{ele?.price}</td>
                    <td>{ele?.month}</td>
                    <td>{ele?.discount}</td>
                    <td>
                      <ul style={{ listStyle: "disc" }}>
                        {ele?.details?.map((i, index) => (
                          <li key={index}> {i} </li>
                        ))}
                      </ul>
                    </td>
                    <td>{ele?.createdAt?.slice(0, 10)}</td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setId(ele._id);
                            setEdit(true);
                            setModalShow(true);
                          }}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(ele._id)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(ESubCategory);

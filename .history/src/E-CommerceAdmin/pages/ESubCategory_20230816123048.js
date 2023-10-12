/** @format */

import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import HOC from "../layout/HOC";
import axios from "axios";
import { toast } from "react-toastify";

const ESubCategory = () => {
  const token = localStorage.getItem("AdminToken");
  const [modalShow, setModalShow] = React.useState(false);
  const [subCat, setSubcat] = useState([]);
  const getSubCategory = async () => {
    const url =
      "https://krish-vapes-backend.vercel.app/api/v1/SubCategory/all/SubCategoryForAdmin";
    try {
      const { data } = await axios.get(url);
      setSubcat(data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getSubCategory();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");

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
      } catch (err) {
        console.log(err?.message);
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
            Add Sub-Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
      getSubCategory()
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
        <p className="headP">Dashboard / Sub-Category</p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className=" text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Sub-Category's
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Sub-Category
          </button>
        </div>

        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search "
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Name</th>
                  <th>Parent Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {searchData?.map((ele, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele?.name}</td>
                    <td>{ele?.categoryId?.name}</td>
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteHandler(ele._id)}
                      />
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

/** @format */

import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";
import Modal from 'react-bootstrap/Modal';

const Reviews = () => {
  const token = localStorage.getItem("AdminToken");
  const [subCat, setSubcat] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/clientReview`);
      setSubcat(data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getSubCategory();
    window.scrollTo(0,0)
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/clientReview/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data?.message);
      getSubCategory();
    } catch (e) {
      console.log(e);
    }
  };


  // Create Review 
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
      </Modal>
    );
  }


  return (
    <>
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className=" text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Review's
            </span>
          </div>

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>User Name</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subCat?.map((ele, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele?.userName}</td>
                    <td>{ele?.title}</td>
                    <td>{ele?.description}</td>
                    <td>{ele?.createdAt?.slice(0, 10)}</td>
                    <td>
                      <span className="flexCont">
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

export default HOC(Reviews);

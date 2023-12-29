/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const MembershipTerms = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/static/getMembershipTerm`
      );
      setData(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [terms, setTerms] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/static/createMembershipTerm`,
          { terms },
          Auth
        );
        toast.success(data.message);
        fetchHandler();
        props.onHide();
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
            Create / Update
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Terms</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setTerms(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#042b26", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const handleDelete = async (ide) => {
    const url = `${process.env.React_App_Baseurl}api/v1/static/terms/${ide}`;
    try {
      const { data } = await axios.delete(url, Auth);
      toast.success(data.message);
      fetchHandler();
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
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              Subscription Terms
            </span>
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Create New
            </button>
          </div>

          {data?.length === 0 || !data ? (
            <Alert> Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Content.</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{data?.terms} </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDelete(data?._id)}
                          />
                        </span>
                      </td>
                    </tr>
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

export default HOC(MembershipTerms);

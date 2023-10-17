/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Banner = () => {
  const [data, setData] = useState([]);
  const [ modalShow ,setModalShow] = useState(false)

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://shahina-backend.vercel.app/api/v1/Banner/getAllBanner"
      );
      setData(data?.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const handleDelete = async (ide) => {
    const url = `https://shahina-backend.vercel.app/api/v1/Gallary/${ide}`;
    try {
      const { data } = await axios.delete(url, Auth);
      toast.success(data.message);
      fetchHandler();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [privacy , setPrivacy] = useState("")

    const payload = { privacy }

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/static/createPrivacy`,
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

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `${Baseurl}api/v1/static/privacy/${id}`,
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
            {" "}
            {edit ? "Edit" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            

            <Form.Group className="mb-3">
              <Form.Label>Privacy Policy</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                required
                onChange={(e) => setPrivacy(e.target.value)}
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
    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(fas)}
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Banners ({data?.length})
            </span>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/create-home-banner">
                <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                  HomePage Banner
                </button>
              </Link>
              <Link to="/create-partner-banner">
                <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                  Partner Banner
                </button>
              </Link>
              <Link to="/create-shop-banner">
                <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                  Shop Banner
                </button>
              </Link>
              <Link to="/create-service-banner">
                <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                  Service Banner
                </button>
              </Link>
              <Link to="/create-promotion-banner">
                <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                  Promotion Banner
                </button>
              </Link>
            </div>
          </div>

          {data?.length === 0 || !data ? (
            <Alert>Banner Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.title} </td>
                        <td>{i.type} </td>
                        <td>{i.createdAt?.slice(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => handleDelete(i._id)}
                            />
                            <Link to={`/banner/${i._id}`}>
                              <i className="fa-solid fa-eye" />
                            </Link>
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

export default HOC(Banner);

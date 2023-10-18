import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";


const Frequently = () => {
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
      const [image, setImage] = useState("");
      const [bannerName, setBannerName] = useState("");
      const [type, setType] = useState("");
      const [title, setTitle] = useState("");
      const [desc, setDesc] = useState("");
  
      const fd = new FormData();
      fd.append("image", image);
      fd.append("bannerName", bannerName);
      fd.append("type", type);
      fd.append("title", title);
      fd.append("desc", desc);
  
      const postHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(
            `${Baseurl}api/v1/Banner/addBanner`,
            fd,
            Auth
          );
          toast.success(data.message);
          props.onHide();
          fetchHandler();
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
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Banner Title</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setBannerName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label> Title</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select onChange={(e) => setType(e.target.value)}>
                  <option>Select Your Prefrence</option>
                  <option value="offer"> Offer </option>
                  <option value="product"> Product </option>
                  <option value="finance"> Finance </option>
                  <option value="Membership"> Membership </option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  onChange={(e) => setDesc(e.target.value)}
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
  
                <button
                  className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
                  onClick={() => setModalShow(true)}
                >
                  Create Banner
                </button>
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

export default Frequently
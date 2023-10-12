/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://krish-vapes-backend.vercel.app/api/v1/ContactDetails/viewContactDetails"
      );
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <p className="headP">Dashboard / Contact Detail</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <div></div>
        <div className="d-flex gap-1">
          <Link to="/create-about-us">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Create About-Us
            </button>
          </Link>
          <Link to={`/edit-about-us/${data._id}`}>
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Edit About-Us
            </button>
          </Link>
          <Button
            variant="danger"
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            style={{ borderRadius: 0 }}
            onClick={() => deleteHandler()}
          >
            Delete
          </Button>
        </div>
      </div>

      <section className="sectionCont">
        {!data || data?.length === 0 ? (
          <Alert>Create About-us First !</Alert>
        ) : (
          ""
        )}
        <Form>
          <div className="img-cont">
            <img src={data?.aboutusImage} alt="" className="centerImage" />
            {data?.aboutusImages?.map((i, index) => (
              <img src={i} key={index} alt="" className="centerImage" />
            ))}
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Facebook</Form.Label>
            <Form.Control value={data?.fb} />
          </Form.Group>

          {data?.desc?.map((item) => (
            <div key={item._id}>
              {item.title ? (
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" value={item.title} />
                </Form.Group>
              ) : (
                ""
              )}

              {item.desc ? (
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <FloatingLabel>
                    <Form.Control
                      as="textarea"
                      style={{ height: "200px" }}
                      value={item.desc}
                    />
                  </FloatingLabel>
                </Form.Group>
              ) : (
                ""
              )}
            </div>
          ))}
        </Form>
      </section>
    </>
  );
};

export default HOC(Contact);

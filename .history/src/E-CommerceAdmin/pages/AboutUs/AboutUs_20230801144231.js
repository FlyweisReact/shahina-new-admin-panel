/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
        `https://krish-vapes-backend.vercel.app/api/v1/AboutUs/all`
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
      <p className="headP">Dashboard / About Us</p>

      <div
        className="pb-4  w-full flex justify-between items-center"
        style={{ width: "98%", marginLeft: "2%" }}
      >
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Product's 
        </span>
        <div className="d-flex gap-1">
          <Link to="/create-product">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider">
              Create About-Us
            </button>
          </Link>
          <Link to="/create-product">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#19376d] text-white tracking-wider">
              Create About-Us
            </button>
          </Link>
        </div>
      </div>

      <section className="sectionCont">
        <Form>
          <div className="img-cont">
            <img src={data?.aboutusImage} alt="" className="centerImage" />
            {data?.aboutusImages?.map((i, index) => (
              <img src={i} key={index} alt="" className="centerImage" />
            ))}
          </div>

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

export default HOC(AboutUs);

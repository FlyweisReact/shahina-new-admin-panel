/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form , FloatingLabel , Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

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
      setTotal(data.data.total);
    } catch (e) {
      console.log(e);
    }
  };

  function Prev() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function Next() {
    setPage(page + 1);
  }

  const getImageLink = (item) => {
    if (item?.colorActive === true) {
      return item?.colors?.[0]?.img;
    } else {
      return item?.img;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, query]);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://krish-vapes-backend.vercel.app/api/v1/Product/deleteProduct/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <>
      <p className="headP">Dashboard / About Us</p>

      <section className="sectionCont">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control as="textarea" style={{ height: "100px" }} />
            </FloatingLabel>
          </Form.Group>

          <div className="w-100 d-flex justify-content-between">
            <Link to="/Orders">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </>
  );
};

export default HOC(AboutUs);

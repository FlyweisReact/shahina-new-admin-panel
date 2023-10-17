/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const SingleBanner = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getOrder = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/Banner/${id}`);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <div className="Desc-Container">
        <p className="title"> {string} </p>
        <p className="desc"> {holder} </p>
      </div>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <p className="headP">Dashboard / Banner Details</p>
        <section className="sectionCont">
          <Form>
            {data?.shopImage?.length > 0 && (
              <div className="Desc-Container mb-3">
                <p className="title"> Shop Images </p>
                <div className="img-cont">
                  {data?.shopImage?.map((i, index) => (
                    <img
                      src={i}
                      alt=""
                      className="centerImage"
                      key={`image ${index}`}
                    />
                  ))}
                </div>
              </div>
            )}
            {data?.serviceImage?.length > 0 && (
              <div className="Desc-Container mb-3">
                <p className="title">Service Image </p>
                <div className="img-cont">
                  {data?.serviceImage?.map((i, index) => (
                    <img
                      src={i}
                      alt=""
                      className="centerImage"
                      key={`image ${index}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="Desc-Container mb-3">
              <p className="title"> Banner Image</p>
              <div className="img-cont">
                <img src={data?.bannerImage} alt="" className="centerImage" />
              </div>
            </div>

            {data?.shopDetails?.map((i, index) => (
              <div className="Desc-Container mb-3">
                <p className="title"> Title : {i.title} </p>
                <p className="desc"> Description : {i.desc} </p>
                <div className="img-cont">
                  <img
                    src={i.image}
                    alt=""
                    className="centerImage"
                    key={`Desc-con ${index}`}
                  />
                </div>
              </div>
            ))}

            {ValueChecker(data?.type, "Type")}
            {ValueChecker(data?.title, "Title")}
            {ValueChecker(data?.desc, "Description")}
            {ValueChecker(data?.bannerName, "Banner Title")}
            {ValueChecker(data?.off, "Off")}
            {ValueChecker(data?.off, "Off")}
            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

            <Link to="/banner">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleBanner);

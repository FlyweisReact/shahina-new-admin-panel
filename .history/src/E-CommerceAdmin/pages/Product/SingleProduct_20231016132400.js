/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getOrder = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/Product/${id}`);
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);

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
        <p className="headP">Dashboard / {data?.name}</p>
        <section className="sectionCont">
          <Form>
            {data?.productImages && (
              <div className="Desc-Container">
                <p className="title"> Product Images </p>
                <div className="img-cont">
                  {data?.productImages?.map((i) => (
                    <img
                      src={i.image}
                      alt=""
                      className="centerImage"
                      key={i._id}
                    />
                  ))}
                </div>
              </div>
            )}
            {data?.result && (
              <div className="Desc-Container">
                <p className="title">Result </p>
                <div className="img-cont">
                  {data?.result?.map((i, index) => (
                    <img src={i} alt="" className="centerImage" key={index} />
                  ))}
                </div>
              </div>
            )}

            {ValueChecker(data?.name, "Product Name")}
            {ValueChecker(data?.description, "Description")}
            {ValueChecker(data?.price, "Price")}
            {ValueChecker(data?.stock, "In Stock")}
            {ValueChecker(data?.discountPrice, "Discount Price")}
            {ValueChecker(data?.discount, "Discount")}
            {ValueChecker(data?.numOfReviews, "Number of Reviews")}
            {ValueChecker(data?.ingredients, "Ingredeints")}
            {ValueChecker(data?.brandId?.name, "Brand Name")}
            {ValueChecker(data?.nutritionId?.name, "Nutrition Name")}
            {ValueChecker(data?.acneType, "Acne Type")}
            {ValueChecker(data?.considerAcne, "Consider Acne")}
            {ValueChecker(data?.methodToUse, "Method to Use")}
            {ValueChecker(data?.numOfReviews, "Number of Reviews")}
            {ValueChecker(data?.returnPolicy, "Return Policy")}


            {data?.sizePrice && (
              <div className="Desc-Container">
                <p className="title"> Sizes </p>
                {data?.sizePrice?.map((i, index) => (
                  <>
                    
                  <p className="desc" key={index}>
                    {" "}
                    {i}{" "}
                  </p>
                  </>
                ))}
              </div>
            )}


            {data?.benfit && (
              <div className="Desc-Container">
                <p className="title"> Benefits </p>
                {data?.benfit?.map((i, index) => (
                  <p className="desc" key={index}>
                    {" "}
                    {i}{" "}
                  </p>
                ))}
              </div>
            )}

            {data?.contents && (
              <div className="Desc-Container">
                <p className="title"> Contents </p>
                {data?.contents?.map((i, index) => (
                  <p className="desc" key={index}>
                    {" "}
                    {i}{" "}
                  </p>
                ))}
              </div>
            )}
            <div className="Desc-Container">
              <p className="title"> Discount Status </p>
              <p className="desc">
                {data?.discountAllow === true ? "Activated" : "Not Activated"}
              </p>
            </div>
            <div className="Desc-Container">
              <p className="title"> Multiple Size </p>
              <p className="desc">
                {data?.multipleSize === true ? "Activated" : "Not Activated"}
              </p>
            </div>

            {data?.howTouse && (
              <div className="Desc-Container">
                <p className="title"> How to use </p>
                {data?.howTouse?.map((i, index) => (
                  <>
                    <p className="desc" key={index}>
                      {i?.step}{" "}
                    </p>
                    <p className="desc" key={index}>
                      Description : {i?.description}{" "}
                    </p>
                  </>
                ))}
              </div>
            )}
            {data?.keyIngredients && (
              <div className="Desc-Container">
                <p className="title"> Key Ingredeints </p>
                {data?.keyIngredients?.map((i, index) => (
                  <p className="desc" key={index}>
                    {" "}
                    {i}{" "}
                  </p>
                ))}
              </div>
            )}

            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleProduct);

/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import html2pdf from "html2pdf.js";
import logo from "../../../Images/logo.png";

const SingleOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const BaseUrl = "https://krish-vapes-backend.vercel.app/";
  const token = localStorage.getItem("AdminToken");

  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/admin/viewOrder/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.data);
      console.log(response.data.data.Orders);
      setOrders(response.data.data.Orders);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const generatePdf = () => {
    const element = document.getElementById("pdfGen");
    const opt = {
      margin: 1,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <section className="sectionCont">
      <p className="headP">Dashboard / Order</p>
      <button className="downloadBtn" onClick={generatePdf}>
        Download Pdf
      </button>

      <div className="so1" id="pdfGen">
        <div className="Heading-Container">
          <img src={logo} alt="" />
          <div className="content">
            <h2>KRISH BUSINESS SERVICE LTD</h2>
            <p>UNIT 7, NEW MAN ROAD CROYDON CR0 3JX Mob:07472078196</p>
          </div>
        </div>
        <div className="Heading-Container">
          <img src="" alt="" />
          <div className="content">
            <h2>INVOICE</h2>
          </div>
        </div>

        <div className="so2">
          <h3>INVOICE</h3>
          <div className="so3">
            <hr />
            <div className="so4">
              <p>Invoice Number : {data?.orderId}</p>
              <p>
                Customer Name : {data?.userId?.firstName}{" "}
                {data?.userId?.lastName}
              </p>
            </div>
            <hr />
            <div className="so4">
              <p>Invoice Date : {data?.createdAt}</p>
              <p> Customer Address : {data?.address}</p>
            </div>
            <hr />
            <div className="so4">
              <p>Total Item : {data?.totalItem}</p>
              <p>India 110015</p>
            </div>
            <hr />
          </div>
        </div>
        <div className="so5">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th style={{ width: "40%" }}>Description</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Tax</th>
                <th>total Tax</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((ele, i) => (
                <>
                  <tr>
                    <td>{ele?.productId?.name}</td>
                    <td>{ele?.productId?.description}</td>
                    <td>{ele?.productColorId?.color}</td>
                    <td>{ele?.productSize}</td>
                    <td>{ele?.productPrice}</td>
                    <td>{ele?.quantity}</td>
                    <td>{ele?.tax}</td>
                    <td>{ele?.totalTax}</td>
                    <td>{ele?.paidAmount}</td>
                  </tr>
                  <hr />
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="so6">
          <hr />
          <div className="so7">
            <p>Sub Total</p>
            <p>{data?.total}</p>
          </div>
          <hr />
          <div className="so7">
            <p>Tax</p>
            <p>{data?.tax}</p>
          </div>
          <hr />
          <div className="so7">
            <p>Total</p>
            <p>{data?.paidAmount}</p>
          </div>
          <hr />
        </div>
      </div>
    </section>
  );
};

export default HOC(SingleOrder);

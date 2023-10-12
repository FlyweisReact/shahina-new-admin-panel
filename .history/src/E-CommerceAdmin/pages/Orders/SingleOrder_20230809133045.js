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
      margin: 0,
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

        <div className="two-cont">
          <div className="left">
            <h6>INVOICE TO </h6>
            <div className="box">
              <p className="strong">DAY 1</p>
              <p>
                103 TICKFORD STREET NEWPORT PASGNELL <br /> BUCKINGHAMSHIRE{" "}
                <br />
                MK16 9BA Tel:
                <br />
                VAT NO:277657352
              </p>
            </div>
          </div>

          <div className="right">
            <table>
              <tbody>
                <tr>
                <td>INVOICE NO </td>
                <td>INVOICE NO </td>
                </tr>
                <tr>
                <td>INVOICE NO </td>
                <td>INVOICE NO </td>
                </tr>
                <tr>
                <td>INVOICE NO </td>
                <td>INVOICE NO </td>
                </tr>
                <tr>
                <td>INVOICE NO </td>
                <td>INVOICE NO </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HOC(SingleOrder);

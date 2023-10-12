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
        <div className="upper-div">
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
                    <td className="bordererd">INVOICE NO </td>
                    <td className="text-center">INVOICE NO </td>
                  </tr>
                  <tr>
                    <td className="bordererd">INVOICE DATE </td>
                    <td className="text-center">30/05/2022</td>
                  </tr>
                  <tr>
                    <td className="bordererd">CUSTOMER ACC </td>
                    <td className="text-center">10307</td>
                  </tr>
                  <tr>
                    <td className="bordererd">CASHIER </td>
                    <td className="text-center"> SS </td>
                  </tr>
                  <tr>
                    <td className="bordererd">POS ID </td>
                    <td className="text-center">0 </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="empty"></div>

          <table className="Table">
            <thead>
              <tr>
                <th>#</th>
                <th>DESCRIPTION</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>AMOUNT</th>
                <th>VAT</th>
                <th>V CODE </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Stella Pint 24X568ML</td>
                <td>10</td>
                <td>21.99</td>
                <td>219.90</td>
                <td>43.98</td>
                <td>S</td>
              </tr>
            </tbody>
          </table>

          <div className="Main_Table">
            <p>On Trolley </p>
            <p>1</p>
            <p>Item Type</p>
            <p>4</p>
            <p>Total</p>
            <p>21</p>
          </div>
        </div>

        <div className="below_Div">
          <div className="four-sec">
            <p
              className="stronger"
              style={{ border: "1px solid black", padding: "5px" }}
            >
              HSBC <br />
              KRISH Business Service Ltd
              <br />
              Sort Code:40-46-15
              <br />
              Acc No:81440977
            </p>

            <p> Z=0 % S=20 % R=5 % </p>

            <p className="stronger">
              AMOUNT <br />
              £456.79
              <br />
              DELIVERY CHARGES
              <br />0
            </p>

            <p className="stronger">
              VAT AMOUNT <br />
              £91.36
              <br />
              TOTAL TO PAY
              <br />
              £548.15
            </p>
          </div>
          <div className="four-sec" style={{ border: "none", padding: "5px" }}>
            <p> VAT NO: GB 350971689 </p>
            <p>CO RegNo : 1139394 </p>
            <p> AWRS NO:XVAW00000113046 </p>
          </div>

          <div className="big_Head">THANK YOU FOR YOUR VALUED CUSTOM</div>

        <div className="text-cont">
          
        </div>

        </div>
      </div>
    </section>
  );
};

export default HOC(SingleOrder);

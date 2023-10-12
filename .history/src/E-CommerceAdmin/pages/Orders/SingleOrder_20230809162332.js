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
      console.log(response.data.data);
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
                <p className="strong">Address : </p>
                <p style={{ textTransform: "capitalize" }}>
                  {" "}
                  {data?.address} , {data?.pincode} , {data?.city} ,{" "}
                  {data?.country}{" "}
                </p>
                <p className="strong"> Tel : </p>
                <p className="strong"> VAT Number : </p>
              </div>
            </div>

            <div className="right">
              <table>
                <tbody>
                  <tr>
                    <td className="bordererd">INVOICE NO </td>
                    <td className="text-center"> {data?.orderId} </td>
                  </tr>
                  <tr>
                    <td className="bordererd">INVOICE DATE </td>
                    <td className="text-center">
                      {" "}
                      {data?.updatedAt?.slice(0, 10)}{" "}
                    </td>
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
            {orders?.map((i, index) => (
              <tr>
                <td> {index + 1} </td>
                <td> {i.productId?.name} </td>
                <td> {i.quantity} </td>
                <td> {i.total} </td>
                <td> {i.total * i.} </td>
                <td>43.98</td>
                <td>S</td>
              </tr>
            ))}
           
              
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

          <p className="big_Head">THANK YOU FOR YOUR VALUED CUSTOM</p>

          <div className="text-cont">
            <h5>
              GOODS WITHOUT ENGLISH INGREDIENTS SHOULD BE LABELLED ACCORDINGLY
              BEFORE SALE
            </h5>
            <p>
              The goods once sold will not be returnable unless agreed. Pallet
              must be returned or a charge will be made
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HOC(SingleOrder);

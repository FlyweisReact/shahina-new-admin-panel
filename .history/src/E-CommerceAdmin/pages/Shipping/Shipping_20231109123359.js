/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Table, Modal } from "react-bootstrap";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const Shipping = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState({});

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}api/v1/admin/getAllShipment`,
        Auth
      );
      setData(response.data.data);
      setTotal(response.data.data?.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  function MyVerticallyCenteredModal(props) {

    console.log(edit)

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
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            View Shipment Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {ValueChecker(edit?.weight?.value, "Weight Value")}
        {ValueChecker(edit?.weight?.units, "Weight Unit")}
        {ValueChecker(edit?.metadata?.userId, "Meta Date UserId")}
        {ValueChecker(edit?.sender?.contact?.name, "Sender Name")}
        {ValueChecker(edit?.sender?.contact?.email, "Sender Email")}
        {ValueChecker(edit?.sender?.address?.address_line1, "Address Line 1")}
        {ValueChecker(edit?.sender?.contact?.email, "Sender Email")}
        {ValueChecker(edit?.sender?.contact?.email, "Sender Email")}
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
          <p className="headP">Dashboard / All Shipment</p>

          <div className="pb-4  w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Shipment's (Total : {total})
            </span>
          </div>

          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Tracking </th>
                      <th>Weight</th>
                      <th>Reciever Email</th>
                      <th>Reciever Company</th>
                      <th>Pick up Date</th>
                      <th>Volume</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>
                          <a href={i.tracking_url} target="_blank">
                            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
                              View
                            </button>
                          </a>
                        </td>
                        <td>{i.weight?.value + " " + i.weight?.units}</td>
                        <td>{i.receiver?.contact?.email}</td>
                        <td>{i.receiver?.contact?.company}</td>
                        <td>{i?.scheduling?.pickup_date}</td>
                        <td>{i?.volume?.units + " " + i?.volume?.value}</td>
                        <td>
                          <i
                            className="fa-solid fa-eye"
                            onClick={() => {
                              setEdit(i);
                              setModalShow(true);
                            }}
                          />
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

export default HOC(Shipping);

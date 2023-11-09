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
    console.log(edit);

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
          {ValueChecker(
            edit?.sender?.address?.address_line1,
            "Sender Address Line 1"
          )}
          {ValueChecker(edit?.sender?.address?.suburb, "Sender Suburb")}
          {ValueChecker(edit?.sender?.address?.state_name, "Sender State")}
          {ValueChecker(edit?.sender?.address?.postcode, "Sender Postcode")}
          {ValueChecker(edit?.sender?.address?.country, "Sender Country")}
          {ValueChecker(edit?.sender?.instructions, "Sender Instruction")}

          {ValueChecker(edit?.receiver?.contact?.name, "Reciever Name")}
          {ValueChecker(edit?.receiver?.contact?.email, "Reciever Email")}
          {ValueChecker(
            edit?.receiver?.address?.address_line1,
            "Reciever Address Line 1"
          )}
          {ValueChecker(edit?.receiver?.address?.suburb, "Reciever Suburb")}
          {ValueChecker(edit?.receiver?.address?.state_name, "Reciever State")}
          {ValueChecker(edit?.receiver?.address?.postcode, "Reciever Postcode")}
          {ValueChecker(edit?.receiver?.address?.country, "Reciever Country")}
          {ValueChecker(edit?.receiver?.instructions, "Reciever Instruction")}

          {ValueChecker(edit?.scheduling?.pickup_date, "Pickup Date")}
          {ValueChecker(edit?.scheduling?.picked_up_on, "Picked up on")}
          {ValueChecker(edit?.scheduling?.delivered_on, "Delivered on")}
          {ValueChecker(
            edit?.scheduling?.estimated_delivery_date_minimum,
            "Estimated delivery date minimum"
          )}
          {ValueChecker(
            edit?.scheduling?.estimated_delivery_date_maximum,
            "Estimated delivery date maximum"
          )}
          {ValueChecker(edit?.scheduling?.status, "Scheduling status")}
          {ValueChecker(
            edit?.scheduling?.is_cancellable,
            "Schedulling is Cancelled"
          )}

          {ValueChecker(edit?.volume?.value, "Volume Value")}
          {ValueChecker(edit?.volume?.units, "Volume Unit")}

          {ValueChecker(
            edit?.route?.delivery_guarantee_status,
            "Route Delivery Gaurantee Status"
          )}
          {ValueChecker(edit?.route?.type, "Route type")}
          {ValueChecker(edit?.route?.description, "Route description")}

          {ValueChecker(edit?.price?.gross?.amount, "Price Gross Amount")}
          {ValueChecker(edit?.price?.gross?.currency, "Price Gross Currency")}

          {ValueChecker(edit?.price?.net?.amount, "Price net Amount")}
          {ValueChecker(edit?.price?.net?.currency, "Price net Currency")}

          {ValueChecker(edit?.price?.tax?.amount, "Price tax Amount")}
          {ValueChecker(edit?.price?.tax?.currency, "Price tax Currency")}

          {ValueChecker(
            edit?.price_breakdown?.base?.amount,
            "Price breakdown base amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.base?.currency,
            "Price breakdown base currency"
          )}
          {ValueChecker(
            edit?.price_breakdown?.base_tax?.amount,
            "Price breakdown base tax amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.base_tax?.currency,
            "Price breakdown base tax  currency"
          )}



          {ValueChecker(
            edit?.price_breakdown?.cover?.amount,
            "Price breakdown cover amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.cover?.currency,
            "Price breakdown cover  currency"
          )}

          {ValueChecker(
            edit?.price_breakdown?.cover_tax?.amount,
            "Price breakdown cover tax amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.cover_tax?.currency,
            "Price breakdown cover tax  currency"
          )}


          
          {ValueChecker(
            edit?.price_breakdown?.cover_tax?.amount,
            "Price breakdown cover tax amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.cover_tax?.currency,
            "Price breakdown cover tax  currency"
          )}

          
          {ValueChecker(
            edit?.price_breakdown?.discount?.amount,
            "Price breakdown discount amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.discount?.currency,
            "Price breakdown discount  currency"
          )}


          
          {ValueChecker(
            edit?.price_breakdown?.discount_tax?.amount,
            "Price breakdown discount tax amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.discount_tax?.currency,
            "Price breakdown discount tax  currency"
          )}


          
          {ValueChecker(
            edit?.price_breakdown?.fuel_surcharge?.amount,
            "Price breakdown fuel surcharge amount"
          )}
          {ValueChecker(
            edit?.price_breakdown?.fuel_surcharge?.currency,
            "Price breakdown fuel_surcharge  currency"
          )}
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

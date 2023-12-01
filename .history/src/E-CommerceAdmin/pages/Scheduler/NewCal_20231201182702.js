/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import axios from "axios";
import { Modal } from "react-bootstrap";
import {
  Internationalization,
  isNullOrUndefined,
  closest,
} from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";

const token = localStorage.getItem("AdminToken");
const Auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const NewCal = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [indiData, setIndiData] = useState(null);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchDetail = async (setResponse, id) => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${id}`
      );
      setResponse(data.data);
    } catch {}
  };

  console.log(data)

  const events = data?.flatMap((order) =>
    order?.orders?.flatMap((item) =>
      item?._doc?.services?.map((service) => ({
        Subject: service.serviceId?.name,
        StartTime: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        EndTime: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        Id: item?._doc?._id,
        serviceId: service?.serviceId?._id,
        Time : item?._doc?.time , 
        FirstName : item?._doc?.user?.firstName , 
        FirstName : item?._doc?.user?.firstName , 
      }))
    )
  );

  //   View Apointement
  function MyVerticallyCenteredModal(props) {
    const [data, setData] = useState(null);

    const fetchHandler = async () => {
      try {
        const { data } = await axios.get(
          `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${selectedEvent?.event?.Id}`
        );
        setData(data.data);
      } catch {}
    };

    useEffect(() => {
      if (props.show) {
        fetchHandler();
      }
    }, [props]);

    const filterdServices =
      data != null &&
      data?.services?.filter(
        (i) => i.serviceId?._id === selectedEvent?.event?.serviceId
      );

    console.log(filterdServices);

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="Schedule_Enquiry_Modal">
          {data != null && (
            <>
              <div className="close_btn">
                <h4>{filterdServices?.[0]?.serviceId?.name}</h4>
                <i className="fa-solid fa-x" onClick={() => props.onHide()}></i>
              </div>
              <p>{filterdServices?.[0]?.serviceId?.description}</p>
              <p>Service Price : ${filterdServices?.[0]?.serviceId?.price} </p>
              <p>Time : {data?.time} </p>
              <p>Membership : ${data?.memberShip} </p>
              <p>Membership Percentage : {data?.memberShipPer}% </p>
              <p>Offer Discount : ${data?.offerDiscount} </p>
              <p>Payment Status : {data?.paymentStatus} </p>
              <p>User First name : {data?.user?.firstName} </p>
              <p>User Last Name : {data?.user?.lastName} </p>
              <p>User Gender : {data?.user?.gender} </p>
              <p>User Email : {data?.user?.email} </p>
              <p>User Phone Number : {data?.user?.phone} </p>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
  }
  const openModal = (event) => {
    setSelectedEvent(event);
    setModalShow(true);
  };
  //   ------------------

  //   Add Service

  // --------------
  let titleObj = useRef(null);

  const intl = new Internationalization();

  const getHeaderTitle = (data) => {
    return data?.Id ? "Appointment Details" : "Add Appointment";
  };

  const getHeaderDetails = (data) => {
    return (
      intl.formatDate(data.StartTime, { type: "date", skeleton: "full" }) +
      " (" +
      intl.formatDate(data.StartTime, { skeleton: "hm" }) +
      " - " +
      intl.formatDate(data.EndTime, { skeleton: "hm" }) +
      ")"
    );
  };

  const onPopupOpen = (args) => {
    if (
      args.target &&
      !args.target.classList.contains("e-appointment") &&
      !isNullOrUndefined(titleObj) &&
      !isNullOrUndefined(titleObj.current)
    ) {
      titleObj.current.focusIn();
    }
  };

  const headerTemplate = (props) => {
    return (
      <div className="quick-info-header">
        <div className="quick-info-header-content" style={{ color: "black" }}>
          <div className="quick-info-title">{getHeaderTitle(props)}</div>
          <div className="duration-text">{getHeaderDetails(props)}</div>
        </div>
      </div>
    );
  };

  const contentTemplate = (props) => {
    console.log(props);
    return props?.Id ? (
      <div className="Schedule_Enquiry_Modal">
        <h4>{props.Subject}</h4>
      </div>
    ) : (
      <div></div>
    );
  };

  const footerTemplate = (props) => {
    return (
      <div className="quick-info-footer">
        {props?.Id ? (
          <div className="cell-footer"></div>
        ) : (
          <div className="event-footer">
            <button>Add</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: "50px", marginTop: "100px" }}>
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={selectedEvent}
      />{" "} */}

      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: events }}
        quickInfoTemplates={{
          header: headerTemplate.bind(this),
          content: contentTemplate.bind(this),
          footer: footerTemplate.bind(this),
        }}
        popupOpen={onPopupOpen.bind(this)}
        // eventClick={openModal}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default NewCal;

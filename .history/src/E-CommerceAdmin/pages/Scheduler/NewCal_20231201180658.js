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

  const fetchDetail = async ( setData,  id) => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/viewserviceOrder/${id}`
      );
      setData(data.data);
    } catch {}
  };

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
  let scheduleObj = useRef(null);
  let eventTypeObj = useRef(null);
  let titleObj = useRef(null);
  let notesObj = useRef(null);

  const intl = new Internationalization();

  const getResourceData = (data) => {
    console.log("Inside Resupurce", data);
    fetchHandler(setIndiData)
    return resourceData;
  };

  const getHeaderStyles = (data) => {
    if (data.elementType === "cell") {
      return { alignItems: "center", color: "#919191" };
    } else {
      const resourceData = getResourceData(data);
      return { background: resourceData.Color, color: "#FFFFFF" };
    }
  };
  const getHeaderTitle = (data) => {
    return data.elementType === "cell"
      ? "Add Appointment"
      : "Appointment Details";
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
  const getEventType = (data) => {
    return getResourceData(data).Name;
  };

  const buttonClickActions = (e) => {
    const quickPopup = closest(e.target, ".e-quick-popup-wrapper");
    const getSlotData = () => {
      const addObj = {};
      addObj.Id = scheduleObj.current.getEventMaxID();
      addObj.Subject = isNullOrUndefined(titleObj.current.value)
        ? "Add title"
        : titleObj.current.value;
      addObj.StartTime = new Date(
        scheduleObj.current.activeCellsData.startTime
      );
      addObj.EndTime = new Date(scheduleObj.current.activeCellsData.endTime);
      addObj.IsAllDay = scheduleObj.current.activeCellsData.isAllDay;
      addObj.Description = isNullOrUndefined(notesObj.current.value)
        ? "Add notes"
        : notesObj.current.value;
      addObj.RoomId = eventTypeObj.current.value;
      return addObj;
    };
    if (e.target.id === "add") {
      const addObj = getSlotData();
      scheduleObj.current.addEvent(addObj);
    } else if (e.target.id === "delete") {
      const eventDetails = scheduleObj.current.activeEventData.event;
      let currentAction = "Delete";
      if (eventDetails.RecurrenceRule) {
        currentAction = "DeleteOccurrence";
      }
      scheduleObj.current.deleteEvent(eventDetails, currentAction);
    } else {
      const isCellPopup =
        quickPopup.firstElementChild.classList.contains("e-cell-popup");
      const eventDetails = isCellPopup
        ? getSlotData()
        : scheduleObj.current.activeEventData.event;
      let currentAction = isCellPopup ? "Add" : "Save";
      if (eventDetails.RecurrenceRule) {
        currentAction = "EditOccurrence";
      }
      scheduleObj.current.openEditor(eventDetails, currentAction, true);
    }
    scheduleObj.current.closeQuickInfoPopup();
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
        <div
          className="quick-info-header-content"
          style={getHeaderStyles(props)}
        >
          <div className="quick-info-title"> Title {getHeaderTitle(props)}</div>
          <div className="duration-text">{getHeaderDetails(props)}</div>
        </div>
      </div>
    );
  };

  const contentTemplate = (props) => {
    return (
      <div className="quick-info-content">
        {props.elementType === "cell" ? (
          <div className="e-cell-content">
            <div className="content-area">
              <TextBoxComponent id="title" ref={titleObj} placeholder="Title" />
            </div>
            <div className="content-area">
              <DropDownListComponent
                id="eventType"
                ref={eventTypeObj}
                dataSource={events}
                fields={{ text: "Name", value: "Id" }}
                placeholder="Choose Type"
                index={0}
                popupHeight="200px"
              />
            </div>
            <div className="content-area">
              <TextBoxComponent id="notes" ref={notesObj} placeholder="Notes" />
            </div>
          </div>
        ) : (
          <div className="event-content">
            <div className="meeting-type-wrap">
              <label>Subject</label>:<span>{props.Subject}</span>
            </div>
            <div className="meeting-subject-wrap">
              <label>Type</label>:<span>{getEventType(props)}</span>
            </div>
            <div className="notes-wrap">
              <label>Notes</label>:<span>{props.Description}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const footerTemplate = (props) => {
    return (
      <div className="quick-info-footer">
        {props.elementType == "cell" ? (
          <div className="cell-footer">
            <button>New Button Only For adding</button>
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              onClick={buttonClickActions.bind(this)}
            />
            <ButtonComponent
              id="add"
              cssClass="e-flat"
              content="Add"
              isPrimary={true}
              onClick={buttonClickActions.bind(this)}
            />
          </div>
        ) : (
          <div className="event-footer">
            <ButtonComponent
              id="delete"
              cssClass="e-flat"
              content="Delete"
              onClick={buttonClickActions.bind(this)}
            />
            <ButtonComponent
              id="more-details"
              cssClass="e-flat"
              content="More Details"
              isPrimary={true}
              onClick={buttonClickActions.bind(this)}
            />
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

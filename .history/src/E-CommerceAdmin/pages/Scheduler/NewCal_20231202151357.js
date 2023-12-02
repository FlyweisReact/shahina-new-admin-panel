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
import { Internationalization, isNullOrUndefined } from "@syncfusion/ej2-base";
import HOC from "../../layout/HOC";
import SpinnerComp from "../Component/SpinnerComp";
import ContentTemplate from "./Template/ContentTemplate";

const token = localStorage.getItem("AdminToken");
const Auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const NewCal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data);
      setLoading(false);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

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
        Time: item?._doc?.time,
        FirstName: item?._doc?.user?.firstName,
        LastName: item?._doc?.user?.lastName,
        userEmail: item?._doc?.user?.email,
        userPhone: item?._doc?.user?.phone,
      }))
    )
  );

  let scheduleObj = useRef();
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

  const footerTemplate = (props) => {
    console.log(scheduleObj.current.closeQuickInfoPopup());
    const handleCloseButtonClick = () => {
      // Check if there is a close method provided by the library
      if (props?.closeClick) {
        props.closeClick(); // This line triggers the library's close action
      }
    };
    return (
      <div className="quick-info-footer">
        <button onClick={handleCloseButtonClick}>Close</button>
      </div>
    );
  };

  // Blocked Time
  const blockedTimeRanges = [
    {
      date: new Date().toISOString().split("T")[0],
      startTime: "10:00",
      endTime: "12:00",
    },
    // Add more blocked time ranges as needed
  ];


  return loading ? (
    <SpinnerComp />
  ) : (
    <div
      style={{ padding: "50px", marginTop: "100px" }}
      className="Calender_App"
    >
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: events }}
        quickInfoTemplates={{
          header: headerTemplate.bind(this),
          content: (props) => (
            <ContentTemplate {...props} fetchHandler={fetchHandler} />
          ),
          footer: footerTemplate.bind(this),
        }}
        popupOpen={onPopupOpen.bind(this)}
        ref={scheduleObj}
       
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default HOC(NewCal);

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

// Const Blocked date and Time data
const blockData = [
  {
    Id: 1,
    Subject: "Not Available",
    StartTime: "2021-08-02T04:30:00.000Z",
    EndTime: "2021-08-02T06:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
    EmployeeId: 1,
  },
  {
    Id: 2,
    Subject: "Not Available",
    StartTime: "2021-08-02T10:30:00.000Z",
    EndTime: "2021-08-02T14:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
    EmployeeId: 2,
  },
  {
    Id: 3,
    Subject: "Not Available",
    StartTime: "2021-08-02T06:30:00.000Z",
    EndTime: "2021-08-02T08:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
    EmployeeId: 3,
  },
  {
    Id: 4,
    Subject: "Not Available",
    StartTime: "2021-08-05T05:30:00.000Z",
    EndTime: "2021-08-06T04:30:00.000Z",
    IsAllDay: true,
    IsBlock: true,
    EmployeeId: 4,
  },
  {
    Id: 5,
    Subject: "Not Available",
    StartTime: "2021-08-11T05:30:00.000Z",
    EndTime: "2021-08-13T04:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
    EmployeeId: 5,
  },
  {
    Id: 6,
    Subject: "Not Available",
    StartTime: "2021-08-08T18:30:00.000Z",
    EndTime: "2021-08-11T18:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
    EmployeeId: 6,
  },
  {
    Id: 9,
    Subject: "Client Meeting",
    StartTime: "2021-08-04T02:30:00.000Z",
    EndTime: "2021-08-05T05:00:00.000Z",
    IsAllDay: false,
    EmployeeId: 3,
  },
  {
    Id: 10,
    Subject: "Conference",
    StartTime: "2021-08-03T08:00:00.000Z",
    EndTime: "2021-08-03T09:30:00.000Z",
    IsAllDay: false,
    EmployeeId: 4,
  },
  {
    Id: 11,
    Subject: "Employee Recruitment",
    StartTime: "2021-08-02T04:30:00.000Z",
    EndTime: "2021-08-02T07:30:00.000Z",
    IsAllDay: false,
    EmployeeId: 5,
  },
  {
    Id: 12,
    Subject: "Data Analyzing",
    StartTime: "2021-08-02T09:30:00.000Z",
    EndTime: "2021-08-02T11:30:00.000Z",
    IsAllDay: false,
    EmployeeId: 6,
  },
  {
    Id: 13,
    Subject: "Content Writting",
    StartTime: "2021-08-03T08:30:00.000Z",
    EndTime: "2021-08-03T10:30:00.000Z",
    IsAllDay: false,
    EmployeeId: 1,
  },
  {
    Id: 14,
    Subject: "Meeting",
    StartTime: "2021-08-02T03:30:00.000Z",
    EndTime: "2021-08-02T05:30:00.000Z",
    IsAllDay: false,
    EmployeeId: 4,
  },
  {
    Id: 15,
    Subject: "Not Available",
    StartTime: "2021-08-30T05:30:00.000Z",
    EndTime: "2021-09-01T04:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
    EmployeeId: 4,
  },
  {
    Id: 16,
    Subject: "Not Available",
    StartTime: "2021-08-12T18:30:00.000Z",
    EndTime: "2021-08-15T18:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
    EmployeeId: 3,
  },
];

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


  // Final Source of Data
  const combinedDataSource = [...events, ...blockData];


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

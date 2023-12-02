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
import { AppointmentCanvas } from "./Template/AppointmentCanvas";

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
    Subject: "Blocked Time",
    StartTime: "2023-12-03T04:30:00.000Z",
    EndTime: "2023-12-03T06:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
  },
  {
    Id: 1,
    Subject: "Blocked Time",
    StartTime: "2023-12-04T04:30:00.000Z",
    EndTime: "2023-12-04T06:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
  },
  {
    Id: 1,
    Subject: "Blocked Time",
    StartTime: "2023-12-05T00:00:00.000Z",
    EndTime: "2023-12-05T23:59:59.999Z",
    IsAllDay: false,
    IsBlock: true,
  },
  {
    Id: 1,
    Subject: "Blocked Time",
    StartTime: "2023-12-03T04:30:00.000Z",
    EndTime: "2023-12-03T06:30:00.000Z",
    IsAllDay: false,
    IsBlock: true,
  },
];

const NewCal = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [additionalProps, setAdditionalProps] = useState({});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (additionalProps) => setShow(true);

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

  const footerTemplate = () => {
    return <div className="quick-info-footer"></div>;
  };

  // Final Source of Data
  const combinedDataSource = [...events, ...blockData];

  return loading ? (
    <SpinnerComp />
  ) : (
    <div className="Calender_App">
      <ScheduleComponent
        width="100%"
        height="900px"
        currentView="Month"
        eventSettings={{ dataSource: combinedDataSource }}
        quickInfoTemplates={{
          header: headerTemplate.bind(this),
          content: (props) => {
            if (props.Id) {
              return <ContentTemplate {...props} fetchHandler={fetchHandler} />;
            } else {
              handleShow();
            }
          },
          footer: footerTemplate.bind(this),
        }}
        popupOpen={onPopupOpen.bind(this)}
        ref={scheduleObj}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>

      <AppointmentCanvas show={show} handleClose={handleClose} />
    </div>
  );
};

export default HOC(NewCal);

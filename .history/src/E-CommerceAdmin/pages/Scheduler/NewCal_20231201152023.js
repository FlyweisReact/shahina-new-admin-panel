/** @format */

import React, { useEffect, useState } from "react";
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
import { Popup } from "@syncfusion/ej2-popups";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const NewCal = () => {
  const [data, setData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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

  const onPopupOpen = (args) => {
    const selectedEvent = args.data;
    setSelectedEvent(selectedEvent);

    const popupContent = (
      <div>
        <h4>{selectedEvent.title}</h4>
        <p>ID: {selectedEvent.id}</p>
        <p>Service ID: {selectedEvent.serviceId}</p>
        <ButtonComponent onClick={handleEditClick} content="Edit" />
      </div>
    );
    args.element.innerHTML = "";
    const popup = new Popup(popupContent, args.element);
    popup.appendTo(args.element);
  };

  const handleEditClick = () => {
    console.log("Edit clicked for event:", selectedEvent);
    alert("Edit clicked for event: " + selectedEvent.id);
  };

  return (
    <div style={{ padding: "50px", marginTop: "100px" }}>
      {" "}
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: events }}
        popupOpen={onPopupOpen}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default NewCal;

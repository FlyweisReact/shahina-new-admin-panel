/** @format */

import React, { useState, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-lists/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-splitbuttons/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css'; 



const NewCal = () => {
  const [data, setData] = useState(
    
    new DataManager({
      url: "https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData",
      adaptor: new WebApiAdaptor(),
      crossDomain: true,
    })
  );

  useEffect(() => {
    // Additional initialization or data fetching logic can go here if needed
  }, []); // empty dependency array ensures useEffect runs only once on mount

  return (
    <div>
      {" "}
      <ScheduleComponent
        currentView="Month"
        eventSettings={{ dataSource: data }}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    </div>
  );
};

export default NewCal;

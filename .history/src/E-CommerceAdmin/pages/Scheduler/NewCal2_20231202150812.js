/** @format */

import * as React from "react";
import { useEffect, useRef } from "react";
import {
  extend,
  Internationalization,
  isNullOrUndefined,
  closest,
} from "@syncfusion/ej2-base";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import {
  ScheduleComponent,
  ResourcesDirective,
  ResourceDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  MonthAgenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import "./quick-info-template.css";
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
import dataSource from "./datasource.json";

const Overview = () => {


  return (
    <>

    </>
  );
};
export default Overview;


// 

{/* <div className="schedule-control-section" style={{ marginTop: "100px" }}>
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            id="schedule"
            cssClass="quick-info-template"
            ref={scheduleObj}
            height="650px"
            selectedDate={new Date(2021, 0, 9)}
            eventSettings={{ dataSource: scheduleData }}
            quickInfoTemplates={{
              header: headerTemplate.bind(this),
              content: contentTemplate.bind(this),
              footer: footerTemplate.bind(this),
            }}
            popupOpen={onPopupOpen.bind(this)}
          >
            <ResourcesDirective>
              <ResourceDirective
                field="RoomId"
                title="Room Type"
                name="MeetingRoom"
                textField="Name"
                idField="Id"
                colorField="Color"
                dataSource={roomData}
              ></ResourceDirective>
            </ResourcesDirective>
            <Inject
              services={[
                Day,
                Week,
                WorkWeek,
                Month,
                Agenda,
                MonthAgenda,
                Resize,
                DragAndDrop,
              ]}
            />
          </ScheduleComponent>
        </div>
      </div>
    </div> */}
// 



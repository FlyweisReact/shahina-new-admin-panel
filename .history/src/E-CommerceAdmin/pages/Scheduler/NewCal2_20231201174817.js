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
  let scheduleObj = useRef(null);
  let eventTypeObj = useRef(null);
  let titleObj = useRef(null);
  let notesObj = useRef(null);
  const scheduleData = extend(
    [],
    dataSource.quickInfoTemplateData,
    undefined,
    true
  );
  const intl = new Internationalization();
  const roomData = [
    {
      Name: "Jammy",
      Id: 1,
      Capacity: 20,
      Color: "#ea7a57",
      Type: "Conference",
    },
    { Name: "Tweety", Id: 2, Capacity: 7, Color: "#7fa900", Type: "Cabin" },
    { Name: "Nestle", Id: 3, Capacity: 5, Color: "#5978ee", Type: "Cabin" },
    {
      Name: "Phoenix",
      Id: 4,
      Capacity: 15,
      Color: "#fec200",
      Type: "Conference",
    },
    {
      Name: "Mission",
      Id: 5,
      Capacity: 25,
      Color: "#df5286",
      Type: "Conference",
    },
    { Name: "Hangout", Id: 6, Capacity: 10, Color: "#00bdae", Type: "Cabin" },
    {
      Name: "Rick Roll",
      Id: 7,
      Capacity: 20,
      Color: "#865fcf",
      Type: "Conference",
    },
    { Name: "Rainbow", Id: 8, Capacity: 8, Color: "#1aaa55", Type: "Cabin" },
    {
      Name: "Swarm",
      Id: 9,
      Capacity: 30,
      Color: "#df5286",
      Type: "Conference",
    },
    {
      Name: "Photogenic",
      Id: 10,
      Capacity: 25,
      Color: "#710193",
      Type: "Conference",
    },
  ];
  const getResourceData = (data) => {
    const resources = scheduleObj.current.getResourceCollections().slice(-1)[0];
    const resourceData = resources.dataSource.filter(
      (resource) => resource.Id === data.RoomId
    )[0];
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
          <div className="quick-info-title">{getHeaderTitle(props)}</div>
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
                dataSource={roomData}
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
    <div className="schedule-control-section">
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
    </div>
  );
};
export default Overview;

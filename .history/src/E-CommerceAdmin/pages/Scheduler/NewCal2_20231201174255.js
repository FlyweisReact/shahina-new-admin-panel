/** @format */

import * as React from "react";
import { useEffect } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  TimelineViews,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import "./event-template.css";
import { Browser, Internationalization, extend } from "@syncfusion/ej2-base";


const Overview = () => {
  const data = extend([], dataSource.webinarData, null, true);
  let instance = new Internationalization();
  const getTimeString = (value) => {
    return instance.formatDate(value, { skeleton: "hm" });
  };
  const eventTemplate = (props) => {
    return (
      <div
        className="template-wrap"
        style={{ background: props.SecondaryColor }}
      >
        <div className="subject" style={{ background: props.PrimaryColor }}>
          {props.Subject}
        </div>
        <div className="time" style={{ background: props.PrimaryColor }}>
          {" "}
          Time: {getTimeString(props.StartTime)} -{" "}
          {getTimeString(props.EndTime)}
        </div>
        <div className="image">
          <img
            src={"src/schedule/images/" + props.ImageName + ".svg"}
            alt={props.ImageName}
          />
        </div>
        <div className="event-description">{props.Description}</div>
        <div
          className="footer"
          style={{ background: props.PrimaryColor }}
        ></div>
      </div>
    );
  };
  const timelineEventTemplate = (props) => {
    return (
      <div className="template-wrap" style={{ background: props.PrimaryColor }}>
        <div
          className="subject"
          style={{
            background: props.SecondaryColor,
            borderRightWidth: 15,
            borderLeftWidth: 15,
            borderLeftColor: props.PrimaryColor,
            borderRightColor: props.PrimaryColor,
            borderLeftStyle: "solid",
            borderRightStyle: "solid",
          }}
        >
          {props.Subject}
        </div>
      </div>
    );
  };
  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            cssClass="event-template"
            width="100%"
            height="550px"
            selectedDate={new Date(2021, 1, 15)}
            readonly={true}
            startHour="08:00"
            endHour="18:00"
            workHours={{ start: "08:00" }}
            eventSettings={{ dataSource: data }}
          >
            <ViewsDirective>
              <ViewDirective
                option={Browser.isDevice ? "Day" : "Week"}
                eventTemplate={eventTemplate}
              />
              <ViewDirective
                option={Browser.isDevice ? "TimelineDay" : "TimelineWeek"}
                eventTemplate={timelineEventTemplate}
              />
            </ViewsDirective>
            <Inject
              services={[Day, Week, TimelineViews, Resize, DragAndDrop]}
            />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};
export default Overview;

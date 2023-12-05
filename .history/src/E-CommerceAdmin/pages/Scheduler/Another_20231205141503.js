/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Another = () => {
  return <div>Another</div>;
};

export default HOC(Another);

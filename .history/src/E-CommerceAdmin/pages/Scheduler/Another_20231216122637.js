/** @format */

import React, { useMemo } from "react";
import HOC from "../../layout/HOC";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppointmentCanvas } from "./CalenderHelper/AppointmentCanvas";
import { motion } from "framer-motion";
import BlockedCanvas from "./CalenderHelper/BlockedCanvas";
import AppointmentDetails from "./CalenderHelper/AppointmentDetails";
import { BookedCanvas, RescheduleCanvas } from "./CalenderHelper/Modals/modal";
import { Alert } from "antd";

const blockData = [
  {
    id: 1,
    title: (
      <div className="d-flex gap-2 " style={{ alignItems: "center" }}>
        Blocked Time
        <i className="fa-solid fa-lock"></i>
      </div>
    ),
    start: new Date("2023-12-03T00:00:00.000Z"),
    end: new Date("2023-12-03T17:59:59.999Z"),
    isBlock: true,
  },
];

const no_show_data = [
  {
    id: 1,
    title: (
      <div className="d-flex gap-2 " style={{ alignItems: "center" }}>
        No-Show
        <i className="fa-solid fa-ban"></i>
      </div>
    ),
    start: new Date("2023-12-04T00:00:00.000Z"),
    end: new Date("2023-12-04T17:59:59.999Z"),
    isBlock: false,
    isShow: true,
  },
];

const Another = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(true);
  const [show, setShow] = useState(false);
  const [additionalProps, setAdditionalProps] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockShow, setBlockShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isReschedule, setIsReschedule] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [ blockData , setBlockedData ] = useState([])



  // Booked Canvas
  const [isBooked, setIsBooked] = useState(false);
  const [open_booked_canvas, set_Open_Booked_Canvas] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate`,
        Auth
      );
      setData(data.data);
    } catch {}
  };

  console.log(data)

  useEffect(() => {
    fetchHandler();
  }, []);

  const events = data?.flatMap((order) =>
    order?.orders?.flatMap((item) =>
      item?._doc?.services?.map((service) => ({
        title: service.serviceId?.name,
        start: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        end: new Date(
          order.year,
          order.month - 1,
          order.date,
          order.hours,
          order.minutes
        ),
        id: item?._doc?._id,
        serviceId: service?.serviceId?._id,
        Time: item?._doc?.time,
        FirstName: item?._doc?.user?.firstName,
        LastName: item?._doc?.user?.lastName,
        userEmail: item?._doc?.user?.email,
        userPhone: item?._doc?.user?.phone,
        isBlock: false,
      }))
    )
  );

  const handleSelectSlot = (e) => {
    if (isBlocked) {
      blocked_canvas_open(e);
    } else if (isReschedule) {
      setOpenReschedule(true);
    } else if (isBooked) {
      set_Open_Booked_Canvas(true);
    } else {
      handleShow(e);
    }
  };

  const handleSelectEvent = (e) => {
    if (e.isBlock === false) {
      detail_canvas_open(e);
    }
  };

  const { scrollToTime } = useMemo(
    () => ({
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const handleClose = () => setShow(false);
  const handleShow = (additionalProps) => {
    setAdditionalProps(additionalProps);
    setShow(true);
  };

  const combinedDataSource = [...events, ...blockData, ...no_show_data];

  const eventStyleGetter = (event) => {
    if (event?.isBlock) {
      return {
        style: {
          backgroundColor: "#514950",
          cursor: "not-allowed",
        },
      };
    } else if (event?.isShow) {
      return {
        style: {
          backgroundColor: "#b0220c",
          cursor: "pointer",
        },
      };
    }

    return {};
  };

  const handleToggleOpen = () => {
    setIsOpen(true);
  };

  const handleToggleClose = () => {
    setIsOpen(false);
  };

  const blocked_canvas_close = () => setBlockShow(false);
  const blocked_canvas_open = (additionalProps) => {
    setAdditionalProps(additionalProps);
    setBlockShow(true);
  };

  const close_detail_canvas = () => setModalShow(false);
  const detail_canvas_open = (additionalProps) => {
    setAdditionalProps(additionalProps);
    setModalShow(true);
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setSelectedDate(selectedDate);
  };

  // Custom Calender Header
  const CustomCalendarHeader = ({ date }) => {
    const Day = date?.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const month = date?.toLocaleDateString("en-US", {
      month: "long",
    });
    const year = date?.toLocaleDateString("en-US", {
      year: "numeric",
    });
    const d = date?.toLocaleDateString("en-US", {
      day: "numeric",
    });

    const value =
      Day?.slice(0, 3) + " " + d + " " + month?.slice(0, 3) + " , " + year;

    const handlePrevClick = () => {
      const newSelectedDate = new Date(selectedDate);
      newSelectedDate.setDate(selectedDate.getDate() - 1);
      setSelectedDate(newSelectedDate);
    };
    const handleNextClick = () => {
      const newSelectedDate = new Date(selectedDate);
      newSelectedDate.setDate(selectedDate.getDate() + 1);
      setSelectedDate(newSelectedDate);
    };

    return (
      <div className="date_selector">
        <button className="next" onClick={handlePrevClick}>
          Prev
        </button>
        <input
          type="date"
          id="datePicker"
          value={moment(selectedDate).format("YYYY-MM-DD")}
          onChange={handleDateChange}
        />
        <span> {value} </span>
        <button className="prev" onClick={handleNextClick}>
          Next
        </button>
      </div>
    );
  };

  const onClose = () => {};

  const handle_Close_Booked = () => set_Open_Booked_Canvas(false);
  const closeReschdule = () => setOpenReschedule(false);

  const getSlotStyle = (date) => {
    const slotTime = date.getHours() * 60 + date.getMinutes();
    if (slotTime < 600 || slotTime > 1010) {
      return {
        style: {
          backgroundColor: "#e3e3e6",
          color: "#000",
          cursor: "not-allowed",
        },
      };
    }
    return {};
  };

  return (
    <>
      <AppointmentCanvas
        startTime={additionalProps}
        show={show}
        handleClose={handleClose}
      />
      <BlockedCanvas
        startTime={additionalProps}
        show={blockShow}
        handleClose={blocked_canvas_close}
      />
      <AppointmentDetails
        startTime={additionalProps}
        show={modalShow}
        handleClose={close_detail_canvas}
        isReschedule={isReschedule}
        setIsReschedule={setIsReschedule}
        setIsBooked={setIsBooked}
      />
      <RescheduleCanvas
        show={openReschedule}
        handleClose={closeReschdule}
      />

      <BookedCanvas
        show={open_booked_canvas}
        handleClose={handle_Close_Booked}
        setIsBooked={setIsBooked}
        isReschedule={isReschedule}
        setIsReschedule={setIsReschedule}
      />

      <section className="sectionCont" style={{ padding: 0 }}>
        {isBooked && (
          <div className="Alert_container">
            <Alert
              message="Select time to book"
              type="info"
              closable
              onClose={onClose}
            />
          </div>
        )}

        <div className="react_calender_base" style={{ padding: "20px" }}>
          <Calendar
            dayLayoutAlgorithm={"no-overlap"}
            localizer={localizer}
            events={combinedDataSource}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            scrollToTime={scrollToTime}
            style={{ height: 800 }}
            eventPropGetter={eventStyleGetter}
            defaultView="day"
            date={selectedDate}
            components={{
              toolbar: CustomCalendarHeader,
            }}
            slotPropGetter={getSlotStyle}
            step={15}
          />

          <div className="motion_Handler">
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              exit={{
                height: 0,
                opacity: 0,
              }}
            >
              <div className={isOpen ? "open_handler" : "d-none"}>
                <div
                  onClick={() => {
                    setIsBlocked(true);
                    setIsOpen(false);
                  }}
                >
                  <p>New blocked time </p>
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div
                  onClick={() => {
                    setIsBlocked(false);
                    setIsOpen(false);
                  }}
                >
                  <p>New appointment </p>
                  <i className="fa-regular fa-calendar"></i>
                </div>
              </div>
            </motion.div>

            <div className="plus_container">
              <motion.div transition={{ duration: 0.3 }}>
                {isOpen === true ? (
                  <div className="plus_icon close" onClick={handleToggleClose}>
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                ) : (
                  <div className="plus_icon" onClick={handleToggleOpen}>
                    <i className="fa-solid fa-plus"></i>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Another);

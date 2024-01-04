/** @format */

import React, { useMemo } from "react";
import HOC from "../../layout/HOC";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { AppointmentCanvas } from "./CalenderHelper/AppointmentCanvas";
import { motion } from "framer-motion";
import BlockedCanvas from "./CalenderHelper/BlockedCanvas";
import AppointmentDetails from "./CalenderHelper/AppointmentDetails";
import { RescheduleCanvas } from "./CalenderHelper/Modals/modal";
import { Alert } from "antd";
import { getAppointment, getBlockedSlots } from "../../../Respo/Api";
import { useDispatch, useSelector } from "react-redux";
import { dates } from "../../../Store/Slices/dateSlice";
import {
  openModal,
  closeModal,
  selectModalById,
} from "../../../Store/Slices/modalSlices";
import SpinnerComp from "../Component/SpinnerComp";

const Another = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [i]
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isReschedule, setIsReschedule] = useState(false);
  const [blockData, setBlockedData] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const dispatch = useDispatch();
  const items = useSelector(dates);

  useEffect(() => {
    setData(items);
  }, [items]);

  function fetchHandler() {
    dispatch(getAppointment());
  }

  useEffect(() => {
    fetchHandler();
  }, []);

  // All Blocked Time
  const fetchBlockTime = () => {
    getBlockedSlots(setBlockedData);
  };

  useEffect(() => {
    fetchBlockTime();
  }, []);

  const formattedBlockData = blockData
    ?.filter((i) => i.slotBlocked === true)
    .map((i) => {
      const adjustedStartTime = new Date(i.from);
      adjustedStartTime.setHours(adjustedStartTime.getHours() - 5);
      adjustedStartTime.setMinutes(adjustedStartTime.getMinutes() - 30);

      const adjustedEndTime = new Date(i.to);
      adjustedEndTime.setHours(adjustedEndTime.getHours() - 5);
      adjustedEndTime.setMinutes(adjustedEndTime.getMinutes() - 30);

      return {
        id: 1,
        title: (
          <div className="d-flex gap-2 " style={{ alignItems: "center" }}>
            Blocked Time
            <i className="fa-solid fa-lock"></i>
          </div>
        ),
        start: adjustedStartTime,
        end: adjustedEndTime,
        isBlock: true,
      };
    });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const events = data?.flatMap((order) =>
    order?.orders?.flatMap((item) => {
      const firstName = item?.user?.firstName ? item?.user?.firstName : "";
      const lastName = item?.user?.lastName ? item?.user?.lastName : "";
      const fullName = firstName + " " + lastName;
      // To TIme
      const originalDate = new Date(item?.toTime);
      const modifiedDate = new Date(originalDate);
      modifiedDate.setHours(originalDate.getHours() - 5);
      modifiedDate.setMinutes(originalDate.getMinutes() - 30);

      // From Time
      const originalDate2 = new Date(item?.fromTime);
      const modifiedDate2 = new Date(originalDate2);
      modifiedDate2.setHours(originalDate2.getHours() - 5);
      modifiedDate2.setMinutes(originalDate2.getMinutes() - 30);

      // New Changes
      let adjustedStartTime = new Date(item?.toTime);
      adjustedStartTime.setHours(adjustedStartTime.getHours() - 5);
      adjustedStartTime.setMinutes(adjustedStartTime.getMinutes() - 30);

      return {
        title: item?.noShow ? (
          <div className="calender_slot">
            <p className="title">{fullName}</p>
            <div className="d-flex gap-2 " style={{ alignItems: "center" }}>
              No-Show
              <i className="fa-solid fa-ban"></i>
            </div>
          </div>
        ) : (
          <div className="calender_slot">
            <p className="title">{fullName}</p>
            <div className="d-flex gap-2 justify-content-between ">
              <ul style={{ padding: 0 }}>
                {item?.services?.map((names) => {
                  const formattedStartTime =
                    adjustedStartTime?.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });
                  const adjustedEndTime = new Date(
                    adjustedStartTime.getTime() +
                      names?.serviceId?.totalMin * 60000
                  );

                  const formattedEndTime = adjustedEndTime.toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  );

                  adjustedStartTime.setHours(adjustedEndTime.getHours());
                  adjustedStartTime.setMinutes(adjustedEndTime.getMinutes());

                  return (
                    <li className="d-flex gap-2">
                      <span>
                        {" "}
                        ({`${formattedStartTime} - ${formattedEndTime}`})
                      </span>
                      <span> {names?.serviceId?.name}</span>
                    </li>
                  );
                })}

                {item?.AddOnservicesSchema?.map((names) => {
                  const formattedStartTime =
                    adjustedStartTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });

                  const adjustedEndTimeAddon = new Date(
                    adjustedStartTime.getTime() +
                      names?.addOnservicesId?.totalMin * 60000
                  );

                  const formattedEndTimeAddon =
                    adjustedEndTimeAddon?.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });

                  adjustedStartTime.setHours(adjustedEndTimeAddon.getHours());
                  adjustedStartTime.setMinutes(
                    adjustedEndTimeAddon.getMinutes()
                  );
                  return (
                    <li className="d-flex gap-2">
                      <span>
                        {" "}
                        ({`${formattedStartTime} - ${formattedEndTimeAddon}`})
                      </span>
                      <span> {names?.addOnservicesId?.name}</span>
                    </li>
                  );
                })}
              </ul>

              {item?.orderStatus === "confirmed" ? (
                <span className="d-flex gap-2">
                  <i className="fa-solid fa-check"></i>
                  <i className="fa-solid fa-credit-card"></i>
                  <i className="fa-regular fa-thumbs-up"></i>
                </span>
              ) : (
                <span className="d-flex gap-2">
                  <i className="fa-solid fa-clock"></i>
                  <i className="fa-regular fa-comment"></i>
                </span>
              )}
            </div>
          </div>
        ),
        start: modifiedDate,
        end: modifiedDate2,
        id: item?._id,
        isBlock: false,
        isShow: item?.noShow,
        fullName: fullName,
      };
    })
  );

  const handleSelectSlot = (e) => {
    if (isBlocked) {
      handleShow("blockedCanvas", e);
    } else if (isReschedule) {
      handleShow("rescheduleCanvas", e);
    } else if (isBooked) {
      handleShow("appointmentCanvas", e);
    } else {
      handleShow("appointmentCanvas", e);
    }
  };

  const handleSelectEvent = (e) => {
    if (e.isBlock === false) {
      handleShow("appointmentDetails", e);
    }
  };

  const { scrollToTime } = useMemo(
    () => ({
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const combinedDataSource = [...events, ...formattedBlockData];

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
    const handleTodayClick = () => {
      setSelectedDate(new Date());
    };
    return (
      <div className="date_selector">
        <div className="btn_cont">
          <button className="next" onClick={handleTodayClick}>
            Today
          </button>{" "}
          <button className="next" onClick={handlePrevClick}>
            Back
          </button>
          <button className="next" onClick={handleNextClick}>
            Next
          </button>
        </div>
        <div className="inputs">
          <input
            type="date"
            id="datePicker"
            value={moment(selectedDate).format("YYYY-MM-DD")}
            onChange={handleDateChange}
          />
          <span> {value} </span>
        </div>
      </div>
    );
  };

  const onClose = () => {};

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

  const buttonContainer = document.querySelector(
    ".rbc-calendar .rbc-toolbar .rbc-btn-group"
  );

  if (buttonContainer) {
    buttonContainer.style.display = "none";
  }

  // ---- Modal Slices
  function useShow(id) {
    const { showModal } = useSelector(selectModalById(id));
    return showModal;
  }

  const openModalById = (modalId, data) => {
    dispatch(openModal({ modalId, showModal: true, modalData: data }));
  };

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };

  const handleShow = (modalId, data) => {
    const start = data?.start?.toString();
    const end = data?.end?.toString();
    const realData = {
      start,
      end,
      id: data?.id,
      isShow: data?.isShow,
      fullName: data?.fullName,
    };
    openModalById(modalId, realData);
  };

  const handleClose = (modalId) => {
    closeModalById(modalId);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [view, setView] = useState(null);
  useEffect(() => {
    if (isMobile) {
      setView(["day", "week", "agenda"]);
    } else {
      setView(["day", "week", "month", "agenda"]);
    }
  }, [isMobile]);

  return (
    <>
      <AppointmentCanvas
        show={useShow("appointmentCanvas")}
        handleClose={() => handleClose("appointmentCanvas")}
      />
      <BlockedCanvas
        show={useShow("blockedCanvas")}
        handleClose={() => handleClose("blockedCanvas")}
        fetchHandler={fetchBlockTime}
      />
      <AppointmentDetails
        isReschedule={isReschedule}
        setIsReschedule={setIsReschedule}
        setIsBooked={setIsBooked}
        orderId={setOrderId}
        show={useShow("appointmentDetails")}
        handleClose={() => handleClose("appointmentDetails")}
      />
      <RescheduleCanvas
        show={useShow("rescheduleCanvas")}
        handleClose={() => handleClose("rescheduleCanvas")}
        orderId={orderId}
        setIsReschedule={setIsReschedule}
      />

      {blockData?.length > 0 && data?.length > 0 ? (
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
            {CustomCalendarHeader({ date: selectedDate })}
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
              views={view}
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
                    <div
                      className="plus_icon close"
                      onClick={handleToggleClose}
                    >
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
      ) : (
        <SpinnerComp />
      )}
    </>
  );
};

export default HOC(Another);

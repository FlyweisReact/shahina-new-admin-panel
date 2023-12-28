/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Offcanvas, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  addService,
  blockUser,
  cancelAppointment,
  createClient,
  deleteService,
  deleteUser,
  editUser,
  fetchServices,
  getRecentService,
  noShow,
  rescheduleOrder,
  uploadUser,
} from "../../../../../Respo/Api";
import {
  closeModal,
  openModal,
  selectModalById,
} from "../../../../../Store/Slices/modalSlices";

export const EditNotes = ({ show, setShow, setEdit, edit }) => {
  function selector() {
    setEdit(!edit);
    setShow(false);
  }
  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={() => setShow(false)}
      className="text_Modal"
      style={{ top: "80%" }}
    >
      <div className="phone_dialoag">
        <button onClick={() => selector()}>Edit appointment notes</button>
      </div>
      <div className="close_btn" onClick={() => setShow(false)}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

export const ProfileDetail = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const { modalData } = useSelector(selectModalById("profileDetail"));
  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };

  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  const id = modalData?.id;

  const deleteHandler = async () => {
    await dispatch(deleteUser(id, handleClose()));
    closeThisOne("appointmentDetails");
  };

  function openProfile() {
    handleShow("userDetailCanvas", []);
    handleClose();
  }

  const openModalById = (modalId, data) => {
    dispatch(openModal({ modalId, showModal: true, modalData: data }));
  };
  const handleShow = (modalId, data) => {
    openModalById(modalId, data);
  };

  return (
    <Modal
      title="Copy to Clipboard"
      show={show}
      onHide={handleClose}
      className="text_Modal"
      style={{ top: "70%" }}
    >
      <div className="phone_dialoag">
        <button onClick={() => openProfile()}>View Profile</button>
        <button>Edit Profile</button>
        <button onClick={() => deleteHandler()}>Remove Client</button>
      </div>
      <div className="close_btn" onClick={handleClose}>
        <p>Close</p>
      </div>
    </Modal>
  );
};

export const RescheduleCanvas = ({
  show,
  handleClose,
  setIsReschedule,
  orderId,
}) => {
  const dispatch = useDispatch();
  const { modalData } = useSelector(selectModalById("rescheduleCanvas"));

  const [mailSend, setMailSend] = useState("");

  const start = new Date(modalData?.start);
  const year = start?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const monthFormated = parseInt(start?.getMonth()) + 1;
  const dayFormated = start?.getDate();
  const monthStr = monthFormated < 10 ? `0${monthFormated}` : monthFormated;
  const dayStr = dayFormated < 10 ? `0${dayFormated}` : dayFormated;
  const formatedDate = `${year}-${monthStr}-${dayStr}`;
  const startingTime = start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const putHandler = async () => {
    const payload = {
      time: startingTime?.slice(0, 5),
      mailSend,
    };
    await dispatch(
      rescheduleOrder(orderId, formatedDate, payload, handleClose())
    );
    setIsReschedule(false);
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          Update appointment
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="select_container">
          <div className="notify_check_box">
            <input
              type="checkbox"
              checked={mailSend === "yes"}
              onChange={(e) => setMailSend(e.target.checked ? "yes" : "")}
            />
            <div>
              <p>Notify about reschedule</p>
              <span>
                Send a message informing LeRon their their appointment was
                reschedule
              </span>
            </div>
          </div>
          <div className="last_button">
            <div className="btn_container">
              <button className="save w-100" onClick={putHandler}>
                Update
              </button>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const SelectDate = ({ show, handleClose }) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "700" }}>
          Appointment details
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="booked_appointment_modal">
          <form>
            <div>
              <p>Date</p>
              <input type="date" />
            </div>

            <div>
              <p>Frequency</p>
              <select>
                <option></option>
                <option>Doesn't repeat</option>
                <option>repeat </option>
              </select>
            </div>
            <button>Apply Changes</button>
          </form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const BookedCanvas = ({
  show,
  handleClose,
  setIsBooked,
  isReschedule,
  setIsReschedule,
}) => {
  const [type, setType] = useState("Info");
  const [userOpen, setUserOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [user_profile, set_user_profile] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [notesVisible, setNotesVisible] = useState(false);

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  function closeService() {
    setOpenService(false);
  }

  function hideDate() {
    setDateVisible(false);
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  const all = [
    {
      name: "Info",
    },
    {
      name: "Notes",
    },
    {
      name: "Payments",
    },
  ];

  // ----
  let slider;
  if (type === "Info") {
    const SlidingComponent = () => {
      return (
        <>
          <div className="user_select_container">
            <div
              className="user_select"
              style={{ justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                {" "}
                <div className="img">L</div>
                <div className="content">
                  <p className="heading">LeRon Rich Sr.</p>
                  <p className="faded">+1 214-280-4084 </p>
                  <p className="faded">mrrichierich2521@yahoo.com </p>
                  <span className="tags">New Client</span>
                </div>
              </div>

              <i
                className="fa-solid fa-ellipsis-vertical"
                style={{ width: "40px", textAlign: "center" }}
                onClick={() => set_user_profile(true)}
              ></i>
            </div>
          </div>

          <div className="date_container">
            <p>Saturday , 30 Dec 2023</p>
            <button onClick={() => setDateVisible(true)}>Edit</button>
          </div>

          <div className="booked_service">
            <div
              className="service_selector"
              style={{ borderLeft: "4px solid #70AFFA" }}
            >
              <div>
                <p className="title"> jeTOP Hair Loss Treatment </p>
                <p className="faded"> 11:30am - 11:45am (15min) </p>
                <p className="faded"> Shahina Hoja </p>
                <p className="faded"> $199 </p>
              </div>
            </div>
          </div>

          <div className="add_another">
            <p>Add another service</p>
            <i
              className="fa-solid fa-plus"
              onClick={() => setOpenService(true)}
            ></i>
          </div>
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    const SlidingComponent = () => {
      return (
        <>
          <div className="info_tab">
            <p className="title">Appointment notes</p>
            <textarea />
            <p className="note">visible only to your team members</p>
          </div>
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Payments") {
    const SlidingComponent = () => {
      return (
        <div className="payment_class">
          <div className="toggle_button_cont">
            <Form.Check
              type="switch"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <p>Confirm appointment with card</p>
          </div>
          {isChecked && (
            <p className="faded">
              Once appointment is saved client will recieve a notification
              requiring them to confirm appointment with card and accept your
              poilcy of <strong style={{ color: "#000" }}>100% free</strong> for
              not showing up and{" "}
              <strong style={{ color: "#000" }}> 50% free</strong> for late
              cancellation under{" "}
              <strong style={{ color: "#000" }}>48 hours </strong> notice{" "}
            </p>
          )}
        </div>
      );
    };
    slider = <SlidingComponent />;
  }

  const serviceHandler = (i) => {
    console.log(i);
  };

  const selector = () => {
    setIsReschedule(!isReschedule);
    setNotesVisible(false);
    handleClose();
  };

  useEffect(() => {
    if (show) {
      setType("Info");
    }
  }, [show]);
  return (
    <>
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
      />
      <SelectDate show={dateVisible} handleClose={hideDate} />
      <DetailDialog
        show={notesVisible}
        setShow={setNotesVisible}
        selector={selector}
      />
      <EditNotes
        show={open_notes_modal}
        setShow={set_open_notes_modal}
        setEdit={setEdit}
        edit={edit}
      />
      <ProfileDetail
        show={user_profile}
        setShow={set_user_profile}
        view_profile={setUserOpen}
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontWeight: "900" }}>
            New appointment
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: "0" }}>
          <div className="Appointment_Canvas Booked_Detail">
            <div className="select_container">
              <div>
                <div className="selector">
                  <Slider {...settings}>
                    {all?.map((i, index) => (
                      <div>
                        <p
                          onClick={() => setType(i.name)}
                          className={i.name === type ? "active" : ""}
                          key={`Index${index}`}
                        >
                          {" "}
                          {i.name}{" "}
                        </p>
                      </div>
                    ))}
                  </Slider>
                </div>
                {slider}
              </div>

              <div className="last_button">
                <div className="text">
                  <p>Total</p>
                  <p> $199 (15 min) </p>
                </div>

                <div className="btn_container">
                  <button className="checkout">Checkout</button>
                  <button
                    className="save"
                    onClick={() => {
                      setIsBooked(false);
                      handleClose();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export const ServiceCanvas = ({
  show,
  handleClose,
  serviceHandler,
  userDetail,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 786);
  const [searchTerm, setSearchTerm] = useState("");
  const [service, setServices] = useState([]);
  const [recent, setRecent] = useState([]);
  const [page, setPage] = useState(1);

  const fetchRecent = () => {
    getRecentService(userDetail?._id, setRecent);
  };

  useEffect(() => {
    if (userDetail?._id) {
      fetchRecent();
    }
  }, [userDetail]);

  // Fetching Service
  const fetchService = async () => {
    try {
      const res = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/Service/all/paginateServiceSearch?search=${searchTerm}&page=${page}`
      );
      const data = res.data.data?.docs;
      setServices(data);
    } catch {}
  };

  useEffect(() => {
    fetchService();
  }, [searchTerm, page]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 786);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const selectHandler = (i) => {
    serviceHandler(i);
    handleClose();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  function Next() {
    setPage(page + 1);
  }

  function Prev() {
    setPage(page - 1);
  }

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="Appointment_Canvas">
        <div className="heading">
          <p>Select Service</p>
        </div>
        <div className="search_input">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            placeholder="search by service name"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {recent?.length > 0 && (
          <div className="recently_booked">
            <p className="heading">
              Recently booked by{" "}
              {userDetail?.firstName + " " + userDetail?.lastName}{" "}
            </p>
            <Slider {...settings}>
              {recent?.map((i, index) =>
                i?.services?.map((item) => (
                  <div
                    className="service"
                    key={`PastService${index}`}
                    onClick={() => selectHandler(item?.serviceId)}
                  >
                    <p className="title"> {item?.serviceId?.name} </p>
                    <p className="faded">
                      {" "}
                      {item?.serviceId?.createdAt?.slice(0, 10)} (
                      {item?.serviceId?.totalTime})
                    </p>
                    <p className="price">${item?.serviceId?.price} </p>
                  </div>
                ))
              )}
            </Slider>
          </div>
        )}

        <div className="service_selector_container">
          {service?.map((i, index) => (
            <div
              className="service_selector"
              key={`service${index}`}
              onClick={() => selectHandler(i)}
            >
              <div>
                <p className="title"> {i.name} </p>
                <p className="faded"> {i.totalTime} </p>
              </div>
              <p className="price"> ${i.price} </p>
            </div>
          ))}
        </div>

        <div className="last_button">
          {page > 1 && service?.length === 0 ? (
            ""
          ) : (
            <div className="btn_container justify-center">
              <button className="save" type="button" onClick={Next}>
                View More
              </button>
            </div>
          )}

          {page > 1 && service?.length === 0 && (
            <div className="btn_container justify-center">
              <button className="save" type="button" onClick={Prev}>
                View Less
              </button>
            </div>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const DetailDialog = ({
  show,
  handleClose,
  selector,
  type,
  Date,
  id,
  orderId,
}) => {
  const dispatch = useDispatch();

  function useShow(id) {
    const { showModal } = useSelector(selectModalById(id));
    return showModal;
  }

  const openModalById = (modalId) => {
    dispatch(openModal({ modalId, showModal: true }));
  };

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };

  const handleShow = (modalId) => {
    openModalById(modalId);
  };

  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  function NotesSelector() {
    type("Notes");
    handleClose();
  }
  function PaymentSelector() {
    type("Payments");
    handleClose();
  }

  const showHandler = async () => {
    await dispatch(noShow(id, Date, handleClose()));
    await closeThisOne("detailDialog");
    closeThisOne("appointmentDetails");
  };

  return (
    <>
      <CancelCanvas
        show={useShow("cancelCanvas")}
        handleClose={() => closeThisOne("cancelCanvas")}
        id={orderId}
      />

      <Modal
        title="Copy to Clipboard"
        show={show}
        onHide={handleClose}
        className="text_Modal"
        style={{ top: "55%" }}
      >
        <div className="phone_dialoag">
          <button onClick={NotesSelector}>Edit appointment notes</button>
          <button onClick={() => selector()}> Reschedule </button>
          <p onClick={PaymentSelector}> Ask client to confirm </p>
          <p style={{ color: "red" }} onClick={showHandler}>
            {" "}
            No-show{" "}
          </p>
          <p
            style={{ color: "red" }}
            onClick={() => {
              closeThisOne("detailDialog");
              handleShow("cancelCanvas");
            }}
          >
            {" "}
            Cancel{" "}
          </p>
        </div>
        <div className="close_btn" onClick={handleClose}>
          <p>Close</p>
        </div>
      </Modal>
    </>
  );
};

export const UserCanvas = ({ show, handleClose, userHandler }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [modalshow, setModalshow] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/admin/getAllUser`
      );
      setUsers(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtereUser = search
    ? users?.filter(
        (option) =>
          option.firstName.toLowerCase().includes(search.toLowerCase()) ||
          option.lastName.toLowerCase().includes(search.toLowerCase()) ||
          option.phone?.toString().includes(search?.toLowerCase())
      )
    : users;

  // Upload User from excel
  const targteHandler = () => {
    const target = document.getElementById("file");
    target.click();
  };

  const uploader = (file) => {
    const fd = new FormData();
    fd.append("file", file);
    uploadUser(file);
  };

  // New Client Regestration

  function MyVerticallyCenteredModal(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      password,
      dob,
    };

    const postHandler = (e) => {
      e.preventDefault();
      createClient(payload, fetchUsers(), props.onHide());
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select onChange={(e) => setGender(e.target.value)}>
                <option>Select Your Prefrence</option>
                <option value={"Male"}> Male </option>
                <option value={"Female"}> Female </option>
                <option value={"Other"}> Other </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setDob(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalshow}
        onHide={() => setModalshow(false)}
      />
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{ width: "100%", height: "100%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="Appointment_Canvas">
          <div className="heading">
            <p>Select Client</p>
          </div>
          <div className="search_input">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="search Client"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="excel_upload">
            <button onClick={() => targteHandler()}>Upload</button>
            <input
              onChange={(e) => uploader(e.target.files[0])}
              style={{ display: "none" }}
              id="file"
              type="file"
            />
          </div>

          <div className="walk-in">
            <div className="user_select">
              <div className="img" onClick={() => setModalshow(true)}>
                {" "}
                <i class="fa-solid fa-plus"></i>{" "}
              </div>
              <div className="content" onClick={() => setModalshow(true)}>
                <p className="heading">Add New Client </p>
              </div>
            </div>
          </div>

          <div className="user_select_container">
            {filtereUser?.map((i, index) => (
              <div
                className="user_select"
                key={index}
                onClick={() => userHandler(i)}
              >
                <div className="img"> {i.firstName?.slice(0, 1)} </div>
                <div className="content">
                  <p className="heading"> {i.firstName + " " + i.lastName} </p>
                  <p className="faded"> +{i.phone} </p>
                  <p className="faded"> {i.email} </p>
                </div>
              </div>
            ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export const EditService = ({
  show,
  setShow,
  serviceId,
  userId,
  fetchCart,
  date,
  time,
}) => {
  const [service, setService] = useState([]);
  const [id, setId] = useState("");
  const [time1, setTime] = useState("");
  const [discount, setDiscount] = useState("");

  async function fetchHandler() {
    fetchServices(setService);
  }

  useEffect(() => {
    if (show) {
      fetchHandler();
    }
  }, [show]);

  async function deleteHandler() {
    await deleteService(serviceId, userId, fetchCart);
    setShow(false);
  }

  const payload = {
    quantity: 1,
    userId,
    date,
    time: time1,
    discount,
  };

  const addInCart = async (e) => {
    e.preventDefault();
    deleteService(serviceId, userId, fetchCart);
    await addService(id, payload, fetchCart);
    setShow(false);
  };

  const flexContainer = {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    alignItem: "center",
  };

  const halfWidth = {
    width: "50%",
  };

  useEffect(() => {
    if (time) {
      setTime(time);
    }
  }, [time]);

  return (
    <Offcanvas
      show={show}
      onHide={() => setShow(false)}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "900" }}>
          Edit service
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="booked_appointment_modal">
        <form>
          <div>
            <p>Service</p>
            <select onChange={(e) => setId(e.target.value)}>
              <option>Select Service</option>
              {service?.map((i, index) => (
                <option key={`Servic${index}`} value={i._id}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </select>
          </div>

          <div style={flexContainer}>
            <div style={halfWidth}>
              <p>Start time</p>
              <input
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time1}
              />
            </div>
            <div style={halfWidth}>
              <p>Discount</p>
              <select onChange={(e) => setDiscount(e.target.value)}>
                <option>No discount</option>
                <option value={"5"}> 5% </option>
                <option value={"10"}> 10% </option>
                <option value={"15"}> 15% </option>
                <option value={"20"}> 20% </option>
                <option value={"25"}> 25% </option>
                <option value={"30"}> 30% </option>
                <option value={"35"}> 35% </option>
                <option value={"40"}> 40% </option>
                <option value={"45"}> 45% </option>
                <option value={"50"}> 50% </option>
                <option value={"55"}> 55% </option>
                <option value={"60"}> 60% </option>
                <option value={"65"}> 65% </option>
                <option value={"70"}> 70% </option>
                <option value={"75"}> 75% </option>
                <option value={"80"}> 80% </option>
                <option value={"85"}> 85% </option>
                <option value={"90"}> 90% </option>
                <option value={"95"}> 95% </option>
                <option value={"100"}> 100% </option>
              </select>
            </div>
          </div>

          <div className="btn_container">
            <i
              className="fa-regular fa-trash-can cursor-pointer"
              onClick={() => deleteHandler()}
            ></i>
            <button onClick={addInCart}>Apply</button>
          </div>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const CancelCanvas = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const [cancelReason, setCancelReason] = useState("");
  const [mailSend, setMailSend] = useState("");

  const { modalData } = useSelector(selectModalById("appointmentDetails"));

  const closeModalById = (modalId) => {
    dispatch(closeModal({ modalId }));
  };
  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };

  const id = modalData?.id;

  async function cancelThis(e) {
    e.preventDefault();
    const payload = { cancelReason, mailSend };
    await dispatch(cancelAppointment(id, payload, handleClose()));
    await closeThisOne("detailDialog");
    closeThisOne("appointmentDetails");
  }

  const start = new Date(modalData?.start);
  const dayFormated = start?.getDate();
  const dayStr = dayFormated < 10 ? `0${dayFormated}` : dayFormated;
  const startingTime = start?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const month = start?.toLocaleDateString("en-US", {
    month: "long",
  });

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "700" }}>
          Cancel appointment
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="booked_appointment_modal cancel_appointment ">
          <p className="tagLine">
            This appointment was boooked by {modalData?.fullName} at{" "}
            {startingTime} , {dayStr} {month}
          </p>
          <form onSubmit={cancelThis}>
            <div>
              <p>Cancellation reason</p>
              <select onChange={(e) => setCancelReason(e.target.value)}>
                <option></option>
                <option value={"No reason provided"}>No reason provided</option>
              </select>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                checked={mailSend === "yes"}
                onChange={(e) => setMailSend(e.target.checked ? "yes" : "")}
              />
              <div>
                <p>Send {modalData?.fullName} a cancellation notification</p>
                <span>
                  Send a message informing {modalData?.fullName} their
                  appointment has been updated
                </span>
              </div>
            </div>
            <button type="submit">Cancel appointment</button>
          </form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const UserDialog = ({ show, setShow, data }) => {
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();

  function closeProfile() {
    setProfile(false);
  }

  function BlockHandler() {
    const id = data?.user?._id;
    dispatch(blockUser(id, setShow));
  }
  console.log(data);
  return (
    <>
      <EditProfile show={profile} handleClose={closeProfile} data={data} />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="text_Modal"
        style={{ top: "60%" }}
      >
        <div className="phone_dialoag user_dialog">
          <button
            onClick={() => {
              setShow(false);
              setProfile(true);
            }}
          >
            Edit details
            <i className="fa-sharp fa-solid fa-pen"></i>
          </button>
          <button>
            Call mobile number
            <i className=" fa-sharp fa-solid fa-phone"></i>
          </button>
          {data?.user?.userStatus === "Block" ? (
            <button onClick={BlockHandler}>
              Un-Block client
              <i className="fa-sharp fa-solid fa-lock-open"></i>
            </button>
          ) : (
            <button onClick={BlockHandler}>
              Block client
              <i className="fa-sharp fa-solid fa-lock"></i>
            </button>
          )}

          <button style={{ color: "rgb(176, 34, 12)" }}>
            Delete client
            <i className=" fa-sharp fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div className="close_btn" onClick={() => setShow(false)}>
          <p>Close</p>
        </div>
      </Modal>
    </>
  );
};

export const EditProfile = ({ show, handleClose, data }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [bio, setBio] = useState("");
  const [id, setId] = useState("");
  const title = data?.user?.firstName + " " + data?.user?.lastName;

  useEffect(() => {
    if (data) {
      setFirstName(data?.user?.firstName);
      setLastName(data?.user?.lastName);
      setEmail(data?.user?.email);
      setPhone(data?.user?.phone);
      setGender(data?.user?.gender);
      setDob(data?.user?.dob);
      setId(data?.user?._id);
    }
  }, [data]);

  const payload = {
    firstName,
    lastName,
    fullName: title,
    email,
    phone,
    gender,
    dob,
    bio,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    editUser(id, payload);
  };

  const [isChecked, setIsChecked] = useState(true);
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      style={{ width: "100%", height: "100%" }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "700" }}>
          Edit client
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="Appointment_Canvas" style={{ paddingTop: 0 }}>
          <div
            className="user_select_container"
            style={{ backgroundColor: "#F2F1F6", borderRadius: "10px" }}
          >
            <div className="user_select" style={{ border: "none" }}>
              <div className="img"> {title?.slice(0, 1)} </div>
              <div className="content">
                <p className="heading">{title}</p>
                <p className="faded"> {data?.user?.email} </p>
                <p className="faded">+{data?.user?.phone} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="booked_appointment_modal edit-profile-canvas">
          <form onSubmit={submitHandler}>
            <div>
              <p>First name</p>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div>
              <p>Last name</p>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
            <div>
              <p>Mobile number</p>
              <input
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>

            <div>
              <p>Email address</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <p>Gender</p>
              <select onChange={(e) => setGender(e.target.value)}>
                <option></option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
              </select>
            </div>

            <div>
              <p>Date of birth</p>
              <input
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
              />
            </div>
            <div className="h-4 width-full bg-[#F2F1F6]"></div>
            <div>
              <h4 style={{ fontWeight: "bold", margin: 0 }}>
                Important client info
              </h4>
              <span style={{ fontWeight: "bold", margin: 0, fontSize: "12px" }}>
                Important client info will only be visible to you and team
                members
              </span>
              <p className="mt-3">Client info</p>
              <textarea
                rows={5}
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              />
            </div>
            <div className="h-4 width-full bg-[#F2F1F6]"></div>
            <div>
              <h4 style={{ fontWeight: "bold", margin: 0 }}>Notifications</h4>
              <span style={{ fontWeight: "bold", margin: 0, fontSize: "12px" }}>
                Choose how you'd like to keep this client up to date about thier
                appointments and sales , like vouchers and membership
              </span>
              <p className="mt-3">Client notifications</p>

              <div className="check-Box">
                <Form.Check
                  type="switch"
                  checked={isChecked}
                  onChange={handleSwitchChange}
                />
              </div>
            </div>
            <button type="submit"> Save</button>
          </form>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

/** @format */
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import UserDetailCanvas from "./UserDetailCanvas";
import img from "../../../../Images/credit-card.png";
import {
  DetailDialog,
  EditNotes,
  ProfileDetail,
  ServiceCanvas,
} from "./Modals/modal";
import img1 from "../../../../Images/list.png";
import info from "./Constant/constant.json";
import {
  deleteSuggestionOrder,
  editBookedNoted,
  editBookedNoted_new,
  getBookingDetail,
  send_reminder,
} from "../../../../Respo/Api";
import PdfViewer from "./Pdf/PdfViewer";
import {
  closeModal,
  openModal,
  selectModalById,
} from "../../../../Store/Slices/modalSlices";
import { useDispatch, useSelector } from "react-redux";

const AppointmentDetails = ({
  show,
  handleClose,
  setIsReschedule,
  isReschedule,
  setIsBooked,
  orderId,
}) => {
  const [type, setType] = useState("Info");
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [detail, setDetail] = useState({});
  const [notes, setNotes] = useState("");
  const [notesId, setNotesId] = useState("");
  const [attachments, setAttachments] = useState([]);
  const dispatch = useDispatch();

  const { modalData } = useSelector(selectModalById("appointmentDetails"));

  const id = modalData?.id;

  async function notesHandler(e) {
    e.preventDefault();
    const payload = {
      suggestion: notes,
    };
    const id = detail?._id;
    if (notesId) {
      deleteSuggestion(notesId);
    }
    await editBookedNoted(id, payload, getBookingDetail);
    setNotes("");
  }

  function editNotes(e) {
    e.preventDefault();
    const payload = {
      suggestion: notes,
    };
    editBookedNoted_new(id, suggesstionId, fetchBooking, payload);
  }

  const fetchBooking = () => {
    getBookingDetail(id, setDetail);
  };

  function deleteSuggestion(suggesstionId) {
    const id = detail?._id;
    deleteSuggestionOrder(id, suggesstionId, fetchBooking);
  }

  const reminderHandler = () => {
    const id = detail?.user?._id;
    send_reminder(id);
  };

  useEffect(() => {
    if (show === true) {
      fetchBooking();
    }
  }, [show]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  // Servic Date
  const start = new Date(modalData?.start);
  const month = start?.toLocaleDateString("en-US", {
    month: "long",
  });
  const year = start?.toLocaleDateString("en-US", {
    year: "numeric",
  });
  const day = start?.toLocaleDateString("en-US", {
    day: "numeric",
  });
  const date = day + " " + month?.slice(0, 3) + " " + year;

  // Form Pdf
  const sendEmail = async () => {
    const serviceToPdfPathMap = {
      "JetPeel Facial": "JetPeelPreandPost.pdf",
      "PRP Hair Loss Treatment": "LaserhairremovalPrepCare.pdf",
      "PRP Microneedling": "MicroneedlingPre.pdf",
      "Cosmelan MD Peel": "PreandPostCosmelanDepigmentationInstructions.pdf",
      "IPL Acne Treatment": "PreandPostTreatmentInstructionsforIPL.pdf",
      PreparingforDMKEnzymeTherapy: "PreparingforDMKEnzymeTherapy.pdf",
      "JeTOP Hair Loss Treatment": "PRPHAIRLOSSTREATMENTPREPOSTCAREGUIDE.pdf",
      "PRPMicroneedlingPre&PostCare": "PRPMicroneedlingPre&PostCare.pdf",
      RFSkinTighteningPre: "RFSkinTighteningPre.pdf",
      RKMicroneedling: "RKMicroneedling.pdf",
      "TCA Peel": "TCAPeelPre.pdf",
      ThePerfectDermaPeel: "ThePerfectDermaPeel.pdf",
      "Hydrafacial Signature": "HydraFacialPre.pdf",
      FaceandBodyContouringCelluliteReductionTreatmentCare:
        "FaceandBodyContouringCelluliteReductionTreatmentCare.pdf",
      "Laser Skin Resurafacing": "ErbiumYag2940nmLaserSkinResurfacingPRE.pdf",
      "Dermamelan Peel": "DermamelanPeelPre.pdf",
      "Aquagold Microneedling": "AQUAGOLD.pdf",
    };

    if (detail?.services) {
      for (const service of detail?.services) {
        const serviceName = service?.serviceId?.name;
        const pdfFileName = serviceToPdfPathMap[serviceName];
        if (pdfFileName) {
          const pdfUrl = `https://shahina-new-admin-panel.vercel.app/FormPdf/${pdfFileName}`;
          console.log(pdfUrl);
          setAttachments((prevAttachments) => [
            ...prevAttachments,
            {
              filename: serviceName,
              content: pdfUrl,
            },
          ]);
        }
      }
    }
  };

  useEffect(() => {
    if (show && detail?.services) {
      sendEmail();
    }
  }, [show, detail]);

  function isAvailable(statement, code) {
    if (statement) {
      return code;
    }
  }

  let adjustedStartTime = new Date(detail?.toTime);
  adjustedStartTime.setHours(adjustedStartTime.getHours() - 5);
  adjustedStartTime.setMinutes(adjustedStartTime.getMinutes() - 30);

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
                {isAvailable(
                  detail?.user?.firstName,
                  <div className="img">
                    {" "}
                    {detail?.user?.firstName?.slice(0, 1)}{" "}
                  </div>
                )}
                <div className="content">
                  {isAvailable(
                    detail?.user?.firstName || detail?.user?.lastName,
                    <p className="heading">
                      {" "}
                      {detail?.user?.firstName +
                        " " +
                        detail?.user?.lastName}{" "}
                    </p>
                  )}

                  {isAvailable(
                    detail?.user?.phone,
                    <p className="faded"> +{detail?.user?.phone} </p>
                  )}
                  {isAvailable(
                    detail?.user?.email,
                    <p className="faded"> +{detail?.user?.email} </p>
                  )}
                  <span className="tags" style={badgeStyle}>
                    {" "}
                    {badgeName}{" "}
                  </span>
                  {detail?.user?.userStatus === "Block" && (
                    <span
                      className="tags ml-1"
                      style={{ background: "#576063", color: "#fff" }}
                    >
                      Blocked
                    </span>
                  )}
                </div>
              </div>

              <i
                className="fa-solid fa-ellipsis-vertical"
                style={{ width: "40px", textAlign: "center" }}
                onClick={() => handleShow("profileDetail", detail)}
              ></i>
            </div>
          </div>
          <div className="date_container">
            <p> {date} </p>
          </div>
          {detail?.services?.length > 0 && (
            <>
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
              >
                Regular Service
              </p>
              <div className="booked_service d-flex flex-wrap gap-4">
                {detail?.services?.map((i, index) => {
                  const formattedStartTime =
                    adjustedStartTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });
                  const adjustedEndTime = new Date(
                    adjustedStartTime.getTime() + i.serviceId.totalMin * 60000
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
                    <div
                      className="service_selector"
                      style={{ cursor: "auto" }}
                      key={`Service${index}`}
                    >
                      <div>
                        <p className="title">{i.serviceId?.name}</p>
                        <p className="faded">
                          {`${formattedStartTime} - ${formattedEndTime}`} (
                          {i.serviceId?.totalTime}){" "}
                        </p>
                        <p className="faded">Shahina Hoja</p>
                        <p className="faded">{`$${i.serviceId?.price}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {detail?.AddOnservicesSchema?.length > 0 && (
            <>
              <p
                style={{
                  fontSize: "25px",
                  fontWeight: "700",
                  marginTop: "10px",
                }}
              >
                Ad-On Service
              </p>
              <div className="booked_service d-flex flex-wrap gap-4">
                {detail?.AddOnservicesSchema?.map((i, index) => {
                  const formattedStartTime =
                    adjustedStartTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });

                  const adjustedEndTimeAddon = new Date(
                    adjustedStartTime.getTime() +
                      i.addOnservicesId.totalMin * 60000
                  );

                  const formattedEndTimeAddon =
                    adjustedEndTimeAddon.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    });

                  adjustedStartTime.setHours(adjustedEndTimeAddon.getHours());
                  adjustedStartTime.setMinutes(
                    adjustedEndTimeAddon.getMinutes()
                  );

                  return (
                    <div
                      className="service_selector"
                      style={{ cursor: "auto" }}
                      key={`addOnservicesId${index}`}
                    >
                      <div>
                        <p className="title">{i.addOnservicesId?.name}</p>
                        <p className="faded">
                          {`${formattedStartTime} - ${formattedEndTimeAddon}`} (
                          {i.addOnservicesId?.totalTime}){" "}
                        </p>
                        <p className="faded">Shahina Hoja</p>
                        <p className="faded">{`$${i.addOnservicesId?.price}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    slider = (
      <>
        {detail?.suggesstion?.length > 0 && (
          <div className="info_tab">
            {detail?.suggesstion?.map((i, index) => (
              <div className="define_notes p-0" key={`notes${index}`}>
                <p> {i.suggesstion} </p>
                <span className="d-flex gap-2">
                  <i
                    className="fa-regular fa-trash-can text-[#BF3131] cursor-pointer"
                    onClick={() => deleteSuggestion(i._id)}
                  />
                  <i
                    className="fa-solid fa-ellipsis-vertical cursor-pointer"
                    onClick={() => {
                      setNotesId(i._id);
                      set_open_notes_modal(true);
                    }}
                  ></i>
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="define_notes">
          {detail?.suggesstion?.length === 0 && (
            <form onSubmit={notesHandler} className="w-100">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          )}
          {edit && (
            <form onSubmit={notesHandler} className="w-100">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button type="submit">Save</button>
            </form>
          )}{" "}
        </div>
      </>
    );
  } else if (type === "Payments") {
    const SlidingComponent = () => {
      return (
        <div className="awaited_payment">
          <img src={img} alt="" />
          <p className="head">Awaiting confirmation</p>
          <p className="faded">
            LeRon recieved a notification to confirm this appointment with a
            card
          </p>
          <button onClick={reminderHandler}>Send reminder</button>
        </div>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Forms") {
    const SlidingComponent = () => {
      return (
        <div className="awaited_payment mt-3">
          {attachments?.length > 0 ? (
            <PdfViewer data={attachments} />
          ) : (
            <>
              <img src={img1} alt="" />
              <p className="head mt-2">No forms</p>
              <p className="faded mt-0">
                Forms will appear here once appointment has been saved
              </p>
            </>
          )}
        </div>
      );
    };
    slider = <SlidingComponent />;
  }

  const selector = () => {
    orderId(id);
    setIsReschedule(!isReschedule);
    closeThisOne("detailDialog");
    handleClose();
  };

  const serviceHandler = (i) => {
    console.log(i);
  };

  function closeService() {
    setOpenService(false);
  }

  useEffect(() => {
    if (show) {
      setType("Info");
    }
  }, [show]);

  const ContainerStyle = modalData?.isShow
    ? { backgroundColor: "rgb(176, 34, 12)" }
    : {};

  const badgeStyle = modalData?.isShow
    ? { backgroundColor: "rgb(176, 34, 12)", color: "#fff" }
    : {};

  const Title = modalData?.isShow === true ? "No-Show" : "Booked";

  const badgeName = modalData?.isShow ? "No-Show" : "New Client";

  // Modal
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
    const realData = {
      id: data?.user?._id,
    };
    openModalById(modalId, realData);
  };

  const closeThisOne = (modalId) => {
    closeModalById(modalId);
  };
  return (
    <>
      {/* To add service in cart */}
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
      />

      {/* To open options in checkout ellipse */}
      <DetailDialog
        show={useShow("detailDialog")}
        handleClose={() => closeThisOne("detailDialog")}
        selector={selector}
        type={setType}
        Date={detail.date?.slice(0, 10)}
        id={detail?.user?._id}
        orderId={detail?._id}
      />

      <UserDetailCanvas
        setIsBooked={setIsBooked}
        Details={detail}
        show={useShow("userDetailCanvas")}
        handleClose={() => closeThisOne("userDetailCanvas")}
      />
      <EditNotes
        show={open_notes_modal}
        setShow={set_open_notes_modal}
        setEdit={setEdit}
      />
      <ProfileDetail
        data={detail}
        show={useShow("profileDetail")}
        handleClose={() => closeThisOne("profileDetail")}
      />

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "100%" }}
      >
        <Offcanvas.Body style={{ padding: "0" }}>
          <div className="appointment_detail_header" style={ContainerStyle}>
            <div className="upper">
              <i className="fa-solid fa-xmark" onClick={() => handleClose()} />
            </div>
            <p> {Title} </p>
          </div>

          <div className="Appointment_Canvas Booked_Detail">
            <div className="select_container">
              <div>
                <div className="selector">
                  <Slider {...settings}>
                    {info.appointmentInfo.map((i, index) => (
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
                  <p>
                    {" "}
                    ${detail?.total} ({detail?.timeInMin}){" "}
                  </p>
                </div>

                <div className="elipse_container">
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={() => handleShow("detailDialog")}
                  />
                  <button onClick={handleClose}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AppointmentDetails;

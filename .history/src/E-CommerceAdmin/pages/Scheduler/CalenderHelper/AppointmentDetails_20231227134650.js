/** @format */
import { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import Slider from "react-slick";
import UserDetailCanvas from "./UserDetailCanvas";
import img from "../../../../Images/credit-card.png";
import {
  DetailDialog,
  EditNotes,
  EditService,
  ProfileDetail,
  SelectDate,
  ServiceCanvas,
} from "./Modals/modal";
import img1 from "../../../../Images/list.png";
import info from "./Constant/constant.json";
import { editBookedNoted, getBookingDetail } from "../../../../Respo/Api";
import PdfViewer from "./Pdf/PdfViewer";

const AppointmentDetails = ({
  show,
  handleClose,
  setIsReschedule,
  isReschedule,
  setIsBooked,
  startTime,
  orderId,
}) => {
  const [type, setType] = useState("Info");
  const [userOpen, setUserOpen] = useState(false);
  const userClose = () => setUserOpen(false);
  const [edit, setEdit] = useState(false);
  const [open_notes_modal, set_open_notes_modal] = useState(false);
  const [user_profile, set_user_profile] = useState(false);
  const [service_edit_visible, setService_Edit_Visible] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [detail, setDetail] = useState({});
  const [serviceId, setServiceId] = useState("");
  const [notes, setNotes] = useState("");
  const [isNotes, setIsNotes] = useState(false);

  const id = startTime?.id;

  function notesHandler(e) {
    e.preventDefault();
    const payload = {
      suggestion: notes,
    };
    editBookedNoted(id, payload);
  }

  const fetchBooking = () => {
    getBookingDetail(id, setDetail);
  };

  useEffect(() => {
    if (show === true) {
      fetchBooking();
    }
  }, [show]);

  useEffect(() => {
    if (detail) {
      setNotes(detail?.suggesstion);
    }
  }, [detail]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
  };

  // Servic Date
  const start = startTime?.start;
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
  const attachments = [];
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

    if(detail?.service){
      
    }
    for (const service of detail?.services) {
      const serviceName = service?.serviceId?.name;
      const pdfFileName = serviceToPdfPathMap[serviceName];
      if (pdfFileName) {
        const pdfUrl = `https://shahina-new-admin-panel.vercel.app/FormPdf/${pdfFileName}`;
        attachments.push({
          filename: serviceName,
          content: pdfUrl,
        });
      }
    }
  };

  sendEmail();

  function isAvailable(statement, code) {
    if (statement) {
      return code;
    }
  }

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
            <p> {date} </p>
            {/* <button onClick={() => setOpenDate(true)}>Edit</button> */}
          </div>

          <div className="booked_service d-flex flex-wrap gap-4">
            {detail?.services?.map((i, index) => (
              <div
                className="service_selector"
                key={`Service${index}`}
                // onClick={() => edit_service_open(i.serviceId?._id)}
              >
                <div>
                  <p className="title"> {i.serviceId?.name} </p>
                  <p className="faded">({i.serviceId?.totalTime}) </p>
                  <p className="faded"> Shahina Hoja </p>
                  <p className="faded"> ${i.serviceId?.price} </p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="add_another" onClick={() => setOpenService(true)}>
            <p>Add another service</p>
            <i className="fa-solid fa-plus"></i>
          </div> */}
        </>
      );
    };
    slider = <SlidingComponent />;
  } else if (type === "Notes") {
    slider = (
      <div className="define_notes">
        {edit ? (
          <form onSubmit={notesHandler}>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <p> {detail?.suggesstion} </p>
        )}{" "}
        <i
          className="fa-solid fa-ellipsis-vertical cursor-pointer"
          onClick={() => set_open_notes_modal(true)}
        ></i>
      </div>
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
          <button>Send reminder</button>
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
    setIsNotes(false);
    handleClose();
  };

  function closeDate() {
    setOpenDate(false);
  }
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

  const ContainerStyle = startTime?.isShow
    ? { backgroundColor: "rgb(176, 34, 12)" }
    : {};

  const badgeStyle = startTime?.isShow
    ? { backgroundColor: "rgb(176, 34, 12)", color: "#fff" }
    : {};

  const Title = startTime?.isShow === true ? "No-Show" : "Booked";

  const badgeName = startTime?.isShow ? "No-Show" : "New Client";
  return (
    <>
      <ServiceCanvas
        show={openService}
        handleClose={closeService}
        serviceHandler={serviceHandler}
      />
      <DetailDialog
        show={isNotes}
        setShow={setIsNotes}
        selector={selector}
        type={setType}
        Date={detail.date?.slice(0, 10)}
        id={detail?.user?._id}
        orderId={detail?._id}
        additional={startTime}
      />
      <SelectDate show={openDate} handleClose={closeDate} />
      <EditService
        show={service_edit_visible}
        setShow={setService_Edit_Visible}
        serviceId={serviceId}
        userId={detail?.user?._id}
      />
      <UserDetailCanvas
        show={userOpen}
        handleClose={userClose}
        setIsBooked={setIsBooked}
        Details={detail}
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
        Details={detail}
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
                  <p> ${detail?.total} (15 min) </p>
                </div>

                <div className="elipse_container">
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={() => setIsNotes(true)}
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

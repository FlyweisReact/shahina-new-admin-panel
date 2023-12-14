/** @format */

import React from "react";
import HOC from "../../../layout/HOC";
import Slider from "react-slick";

const CalenderNotification = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section className="sectionCont">
      <div className="calender_filter">
        <Slider {...settings}>
          <button className="active">Appointment</button>
          <button>Reviews</button>
          <button>Tips</button>
          <button>Online Sales</button>
        </Slider>
      </div>
      <div className="calender_notification">
        <div className="container">
          <img
            src="https://media.vanityfair.com/photos/63765577474812eb37ec70bc/master/pass/Headshot%20-%20credit%20%E2%80%9CNational%20Geographic%20for%20Disney+%E2%80%9D.jpg"
            alt=""
          />
          <div className="content">
            <h6>Chris booked online $149</h6>
            <p className="faded">4 hours ago</p>
            <p>
              n publishing and graphic design, Lorem ipsum is a placeholder text
              commonly used to demonstrate the vis
            </p>
          </div>
        </div>
        <div className="container">
          <img
            src="https://media.vanityfair.com/photos/63765577474812eb37ec70bc/master/pass/Headshot%20-%20credit%20%E2%80%9CNational%20Geographic%20for%20Disney+%E2%80%9D.jpg"
            alt=""
          />
          <div className="content">
            <h6>Chris booked online $149</h6>
            <p className="faded">4 hours ago</p>
            <p>
              n publishing and graphic design, Lorem ipsum is a placeholder text
              commonly used to demonstrate the vis
            </p>
          </div>
        </div>
        <div className="container">
          <img
            src="https://media.vanityfair.com/photos/63765577474812eb37ec70bc/master/pass/Headshot%20-%20credit%20%E2%80%9CNational%20Geographic%20for%20Disney+%E2%80%9D.jpg"
            alt=""
          />
          <div className="content">
            <h6>Chris booked online $149</h6>
            <p className="faded">4 hours ago</p>
            <p>
              n publishing and graphic design, Lorem ipsum is a placeholder text
              commonly used to demonstrate the vis
            </p>
          </div>
        </div>
        <div className="container">
          <img
            src="https://media.vanityfair.com/photos/63765577474812eb37ec70bc/master/pass/Headshot%20-%20credit%20%E2%80%9CNational%20Geographic%20for%20Disney+%E2%80%9D.jpg"
            alt=""
          />
          <div className="content">
            <h6>Chris booked online $149</h6>
            <p className="faded">4 hours ago</p>
            <p>
              n publishing and graphic design, Lorem ipsum is a placeholder text
              commonly used to demonstrate the vis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HOC(CalenderNotification);

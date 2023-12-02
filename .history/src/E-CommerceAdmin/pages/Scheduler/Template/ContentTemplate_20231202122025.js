/** @format */

import React from "react";

const ContentTemplate = (props) => {
  const payload = {
    quantity: 1,
    userId,
    date,
    time,
  };

  const addInCart = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.React_App_Baseurl}api/v1/admin/addtoCart/service/${productId}`,
        payload,
        Auth
      );
      toast.success(data.message);
      fetchHandler();
    } catch (e) {
      console.log(e);
    }
  };

  return props?.Id ? (
    <div className="Schedule_Enquiry_Modal">
      <div className="close_btn">
        <h4>{props.Subject}</h4>
      </div>

      <p> First name : {props.FirstName} </p>
      <p> Last name : {props.LastName} </p>
      <p> User Email : {props.userEmail} </p>
      <p> Phone Number : {props.userPhone} </p>
    </div>
  ) : (
    <div className="Add_Service_Modal">
      <form onSubmit={addInCart}>
        <select onChange={(e) => setProductId(e.target.value)}>
          <option>Select Service</option>
          {service?.map((i, index) => (
            <option key={index} value={i._id}>
              {" "}
              {i.name}{" "}
            </option>
          ))}
        </select>
        <select onChange={(e) => setUserId(e.target.value)}>
          <option>Select User</option>
          {users?.map((i, index) => (
            <option key={index} value={i._id}>
              {" "}
              {i.firstName + " " + i.lastName}{" "}
            </option>
          ))}
        </select>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input type="time" onChange={(e) => setTime(e.target.value)} />
        <button className="Add_Service_Modal_button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default ContentTemplate;

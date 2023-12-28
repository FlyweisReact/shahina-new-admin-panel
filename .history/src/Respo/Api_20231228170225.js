/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";
import { getDates } from "../Store/Slices/dateSlice";

const Baseurl = process.env.React_App_Baseurl;
const duration = 3000;

export const showMsg = (title, message, type) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};

export const getBlockedSlots = async (setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/admin/Slot/getSlotForAdmin`);
    const data = res.data.data?.docs;
    setResponse(data);
  } catch {}
};

export const createBlockedTime = async (payload) => {
  try {
    const res = await axios.put(
      `${Baseurl}api/v1/admin/Slot/slotBlocked`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    showMsg("Success", "", "info");
  } catch (e) {
    console.log(e);
  }
};

export const getBookingDetail = async (id, setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/viewserviceOrder/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
      },
    });
    const data = res.data.data;
    setResponse(data);
  } catch {}
};

export const deleteService = async (serviceId, userId, fetchCart) => {
  try {
    const res = await axios.delete(
      `${Baseurl}api/admin/cart/delete/services/${serviceId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    fetchCart();
  } catch {
    fetchCart();
  }
};

export const addService = async (serviceId, payload, fetchCart) => {
  try {
    const res = await axios.post(
      `${Baseurl}api/v1/admin/addtoCart/${serviceId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    fetchCart();
  } catch {}
};

export const noShow = (id, date, handleClose) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${Baseurl}api/v1/admin/noShowUpdate/${id}/${date}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      if (res.status === 200) {
        await dispatch(getAppointment());
        handleClose();
        showMsg("Appointment updated", "", "info");
      }
    } catch {}
  };
};

export const uploadUser = async (payload) => {
  try {
    const res = await axios.post(
      `${Baseurl}api/v1/admin/uploadClient`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    Store.addNotification({
      title: "Uploaded",
      message: "",
      type: "info",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: duration,
        onScreen: true,
      },
    });
  } catch {}
};

export const unblock_slot = async (payload) => {
  try {
    const res = await axios.put(
      `${Baseurl}api/v1/admin/Slot/slotUnBlocked`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    showMsg("Updated", "", "info");
  } catch {}
};

export const getSlots = async (fromDate, toDate, page, limit, setResponse) => {
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/admin/Slot/getSlotForAdmin?fromDate=${fromDate}&toDate=${toDate}&page${page}=&limit=${limit}`
    );
    const data = res.data.data;
    setResponse(data);
  } catch {}
};

export const getCart = async (userId, setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/admin/getCart/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
      },
    });
    const data = res.data.cart;
    setResponse(data);
  } catch {}
};

export const addNote = async (userId, payload) => {
  try {
    const res = await axios.put(
      `${Baseurl}api/v1/admin/addSuggestionToServiceCart/${userId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
  } catch {}
};

export const getRecentService = async (userId, setResponse) => {
  try {
    const res = await axios.get(
      `https://shahina-backend.vercel.app/api/v1/admin/getServiceOrdersByuserId/${userId}`
    );
    const data = res.data.data;
    setResponse(data);
  } catch {}
};

export const checkout = (userId, sendEmail, handleClose) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${Baseurl}api/v1/admin/checkout/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(getAppointment());
        sendEmail();
        handleClose();
        showMsg("Saved", "", "info");
      }
    } catch (e) {
      console.log(e);
      const message = e.response.data.msg;
      showMsg("", message, "info");
    }
  };
};

export const fetchServices = async (setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/Service/all/getAllServices`);
    const data = res.data.data?.docs;
    setResponse(data);
  } catch {}
};

export const rescheduleOrder = (orderId, date, payload, handleClose) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${Baseurl}api/v1/admin/reSechduleOrder/${orderId}/${date}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      const status = res.status;
      if (status === 200) {
        await dispatch(getAppointment());
        handleClose();
        showMsg("Reschedules", "", "info");
      }
    } catch {}
  };
};

export const getOrders = async (setResponse, status, userId) => {
  const head = status ? `?serviceStatus=${status}` : "";
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/admin/getServiceOrdersByuserId/${userId}${head}`
    );
    const data = res.data.data;
    setResponse(data);
  } catch {
    setResponse([]);
  }
};

export const editBookedNoted = async (id, payload) => {
  try {
    const res = await axios.put(
      `${Baseurl}api/v1/admin/addSuggestionToServiceOrder/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    showMsg("Saved", "", "info");
  } catch {}
};

export const createClient = async (payload, fetchUsers, setModalShow) => {
  try {
    const res = await axios.post(
      `${Baseurl}api/v1/admin/clientRegistration`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    setModalShow(false);
    showMsg("Created", "", "success");
    fetchUsers();
  } catch {}
};

export const deleteUser = (id, handleClose) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `${Baseurl}api/v1/admin/deleteUser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      const status = res.status;
      if (status === 200) {
        await dispatch(getAppointment());
        handleClose();
        showMsg("Removed", "", "info");
      }
    } catch (e) {
      showMsg("Error", "", "info");
    }
  };
};

export const cancelAppointment = (id, payload, handleClose) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${Baseurl}api/v1/cancelBooking/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      const status = res.status;
      if (status === 200) {
        await dispatch(getAppointment());
        handleClose();
        showMsg("Cancelled Appointment", "", "success");
      }
    } catch {}
  };
};

export const editUser = (id, payload, handleClose) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${Baseurl}api/v1/admin/updateClientProfile/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      if (res.status === 200) {
        await dispatch(getAppointment());
        handleClose();
        showMsg("Updated Successfully", "", "info");
      }
    } catch {}
  };
};

export const getAppointment = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        "https://shahina-backend.vercel.app/api/v1/admin/getServiceOrderswithDate",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      const data = res.data.data;
      dispatch(getDates(data));
    } catch {}
  };
};

export const blockUser = (userId, show) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(
        `${Baseurl}api/v1/admin/activeBlockUser/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
          },
        }
      );
      const code = res.status;
      const msg = res.data.msg;

      if (code === 200) {
        await dispatch(getAppointment());
        showMsg("", msg, "info");
      }
    } catch (e) {
      const msg = e.response?.data?.message;
      showMsg("", msg, "info");
    }
  };
};

// Paginated Services
export const getPaginatedServices = async (searchTerm, page, setResponse) => {
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/Service/all/paginateServiceSearch?search=${searchTerm}&page=${page}`
    );
    const data = res.data.data?.docs;
    setResponse(data);
  } catch {}
};

// Get AddON Service
export const getAdOnService = async (setResponse) => {
  try {
    const res = await axios.get(
      `${Baseurl}api/v1/admin/AddOnServices/allAddOnServices`
    );
    const data = res.data.data;
    setResponse(data);
  } catch {}
};

// Add ad-on-service in cart
export const AdOnInCart = async (serviceId, payload, fetchCart) => {
  try {
    const res = await axios.post(
      `${Baseurl}api/v1/admin/addtoCart/addOnservices/${serviceId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    if (res.status === 200) {
      fetchCart();
    }
  } catch {
    showMsg("Technical issue", "", "danger");
  }
};

export const deleteAdOn = async (serviceId, userId, fetchCart, setShow) => {
  try {
    const res = await axios.delete(
      `${Baseurl}api/admin/cart/delete/AddOnservices/${serviceId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
    if (res.status === 200) {
      await fetchCart();
      setShow(false);
    }
  } catch {}
};


// Suggestion  Cart
export const deleteSuggestion = async () => {
  try{
    const res=  await axios.delete(`${Baseurl}`)
  }catch{}
}

/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";

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
    Store.addNotification({
      title: "Created !",
      message: "teodosii@react-notifications-component",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
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

export const deleteService = async (serviceId, userId) => {
  try {
    const res = await axios.delete(
      `${Baseurl}api/admin/cart/delete/service/${serviceId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
        },
      }
    );
  } catch {}
};

export const addService = async (serviceId, payload) => {
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
  } catch {}
};

export const noShow = async (id, date) => {
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
    showMsg("Appointment updated", "", "info");
  } catch {}
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



export const getRecentService  = async () => {
  try{
    const res = await axios.get(`https://shahina-backend.vercel.app/api/v1/admin/getServiceOrdersByuserId/64f8131fab2015af4ff9a2c4`)
  }catch{}
}
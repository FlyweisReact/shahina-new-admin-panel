/** @format */

import axios from "axios";
import { Store } from "react-notifications-component";
import { toast } from "react-toastify";

const Baseurl = process.env.React_App_Baseurl;

export const getBlockedSlots = async (setResponse) => {
  try {
    const res = await axios.get(`${Baseurl}api/v1/admin/Slot/getSlotForAdmin`);
    const data = res.data.data;
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


export const getBookingDetail = async (id , setResponse) => {
    try{
        const res = await axios.get(`${Baseurl}api/v1/viewserviceOrder/${id}`,   {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
            },
          })
        console.log(res.data)

    }catch{}
}
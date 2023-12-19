/** @format */

import axios from "axios";
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
    const res = await axios.post(`${Baseurl}admin/Slot/slotBlocked`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
      },
    });
    toast.success("")

  } catch {}
};

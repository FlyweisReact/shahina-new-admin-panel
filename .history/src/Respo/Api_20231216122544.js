import axios from "axios"

const Baseurl = process.env.React_App_Baseurl

export const getBlockedSlots = async (setResponse) => {
    try{
        const res = await axios.get(`${Baseurl}api/v1/admin/Slot/allSlot`)

    }catch{}
}
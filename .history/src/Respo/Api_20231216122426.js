import axios from "axios"

const Baseurl = process.env.React_App_Baseurl

export const getBlockedSlots = async () => {
    try{
        const res = await axios.get(`${Baseurl}`)
    }catch{}
}
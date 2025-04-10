const axios = require("axios");
import { getDataFromResponse } from "../../utils/helper";

export const sendCallBack =  async (url:string, resp:any)  =>
{
    try
    {
        let call_res = await axios.post(url, resp);
        call_res = getDataFromResponse(call_res);
        return call_res;
    }
    catch(err)
    {
        console.log(err);
        return {
            success: false
        }
    }
} 
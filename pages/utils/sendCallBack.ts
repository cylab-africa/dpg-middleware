import axios from "axios";

export const sendCallBack =  async (url:string, resp:any)  =>
{
    try
    {
        const call_res = await axios.post(url, resp);
        return {success:true, data: call_res}
    }
    catch(err)
    {
        console.log(err);
        return {
            success: false
        }
    }
} 
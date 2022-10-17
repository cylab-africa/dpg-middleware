import axios from "axios";  // This might be the probloem I am facing

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
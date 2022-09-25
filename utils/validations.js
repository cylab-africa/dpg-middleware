export const validateAuth = (body) =>
{
    let success = true;
    let message = "Validation is ok";
    if(!body.token)
    {
        success = false;
        message= "token is needed to authenticate in an encryption format";
    }
    return {success, message}
}; 


export const validateEncryptKeys = (keys) =>
{
    let success = true;
    let message = "Validation is ok";
    if(!keys.misp_lk)
    {
        success = false;
        message= "misp_lk is required";
    }
    else if(!keys.auth_partner_id )
    {
        success = false;
        message= "auth_partner_id is required";
    }
    else if(!keys.api_key )
    {
        success = false;
        message= "api_key is required";
    }
    else if(!keys.transaction_id)
    {
        success = false;
        message= "transaction_id is required";
    }
    else if(!keys.callback_url )
    {
        success = false;
        message= "api_key is required";
    }
    return {success, message}
}; 


export const ekycValidateAuth = (body) =>
{
    let success = true;
    let message = "Validation is ok";
    
    return {success, message}
}; 
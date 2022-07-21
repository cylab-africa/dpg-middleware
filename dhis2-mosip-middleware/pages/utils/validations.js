export const validateAuth = (body) =>
{
    let success = true;
    let message = "Validation is ok";
    if(!body.misp_lk)
    {
        success = false;
        message= "misp_lk is needed to authenticate";
    }
    else if(!data.auth_partner_id )
    {
        success = false;
        message= "auth_partner_id is needed to authenticate";
    }
    else if(!data.api-key )
    {
        success = false;
        message= "api_key is needed to authenticate";
    }
    return {success, message}
}; 
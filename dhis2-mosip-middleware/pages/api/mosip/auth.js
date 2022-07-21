import axios from "axios";
import { API_ROUTE, MOSIP_BASE_ROUTE } from "../../utils/mosip.env";
import { validateAuth } from "../../utils/validations";

export default async function authenticate(req, res) 
{
  try
  {
    if (req.method === 'POST') 
    {
      let validationRes = validateAuth(req.body);

      if(validationRes.success === false)
      {
        return res.status(400).json({
          success: false,
          message: validationRes.message
        });
      }
      else
      {
        const misp_lk = req.body.misp_lk;
        const auth_partner_id = req.body.auth_partner_id;
        const api_key = req.body.api_key;

        console.log(validationRes, "wgiye he");

        let mosip_request_body ={
          "id": "auth-id",
          "version": "auth-version",
          "individualId": "auth-indv-id",
          "individualIdType": "auth-indv-id-type",
          "transactionID": "auth-transaction",
          "requestTime": "auth-requ-time",
          "specVersion": "auth-spec-version",
          "thumbprint": "auth-thumbprint",
          "domainUri": "auth-domainUri",
          "env": "auth-env",
          "request": {
              "otp": "otp-123424",
              "staticPin": "static-pin-7890",
              "timestamp": "time-stanp-now",
              "biometrics": [
                  {
                      "data": {
                          "digitalId": {
                              "serialNo": "1",
                              "make": "make",
                              "model": "Model",
                              "type": "type",
                              "deviceSubType": "subtype",
                              "deviceProvider": "DProvider",
                              "deviceProviderId": "providerID",
                              "dp": "db",
                              "dpId": "dpId",
                              "dateTime": "datetime"
                          },
                          "bioType": "data-bio-type",
                          "bioSubType": "data-bio-type-id",
                          "bioValue": "data-bio-value",
                          "deviceCode": "data-devoce-code",
                          "deviceServiceVersion": "data-device-serv-ver",
                          "transactionId": "data-trsct-id",
                          "timestamp": "data-time",
                          "purpose": "data-purpose",
                          "env": "data-env",
                          "version": "data-version",
                          "domainUri": "daa-domain_uri",
                          "requestedScore": 0,
                          "qualityScore": 0
                      },
                      "hash": "hash",
                      "sessionKey": "session key",
                      "specVersion": "Spec Version",
                      "thumbprint": "Thumb information"
                  }
              ]
          },
          "consentObtained": true,
          "requestHMAC": "auth-hmac",
          "requestSessionKey": "auth-session-key",
          "metadata": {
              "one": "One"
          },
          "allowedKycAttributes": [
              "auth-allowed-ky"
          ]
        };

        
        let mosip_route = `${MOSIP_BASE_ROUTE}auth/${misp_lk}/${auth_partner_id}/${api_key}`;
        // I need to hit mosip here.
        
        // I CAN CONTACT THE OTHER SERVER: EX: MOSIP SERVER API
        // const res_ext = await axios.post(API_ROUTE+"authenticate");
        // console.log(res_ext.data);

        console.log("I am")
        res.status(200).json({ 
          message: 'This is hit when we want to authenticate someone',
          method: "POST",
          params: "We want from the body: 1. MISP-LK, 2. Auth-Partner-ID, and 3. API-Key",
          request_body: mosip_request_body
        })
      }
    }
  }
  catch(err)
  {
    return res.status(400).json(err);
  }
  
}
  
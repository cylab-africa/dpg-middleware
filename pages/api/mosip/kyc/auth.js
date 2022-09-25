import axios from "axios";
import { decipheringText } from "../../../../utils/aes.encrypt";
import { MOSIP_BASE_ROUTE, MOSIP_BYPASS } from "../../../../utils/mosip.env";
import { ekycValidateAuth, validateAuth } from "../../../../utils/validations";

export default async function authenticate(req, res) {
	try {
		/* requirements:
		  1. misp_lk
		  2. ekyc_partner_id
		  3. transaction_id
		  4. callback_url


		  ekyc_mosip_request_body
		*/
		if (req.method === 'POST') {

			// return res.status(200).json({
			// 	message: 'EKYC is ready to go',
			// 	status: true
			// });
			let validationRes = validateAuth(req.query);

			if (!validationRes.success) {
				return res.status(400).json({
					success: false,
					status: false,
					message: validationRes.message
				});
			}

			const token = req.query.token;
			if ((token.timestamp + 60000 * 10) > Date.now()) { // token will expires after 10 mins. I am checking
				return res.status(400).json({
					status: false,
					success: false,
					message: "Token provided was expired"
				});
			}
			const keys_decrypt = decipheringText(token);

			const keys_info = JSON.parse(keys_decrypt);
			let mosip_route = null;
			let mosip_resp = null;
			const { misp_lk, auth_partner_id, api_key, transaction_id, callback_url } = keys_info;
			const ekyc_partner_id = auth_partner_id;

			if(MOSIP_BYPASS == "true") {
				mosip_resp = [
					{
					  "cause": {
						"stackTrace": [
						  {
							"classLoaderName": "string",
							"moduleName": "string",
							"moduleVersion": "string",
							"methodName": "string",
							"fileName": "string",
							"lineNumber": 0,
							"className": "string",
							"nativeMethod": true
						  }
						],
						"message": "string",
						"suppressed": [
						  {
							"stackTrace": [
							  {
								"classLoaderName": "string",
								"moduleName": "string",
								"moduleVersion": "string",
								"methodName": "string",
								"fileName": "string",
								"lineNumber": 0,
								"className": "string",
								"nativeMethod": true
							  }
							],
							"message": "string",
							"localizedMessage": "string"
						  }
						],
						"localizedMessage": "string"
					  },
					  "stackTrace": [
						{
						  "classLoaderName": "string",
						  "moduleName": "string",
						  "moduleVersion": "string",
						  "methodName": "string",
						  "fileName": "string",
						  "lineNumber": 0,
						  "className": "string",
						  "nativeMethod": true
						}
					  ],
					  "metadata": {
						"additionalProp1": {},
						"additionalProp2": {},
						"additionalProp3": {}
					  },
					  "actionMessage": "string",
					  "message": "string",
					  "codes": [
						"string"
					  ],
					  "errorText": "string",
					  "errorTexts": [
						"string"
					  ],
					  "errorCode": "string",
					  "suppressed": [
						{
						  "stackTrace": [
							{
							  "classLoaderName": "string",
							  "moduleName": "string",
							  "moduleVersion": "string",
							  "methodName": "string",
							  "fileName": "string",
							  "lineNumber": 0,
							  "className": "string",
							  "nativeMethod": true
							}
						  ],
						  "message": "string",
						  "localizedMessage": "string"
						}
					  ],
					  "localizedMessage": "jean paul"
					}
				  ]  // ekyc_mosip_response

			} else {	
				/*
					Expected full body
					{
						"id": "string",
						"version": "string",
						"individualId": "string",
						"individualIdType": "string",
						"transactionID": "string",
						"requestTime": "string",
						"specVersion": "string",
						"thumbprint": "string",
						"domainUri": "string",
						"env": "string",
						"request": {
							"otp": "string",
							"staticPin": "string",
							"timestamp": "string",
							"demographics": {
							"age": "string",
							"dob": "string",
							"name": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"dobType": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"gender": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"phoneNumber": "string",
							"emailId": "string",
							"addressLine1": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"addressLine2": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"addressLine3": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"location1": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"location2": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"location3": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"postalCode": "string",
							"fullAddress": [
								{
								"language": "string",
								"value": "string"
								}
							],
							"metadata": {
								"additionalProp1": {},
								"additionalProp2": {},
								"additionalProp3": {}
							}
							},
							"biometrics": [
							{
								"data": {
								"digitalId": {
									"serialNo": "string",
									"make": "string",
									"model": "string",
									"type": "string",
									"deviceSubType": "string",
									"deviceProvider": "string",
									"dp": "string",
									"dpId": "string",
									"deviceProviderId": "string",
									"dateTime": "string"
								},
								"bioType": "string",
								"bioSubType": "string",
								"bioValue": "string",
								"deviceCode": "string",
								"deviceServiceVersion": "string",
								"transactionId": "string",
								"timestamp": "string",
								"purpose": "string",
								"env": "string",
								"version": "string",
								"domainUri": "string",
								"requestedScore": 0,
								"qualityScore": 0
								},
								"hash": "string",
								"sessionKey": "string",
								"specVersion": "string",
								"thumbprint": "string"
							}
							]
						},
						"consentObtained": true,
						"requestHMAC": "string",
						"requestSessionKey": "string",
						"metadata": {
							"additionalProp1": {},
							"additionalProp2": {},
							"additionalProp3": {}
						},
						"allowedKycAttributes": [
							"string"
						]
					}
				*/

				let mosip_request_body = req.body;

				// Setting request body
				mosip_request_body.transactionID = keys_info.transaction_id;
				mosip_request_body.individualId = keys_info.mosip_id;

				const validation_body_res = ekycValidateAuth(mosip_request_body); // validating a request body
				if(!validation_body_res.success)
				{
					return res.status(400).json({success: false, message: validation_body_res.message});
				}

				// partnerId: jnishimi
				// mispPartner: cmumisp
				// apiKey: 940594
				// mispLicenseKey: vT4Iu6TYB7la8I3qt2pV63D1CKZz01716gc913Vhpl0hLwD9G4
				mosip_route = `${MOSIP_BASE_ROUTE}kyc/${misp_lk}/${ekyc_partner_id}/${api_key}`;
				mosip_resp = await axios.post(mosip_route, mosip_request_body);
				mosip_resp = mosip_resp.data;
			}
			
			const call_res = await axios.post(callback_url, mosip_resp);
			// console.log("from callback server", call_res);

			// When It is not mosip_bypass, MOSIP gives the response, and I need to control a response better.

			return res.status(200).json({
				message: 'This is hit when we want to authenticate someone',
				params: "We want from the body: 1. MISP-LK, 2. Auth-Partner-ID, and 3. API-Key",
				callback_url: callback_url,
				mosip_response: mosip_resp,
				status: true
			})
		}
	}
	catch (err) {
		return res.status(400).json(err);
	}
}

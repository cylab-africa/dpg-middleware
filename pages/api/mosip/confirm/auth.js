import { decipheringText } from "../../../../utils/aes.encrypt";
import { MOSIP_BASE_ROUTE, MOSIP_BYPASS, MOSIP_MOCK_RESPONSE_BODY } from "../../../../utils/mosip.env";
import { validateAuth } from "../../../../utils/validations";
import { sendCallBack } from "../../../utils/sendCallBack";

export default async function real_authenticate(req, res) {
	try {
		if (req.method === 'POST') {
			let validationRes = validateAuth(req.query);

			if (!validationRes.success) {
				return res.status(400).json({
					success: false,
					status: false,
					message: validationRes.message
				});
			}

			const token = req.query.token;
			if ((token.timestamp + 60000 * 10) > Date.now()) {//expires after 10 mins
				return res.status(400).json({
					status: false,
					success: false,
					message: "Token provided expired"
				});
			}
			const keys_decrypt = decipheringText(token);
			const keys_info = JSON.parse(keys_decrypt);
			let mosip_route = null;
			let mosip_resp = null;
			const { misp_lk, auth_partner_id, api_key, transaction_id, callback_url } = keys_info;
			
			if (MOSIP_BYPASS == "true") {
				mosip_resp = MOSIP_MOCK_RESPONSE_BODY;

			} else {
				let mosip_request_body = {
					"id": "auth-id",
					"version": "auth-version",
					"individualId": req.body.individualId,
					"individualIdType": req.body.individualIdType,
					"transactionID": req.body.transactionId,
					"requestTime": "auth-requ-time",
					"specVersion": req.body.specVersion,
					"thumbprint": req.body.thumbprint,
					"domainUri": req.body.domainUri,
					"env": req.body.env,
					"request": {
						"otp": "otp-123424",
						"staticPin": "static-pin-7890",
						"timestamp": "time-stanp-now",
						"biometrics": [
							{
								"data": {
									"digitalId": {
										"serialNo": req.body.serialNo,
										"make": req.body.make,
										"model": req.body.model,
										"type": req.body.type,
										"deviceSubType": req.body.deviceSubType,
										"deviceProvider": req.body.deviceProvider,
										"deviceProviderId": req.body.deviceProviderId,
										"dp": "db",
										"dpId": "dpId",
										"dateTime": req.body.dateTime
									},
									"bioType": "data-bio-type",
									"bioSubType": "data-bio-type-id",
									"bioValue": "data-bio-value",
									"deviceCode": "data-devoce-code",
									"deviceServiceVersion": "data-device-serv-ver",
									"transactionId": req.body.transactionId,
									"timestamp": req.body.timestamp,
									"purpose": req.body.purpose,
									"env": req.body.env,
									"version": req.body.version,
									"domainUri": req.body.domainUri,
									"requestedScore": req.body.requestedScore,
									"qualityScore": req.body.qualityScore
								},
								"hash": req.body.hash,
								"sessionKey": "session key",
								"specVersion": req.body.specVersion,
								"thumbprint": req.body.thumbprint
							}
						]
					},
					"consentObtained": true,
					"requestHMAC": req.body.requestHMAC,
					"requestSessionKey": "auth-session-key",
					"metadata": {
						"andrewId": req.body.andrewId
					},
					"allowedKycAttributes": [
						"auth-allowed-ky"
					]
				};
				// partnerId: jnishimi
				// mispPartner: cmumisp
				// apiKey: 940594
				// mispLicenseKey: vT4Iu6TYB7la8I3qt2pV63D1CKZz01716gc913Vhpl0hLwD9G4
				mosip_route = `${MOSIP_BASE_ROUTE}auth/${misp_lk}/${auth_partner_id}/${api_key}`;
				mosip_resp = await axios.post(mosip_route, mosip_request_body);
				mosip_resp = mosip_resp.data;
			}

			const call_res = await sendCallBack(callback_url, mosip_resp);
			if(!call_res.success)
			{
				return res.status(400).json({
					success: false,
					message: "could not send the callback"
				})
			}
			
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

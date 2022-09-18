import axios from "axios";
import { decipheringText } from "../../../../utils/aes.encrypt";
import { MOSIP_BASE_ROUTE } from "../../../../utils/mosip.env";
import { validateAuth } from "../../../../utils/validations";

export default async function authenticate(req, res) {
	try {
		if (req.method === 'POST') {

			return res.status(200).json({
				message: 'EKYC is ready to go',
				status: true
			});
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
			
			if (process.env.MOSIP_BYPASS) {
				mosip_resp = {
					"id": "mosip.identity.auth",
					"version": "v1",
					"responseTime": "2019-02-15T07:23:19.590+05:30",
					"transactionID": "<transaction_id used in request>",
					"response": {
						"authStatus": true,
						"authToken": "<authentication_token>"
					},
					"errors": null
				}

			} else {
				let mosip_request_body = {body: "required"};
				// partnerId: jnishimi
				// mispPartner: cmumisp
				// apiKey: 940594
				// mispLicenseKey: vT4Iu6TYB7la8I3qt2pV63D1CKZz01716gc913Vhpl0hLwD9G4
				mosip_route = `${MOSIP_BASE_ROUTE}auth/${misp_lk}/${auth_partner_id}/${api_key}`;
				mosip_resp = await axios.post(mosip_route, mosip_request_body);
			}

			await axios.post(callback_url, mosip_resp);

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

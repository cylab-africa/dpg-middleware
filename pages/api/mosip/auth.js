import { decipheringText } from "../../../utils/aes.encrypt";
// import { API_ROUTE } from "../../../utils/mosip.env";
import { validateAuth } from "../../../utils/validations";
import real_authenticate from "./confirm/auth";
import kyc_real_authenticate from "./kyc/auth";

export default async function authenticate(req, res) {
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
			
			const keys_decrypt = decipheringText(token);
			const keys_info = JSON.parse(keys_decrypt);
			
			const {timestamp, kyc } = keys_info;

			if ((timestamp + (60000 * 10)) < Date.now()) {//expires after 10 mins
				return res.status(400).json({
					status: false,
					success: false,
					message: "Token provided is expired"
				});
			}
			
			if (kyc == true) {
				return await kyc_real_authenticate(req, res);

			} else {
				
				return await real_authenticate(req, res);
			}
		}
	}
	catch (err) {
		return res.status(400).json({success: false, message: err.message});
	}
}

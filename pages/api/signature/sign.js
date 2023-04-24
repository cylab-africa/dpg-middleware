import { CryptoUtil } from "../../../lib/CryptoUtil";


export default async function sign(req, res) {
	if (req.method === 'PUT') {
		try {
			let data = JSON.stringify(req.body)
			console.log({ data })
			if (!data) {
				return res.status(400).json({
					success: false,
					message: "body is required in request."
				});
			}
			return res.status(200).json({
				success: true,
				data: await CryptoUtil.signData(CryptoUtil.convertToBase64(data)),
				message: "Data signed successfully"
			});
		} catch (exp) {
			console.log(exp);
			return res.status(503).json({
				success: false,
				message: "Internal server error."
			});
		}
	}
	return res.status(404).text("Endpoint not found.")
}
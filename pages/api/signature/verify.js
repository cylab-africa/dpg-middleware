import { CryptoUtil } from "../../../lib/CryptoUtil";


export default async function sign(req, res) {
	if (req.method === 'PUT') {
		try {
			let data = req.body?.data;
			let signature = req.body?.signature;
			if(!data){
				return res.status(400).json({
					success: false,
					message: "data is required in request body."
				});
			}
			data = JSON.stringify(data);
			console.log({data, signature})
			return res.status(200).json({
				success: true,
				data: await CryptoUtil.verifyData(data, signature),
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
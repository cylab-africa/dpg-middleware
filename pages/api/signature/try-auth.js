import { CryptoUtil } from "../../../lib/CryptoUtil";
import AuthRequest from "../../../models/AuthRequest";

export default async function sign(req, res) {
	const request = req.body;
	const data = JSON.stringify(req.body);
	
	
	const authRequest = new AuthRequest();
	const dataBytes = CryptoUtil.convertToBase64(data);
	// get default mosip request payload

	// get public thumbprint from p12 certificate file
	let thumbprint = await CryptoUtil.getCertThumprintHash();
	authRequest.setThumbprint(thumbprint);
	authRequest.setIndividualId(request.vid ?? request.psut ?? request.uin);
	authRequest.setConsentObtained(true);
	//console.log( "\n", thumbprint );
	//thumbprint = CryptoUtil.convertToBase64(byteArray);
	

	// generate encrypted request
	let encryptedRequest = await CryptoUtil.symmetricEncrypt({ data: JSON.stringify(request.requestData) });
	console.log({encryptedRequest})
	// convert to base64.urlsafe_b64encode
	encryptedRequest = CryptoUtil.convertToBase64(encryptedRequest);
	encryptedRequest = CryptoUtil.convertToBase64UrlPadded(encryptedRequest);

	console.log({ encryptedRequest })
	authRequest.setRequest(encryptedRequest)

	// generate the requestHMAC
	const requestHMAC = ""

	// generate the requestSessionKey
	let requestSessionKey = CryptoUtil.asymmetricEncrypt();
	console.log({ requestSessionKey })
	requestSessionKey = CryptoUtil.convertToBase64(requestSessionKey);
	requestSessionKey = CryptoUtil.convertToBase64UrlPadded(requestSessionKey);
	console.log({ requestSessionKey })
	authRequest.setRequestSessionKey(requestSessionKey);

	// generate signature from entire auth request
	const signature = ""
	console.log(authRequest.getMOSIPAuth());
	return res.status(200).json({
		success: true,
		message: "Auth process completed successfully"
	});
}
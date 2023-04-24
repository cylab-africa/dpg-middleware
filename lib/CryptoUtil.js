import path from 'path';

const fs = require('fs');

const HASH_ALG = "SHA256";
const BINARY_ENCODING = "base64";
export class CryptoUtil{
	static async signData(data){
		const {
			createSign,
		} = await import('node:crypto');
		try {
			const privateKey = fs.readFileSync(path.resolve('keys/Client.key'), 'utf8');
			const sign = createSign(HASH_ALG);
			sign.write(data);
			sign.end();
			return sign.sign(privateKey, BINARY_ENCODING);
		} catch (err) {
			console.error(err);
			return "";
		}
	}

	static convertToBase64(data) {
		let bufferObj = Buffer.from(data, "utf8");

		return bufferObj.toString("base64");
	}

	static async verifyData(data, signature){
		const {
			createVerify,
		} = await import('node:crypto');
		const publicKey = fs.readFileSync(path.resolve('keys/Client.cer'), 'utf8');
		const verify = createVerify(HASH_ALG);
		verify.write(data);
		verify.end();
		const response = verify.verify(publicKey, signature)
		//const response = crypto.verify(HASH_ALG, data, publicKey, signature)
		console.log(response);
		return response;
	}
}


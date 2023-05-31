import path from 'path';
const fs = require('fs');
const jws = require("jws");
const crypto = require("crypto");

const HASH_ALG = "RS256";
const BINARY_ENCODING = "base64";



export class CryptoUtil{
	constructor(){
		
	}
	// alg: RS256 ***
	static async signData(data){
		const {
			createSign,
		} = await import('node:crypto');
		try {
			const privateKey = fs.readFileSync(path.resolve('keys/partner.pem'), 'utf8');
			const sign = createSign(HASH_ALG);
			sign.write(data);
			sign.end();
			return sign.sign(privateKey, BINARY_ENCODING);
		} catch (err) {
			console.error(err);
			return "";
		}
	}

	static async symmetricEncrypt({data, key=256}){
		const nonce = 128;
		const iv = await this.randomBytes(nonce);
		const keyBytes = await this.randomBytes(key / 8);
		const algorithm = "aes-256-gcm";
		const cipher = crypto.createCipheriv(algorithm, keyBytes, iv);
		let encrypted = cipher.update(data, "utf-8", "binary") + cipher.final('binary');

		const authTag = cipher.getAuthTag();
		const enc_data_final = Buffer.concat([Buffer.from(encrypted, 'binary'), authTag, iv]);

		return enc_data_final;
	}

	static async getCertThumprintHash(){
		const {
			X509Certificate,
		} = await import('node:crypto');
		const x509 = new X509Certificate(fs.readFileSync(process.env.CRYPTO_ENCRYPT__ENCRYPT_CERT_PATH));
		const inputString = x509.fingerprint256;
		const concatenatedString = inputString.replace(/:/g, '');

		// Step 2: Split the string into an array of two-character substrings
		const hexValues = concatenatedString.match(/.{1,2}/g);

		// Step 3: Parse hexadecimal values and convert to decimal
		const decimalValues = hexValues.map(hex => parseInt(hex, 16));
		// Step 4: Create Uint8Array from decimal values
		const byteArray = new Uint8Array(decimalValues);
		let base64Str = this.convertToBase64(byteArray, {base64Type: "base64"})
		
		return this.convertToBase64UrlPadded(base64Str);
	}

	static convertToBase64UrlPadded(str){
		return str.replace(/\+/g, '-').replace(/\//g, '_');
	}

	static async randomBytes(size = 256) {
		const buf = crypto.randomBytes(size);
		return buf;
	}

	// RS256
	static getSignature(data){
		const privateKey = fs.readFileSync(path.resolve('keys/partner.pem'), 'utf8');

		const signature = jws.sign({
			header: { alg: 'RS256' },
			payload: data,
			secret: privateKey,
		});
		console.log(this.convertToBase64({data}))
		return signature;
	}

	static convertToBase64(data, options = {format: "utf8", base64Type:"base64"}) {
		let bufferObj = Buffer.from(data, options.format ?? "utf8");

		return bufferObj.toString(options.base64Type ?? "base64");
	}

	static async verifyData(data, signature){
		const {
			createVerify,
		} = await import('node:crypto');
		const publicKey = fs.readFileSync(path.resolve('keys/partner.pem'), 'utf8');
		const verify = createVerify(HASH_ALG);
		verify.write(data);
		verify.end();
		const response = verify.verify(publicKey, signature)
		//const response = crypto.verify(HASH_ALG, data, publicKey, signature)
		console.log(response);
		return response;
	}
}


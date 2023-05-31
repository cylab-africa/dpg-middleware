export default class AuthRequest {
	constructor() {
		this._id = process.env.IDA_AUTH_REQUEST_ID
		this._version = process.env.IDA_AUTH_VERSION
		this._individualId = "";
		this._transactionID = "";
		this._requestTime = new Date().toISOString().slice(0, -1);
		this._specVersion = process.env.IDA_SPEC_VERSION
		this._thumbprint = "";
		this._domainUri = process.env.IDA_AUTH_DOMAIN_URI
		this._env = process.env.IDA_AUTH_ENV
		this._requestedAuth = "";
		this._consentObtained = "";
		this._requestHMAC = "";
		this._requestSessionKey = "";
		this._request = "";
		this._metadata = "";
	}

	// Setters
	setId(value) {
		this._id = value;
	}

	setVersion(value) {
		this._version = value;
	}

	setIndividualId(value) {
		this._individualId = value;
	}

	setTransactionID(value) {
		this._transactionID = value;
	}

	setRequestTime(value) {
		this._requestTime = value;
	}

	setSpecVersion(value) {
		this._specVersion = value;
	}

	setThumbprint(value) {
		this._thumbprint = value;
	}

	setDomainUri(value) {
		this._domainUri = value;
	}

	setEnv(value) {
		this._env = value;
	}

	setRequestedAuth(value) {
		this._requestedAuth = value;
	}

	setConsentObtained(value) {
		this._consentObtained = value;
	}

	setRequestHMAC(value) {
		this._requestHMAC = value;
	}

	setRequestSessionKey(value) {
		this._requestSessionKey = value;
	}

	setRequest(value) {
		this._request = value;
	}

	setMetadata(value) {
		this._metadata = value;
	}

	// Getters
	getId() {
		return this._id;
	}

	getVersion() {
		return this._version;
	}

	getIndividualId() {
		return this._individualId;
	}

	getTransactionID() {
		return this._transactionID;
	}

	getRequestTime() {
		return this._requestTime;
	}

	getSpecVersion() {
		return this._specVersion;
	}

	getThumbprint() {
		return this._thumbprint;
	}

	getDomainUri() {
		return this._domainUri;
	}

	getEnv() {
		return this._env;
	}

	getRequestedAuth() {
		return this._requestedAuth;
	}

	getConsentObtained() {
		return this._consentObtained;
	}

	getRequestHMAC() {
		return this._requestHMAC;
	}

	getRequestSessionKey() {
		return this._requestSessionKey;
	}

	getRequest() {
		return this._request;
	}

	getMetadata() {
		return this._metadata;
	}

	getMOSIPAuth() {
		return {
			id: this._id,
			version: this._version,
			individualId: this._individualId,
			transactionID:this. _transactionID,
			requestTime: this._requestTime,
			specVersion: this._specVersion,
			thumbprint: this._thumbprint,
			domainUri: this._domainUri,
			env: this._env,
			requestedAuth: this._requestedAuth,
			consentObtained: this._consentObtained,
			requestHMAC: this._requestHMAC,
			requestSessionKey: this._requestSessionKey,
			request: this._request,
			metadata: this._metadata
		};
	}

	toString() {
		return `AuthRequest:
		id: ${this._id},
		version: ${this._version},
		individualId: ${this._individualId},
		transactionID: ${this._transactionID},
		requestTime: ${this._requestTime},
		specVersion: ${this._specVersion},
		thumbprint: ${this._thumbprint},
		domainUri: ${this._domainUri},
		env: ${this._env},
		requestedAuth: ${this._requestedAuth},
		consentObtained: ${this._consentObtained},
		requestHMAC: ${this._requestHMAC},
		requestSessionKey: ${this._requestSessionKey},
		request: ${this._request},
		metadata: ${this._metadata}`;
	}
}
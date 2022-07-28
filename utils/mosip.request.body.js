const mosip_request_body = {
"id": "auth-id",
"version": "auth-version",
"individualId": req.body.individualId,
"individualIdType": req.body.individualIdType,
"transactionID": req.body.transactionId,
"requestTime": Date.now(),
"specVersion": req.body.specVersion,
"thumbprint": req.body.thumbprint,
"domainUri": req.body.domainUri,
"env": req.body.env,
"request": {
    "otp": "otp-123424",
    "staticPin": "static-pin-7890",
    "timestamp": Date.now(),
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
                "timestamp": Date.now(),
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

module.exports = {mosip_request_body}
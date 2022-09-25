export const MOSIP_BASE_ROUTE = process.env.MOSIP_BASE_ROUTE; 
// export const API_ROUTE = "http://localhost:3001/";
export const MOSIP_BYPASS = process.env.MOSIP_BYPASS;

export const API_ROUTE = process.env.API_ROUTE;

export const MOSIP_MOCK_RESPONSE_BODY = {
    "id": "mosip.identity.auth",
    "version": "v1",
    "responseTime": "2019-02-15T07:23:19.590+05:30",
    "transactionID": "<transaction_id used in request>",
    "response": {
        "authStatus": true,
        "authToken": "<authentication_token>"
    },
    "errors": null
};


export const KYC_MOSIP_MOCK_RESPONSE_BODY = [
    {
      "cause": {
        "stackTrace": [
          {
            "classLoaderName": "string",
            "moduleName": "string",
            "moduleVersion": "string",
            "methodName": "string",
            "fileName": "string",
            "lineNumber": 0,
            "className": "string",
            "nativeMethod": true
          }
        ],
        "message": "string",
        "suppressed": [
          {
            "stackTrace": [
              {
                "classLoaderName": "string",
                "moduleName": "string",
                "moduleVersion": "string",
                "methodName": "string",
                "fileName": "string",
                "lineNumber": 0,
                "className": "string",
                "nativeMethod": true
              }
            ],
            "message": "string",
            "localizedMessage": "string"
          }
        ],
        "localizedMessage": "string"
      },
      "stackTrace": [
        {
          "classLoaderName": "string",
          "moduleName": "string",
          "moduleVersion": "string",
          "methodName": "string",
          "fileName": "string",
          "lineNumber": 0,
          "className": "string",
          "nativeMethod": true
        }
      ],
      "metadata": {
        "additionalProp1": {},
        "additionalProp2": {},
        "additionalProp3": {}
      },
      "actionMessage": "string",
      "message": "string",
      "codes": [
        "string"
      ],
      "errorText": "string",
      "errorTexts": [
        "string"
      ],
      "errorCode": "string",
      "suppressed": [
        {
          "stackTrace": [
            {
              "classLoaderName": "string",
              "moduleName": "string",
              "moduleVersion": "string",
              "methodName": "string",
              "fileName": "string",
              "lineNumber": 0,
              "className": "string",
              "nativeMethod": true
            }
          ],
          "message": "string",
          "localizedMessage": "string"
        }
      ],
      "localizedMessage": "jean paul"
    }
  ];
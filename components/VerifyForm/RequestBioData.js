import { Typography, Box, Button } from '@mui/material';
import Image from 'next/image';
import styles from "./VerifyForm.module.scss";
import { useState } from "react";
import NotificationManager from '../../lib/NotificationManager.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { CircularProgress } from "@mui/material"

export default function RequestBioData({ cb, MDS_BYPASS = false, goBackHandler = () => { } }) {
	const [failed, setFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	let port = 4501;
	let isCaptureReqSent = false;
	const start = true;

	const handleTryAgain = async () => {
		setIsLoading(true);
		if (MDS_BYPASS) {
			setTimeout(() => {
				const biometrics = {
					"specVersion": "0.9.5",
					"data": "eyJ4NWMiOlsiTUlJRFBUQ0NBaVdnQXdJQkFnSUVZQ0ZISVRBTkJna3Foa2lHOXcwQkFRc0ZBREJTTVFzd0NRWURWUVFHRXdKSlRqRVNNQkFHQTFVRUNBd0pTMkZ5Ym1GMFlXdGhNUTR3REFZRFZRUUtEQVZOYjNOcGNERU9NQXdHQTFVRUN3d0ZUVzl6YVhBeER6QU5CZ05WQkFNTUKQmIwMUVNakYyWXpKc2QxcHRiSFZhTWxaNVl6SjRhR05FUlZsTlFsbEhRVEZWUlVOM2QxQmlWemw2WVZoQ2JXRlhOVzVhV0VwNwidGltZXN0YW1wIjoiMjAyMi0wNy0yOFQxNDozMzoxMloiLCJyZXF1ZXN0ZWRTY29yZSI6IjEwIiwicXVhbGl0eVNjb3JlIjoiNDQifQ1EPbcNPfsvqWoOsY-uspGcJR5Ty4oS9LbNkO6eYF5JsDudmuckn8vzQUKdue6RIXgAAE764nQ7N7F-BVPwe07i42d1qshbL-cBh1341UZ9DDO3SYHPJlXOscsIA9wUzlG5Nvl78B0QfqA8-wvIDJPm47DbsoDzUk1lKCUL_e3jERikmG4H7njBi74Dc7EP_olamcRN690FVXol9vm9rbplepH50ZIE_hgffEqLaEVsBKVhGNZB3OWqjt9qzNg41LdnYsXS-NI8NUG9MXybX046aJBCR_EGJgCePTpXZK3Az0407osF2A_VUgW-NAQMBhvnAvCVmpw0uhgXhh6DnaYg",
					"hash": "B90CF2C966F79FBDE81E0FF739A58B04CC9517A31EDCE8C4B82C5B3078576350",
					"error": {
						"errorCode": "0",
						"errorInfo": "Success"
					},
				}
				return cb({ biometrics });
			}, 3600);
		} else {
			capture_flow();
		}
	}
	const capture_flow = async () => {
		const disc = await discovery();
		if (disc) {
			if (disc.deviceStatus === "Ready") {
				const info = await deviceInfo()
				if (info[0]?.error?.errorCode === "0") {
					const response = await capture();
					cb(response);
					setIsLoading(false);
				}
				setTimeout(async () => {
					console.log("log timeout ");
				}, 15000)
			} else {
				setIsLoading(false);
				setFailed(true)
				NotificationManager.notify({ message: "Biometric Device is not ready. Check the cable connection and make sure the right drivers then try again.", type: "warning" })
			}
		} else {
			setIsLoading(false);
			setFailed(true)
			NotificationManager.notify({ message: "Biometric Device not found. Connect device or check connection and try again", type: "warning" })
		}
	}
	const stream_and_capture = async () => {
		const response = await fetch(`http://127.0.0.1:${port}/stream`, {
			method: "STREAM",
			mode: "cors",
			headers: {
				"accept": "multipart/*",
			},
			body: JSON.stringify({
				"deviceId": "2143001190",
				"deviceSubId": 0,
				"timeout": "5000"
			})
		});
		const reader = response.body.getReader();
		while (true) {
			const { value, done } = await reader.read();
			if (done === true) break;
			if (isCaptureReqSent == false) {
				isCaptureReqSent = true;
				console.log("Sending capture request");
				const response = await capture();
				cb(response);
				setIsLoading(false);
			}
		}
	}

	const deviceInfo = async () => {
		const response = await fetch(`http://127.0.0.1:${port}/info`, {
			method: 'MOSIPDINFO',
			mode: "cors",
			headers: {
				"accept": "application/json",
			},
			redirect: 'manual'
		});
		const json = await response.json();
		return json;
	}
	const capture = async () => {
		try {
			const response = await fetch(`http://127.0.0.1:${port}/capture`, {
				method: "RCAPTURE",
				mode: "cors",
				body: JSON.stringify({
					"env": "Developer",
					"purpose": "Auth",
					"specVersion": "0.9.5",
					"timeout": "20000",
					"captureTime": "2022-08-02T10:16:48Z",
					"domainUri": "https://mosipcmuafrica.me",
					"transactionId": "1234567890",
					"bio": [
						{
							"type": "Finger",
							"count": "1",
							"bioSubType": ["UNKNOWN"],
							"requestedScore": "10",
							"deviceId": "2143001190",
							"deviceSubId": 0,
							"previousHash": ""
						}
					]
				})
			})

			const json = response.json();

			return json;
		} catch (err) {
			return err;
		}
	}

	const discovery = async () => {
		try {
			for (; port < 4600; port++) {
				try {
					const response = await fetch(`http://127.0.0.1:${port}/device`, {
						method: "MOSIPDISC",
						headers: {
							"Content-Type": "application/json",
							"accept": "application/json",
						},
						body: JSON.stringify({
							"type": "Finger"
						})
					});
					const json = await response.json();
					if (json.length === 0 || json[0].error.errorCode === "106") {
						continue;
					}
					return json[0];
				} catch (err) {
					continue;
				}
			}
			return false;

		} catch (err) {
			return err;
		}
	}

	return (
		<Box >
			<Box className={styles.form} >
				{!isLoading &&
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
						<Typography variant="h6" gutterBottom>Place finger on biometric device and click {failed ? "Try Again" : "Start"}</Typography>
						<FingerprintIcon sx={{ width: 100, height: 100 }} />
					</Box>
				}
				{isLoading &&
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Image src="/img/thumb.gif" className={styles.Image} width={300} height={200} alt="fingerprint" />
						<CircularProgress sx={{ mt: 3 }} />
					</Box>
				}
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
				{!isLoading &&
					<Box>
						{failed && <Button size="large" sx={{ mr: "1em" }} color="secondary" onClick={goBackHandler} variant="outlined" aria-label='Go Back' title='Go Back'><ArrowBackIcon /></Button>}
						<Button variant="contained" onClick={handleTryAgain} disabled={isLoading}>{failed ? "Try Again" : "Start"}</Button>
					</Box>
				}
			</Box>
		</Box>
	)
}

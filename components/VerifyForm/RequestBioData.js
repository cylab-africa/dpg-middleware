import { Typography, Box, Button } from '@mui/material';
import Image from 'next/image';
import styles from "./VerifyForm.module.scss";
import { useState } from "react";
import NotificationManager from '../../lib/NotificationManager.js';
import { defaultConfig } from '../../config/default';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import {CircularProgress } from "@mui/material"

export default function RequestBioData({ cb }) {
	const [failed, setFailed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const start = true;
	const handleTryAgain = async () => {
		setIsLoading(true);
		setTimeout(async () => {
			callMDS();
		}, 2000);
	}
	const callMDS = async () => {
		const options = {
			"env": "Staging",
			"purpose": "Auth",
			"specVersion": "0.9.5",
			"timeout": "3000",
			"captureTime": new Date().toISOString(),
			"domainUri": "https://mosipcmuafrica.me",
			"transactionId": "12345671522",
			"bio": [
				{
					"type": "Finger",
					"count": "1",
					"bioSubType": ["UNKNOWN"],
					"requestedScore": "10",
					"deviceId": "2",
					"deviceSubId": "1",
					"previousHash": ""
				}
			],
			"customOpts": [
				{
					"name": "name1",
					"value": "value1"
				}
			]
		}
		await fetch(defaultConfig.MDS_URL,
			{
				method: "RCAPTURE",
				body: JSON.stringify(options),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				cb({ options, ...res });
				return true;
			})
			.catch(err => {
				console.log(err);
				setFailed(true);
				setIsLoading(false);
				const message = "Failed to capture biometric.";
				NotificationManager.notify({ message, type: "error" })
				return false;
			});

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
						<CircularProgress sx={{mt: 3}}/>
					</Box>
				}
			</Box>
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
				{!isLoading &&
					<Button onClick={handleTryAgain} disabled={isLoading}>{failed ? "Try Again" : "Start"}</Button>
				}
			</Box>
		</Box>
	)
}

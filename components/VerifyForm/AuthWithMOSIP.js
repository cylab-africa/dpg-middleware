import { Typography, Box, Button } from '@mui/material';
import Image from 'next/image';
import styles from "./VerifyForm.module.scss";
import { useEffect, useState } from "react";
import NotificationManager from '../../lib/NotificationManager.js';
import { defaultConfig } from '../../config/default';
import { CircularProgress } from "@mui/material"
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';

export default function AuthWithMOSIP({ token, user, bioData, cb = () => { } }) {
	const [status, setStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	user = {
		VID: "test-user",
	}
	const device = defaultConfig.device;
	useEffect(() => {
		const device_options = bioData.options;
		const options = {
			"env": "Staging",
			"purpose": "Auth",
			"specVersion": "0.9.5",
			"timeout": "3000",
			"captureTime": new Date().toISOString(),
			"domainUri": "https://mosipcmuafrica.me",
			"transactionId": "12345671522",
			"individualId": user.VID,
			"VID": user.VID,
			"individualType": "VID",
			"thumbprint": bioData.biometrics.data,
			"hash": bioData.biometrics.hash,
			"requestedScore": "10",
			...device,
			...device_options,
		}
		fetch(`/api/mosip/auth?token=${token}`,
			{
				method: "POST",
				body: JSON.stringify(options),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(res => res.json())
			.then(res => {
				if(res.status){
					setStatus(res.mosip_response.response.authStatus)
				}
				setIsLoading(false);
			})
			.catch(err => {
				console.log(err);
				setStatus(false);
				setIsLoading(false);
				const message = err.message;
				NotificationManager.notify({ message, type: "error" });
				return false;
			});

	})

	return (
		<Box >
			<Box className={styles.form} >
				{isLoading &&
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
						<CircularProgress sx={{ m: 3, width: 200, height: 200 }} />
					</Box>
				}
				{!isLoading && status &&
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<CheckCircleIcon sx={{ color: "#007c04", m: 3, width: 200, height: 200 }} />
					</Box>
				}
				{!isLoading && !status &&
					<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<CancelIcon sx={{ color: "#7C0000", m: 3, width: 200, height: 200 }} />
					</Box>
				}
			</Box>
		</Box>
	)
}

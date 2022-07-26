import { Typography, Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useState, Fragment, useEffect } from 'react';
import VerifyForm from '../VerifyForm/RequestBioData';
import styles from "./VerificationController.module.scss";
import AuthWithMOSIP from '../VerifyForm/AuthWithMOSIP';
import { defaultConfig } from '../../config/default';
import NotificationManager from '../../lib/NotificationManager';


export default function VerificationController({ user }) {
	const [activeStep, setActiveStep] = useState(0);
	const [mdsResponse, setMDSResponse] = useState({});
	const steps = ['Initiation', 'Verify', 'Results'];

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleMockMDS = (response) => {
		setMDSResponse(response);
		handleNext();
	}
	const test = () => {
		fetch(defaultConfig.mainApi + "/url/generate", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"content-type": "application/json",	
			},
			body: JSON.stringify({
				misp_lk: "jnishimi",
				auth_partner_id: "cmumisp",
				api_key: "940594",
				transaction_id: "transaction-id",
				callback_url: "localhost:3010/users/auth-"
			})
		}).then(
			res => res.json()
		).then(res => {
			console.log(res);
			NotificationManager.notify({ message: "it works!", type: "success" })
		}).catch(err => {
			console.log(err);
			NotificationManager.notify({ message: err.message, type: "error" })
		})
	}
	return (
		<Box sx={{ width: '100%', paddingY: 3 }}>
			<Box>
				<Stepper nonLinear activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label} >
							<StepLabel color="inherit">
								{label}
							</StepLabel>
						</Step>
					))}
				</Stepper>
				<Button onClick={test}>Test</Button>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
				{activeStep === 0 &&
					<Fragment>
						<Box sx={{ display: 'flex', flexDirection: 'column', pt: 3 }}>
							<Box sx={{ display: 'flex', flexDirection: 'column', p: 5, }}>
								<Typography variant='h6'>Name: {user.name}</Typography>
							</Box>
							<Button onClick={handleNext}>Verify</Button>
						</Box>
					</Fragment>
				}
				{activeStep === 1 &&
					<Fragment>
						<Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
							<VerifyForm cb={handleMockMDS} />
						</Box>
					</Fragment>
				}
				{activeStep === 2 &&
					<Fragment>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<AuthWithMOSIP user={user} bioData={mdsResponse} />
						</Box>
					</Fragment>
				}
			</Box>
		</Box>
	);
}


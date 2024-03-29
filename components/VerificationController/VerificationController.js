import { Typography, Box, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useState, Fragment } from 'react';
import RequestBioData from '../VerifyForm/RequestBioData';
import AuthWithMOSIP from '../VerifyForm/AuthWithMOSIP';


export default function VerificationController({ token }) {
	const [activeStep, setActiveStep] = useState(0);
	const [mdsResponse, setMDSResponse] = useState({});
	const steps = ['Initiation', 'Verify', 'Results'];
	const [mockVerification, setMockVerification] = useState(false);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};
	const handlePrevious = () => {
		setActiveStep(activeStep - 1)
	}

	const handleMockMDS = (response) => {
		setMDSResponse(response);
		handleNext();
	}

	const handleNextMock = () => {
		setMockVerification(true);
		handleNext();
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
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
				{activeStep === 0 &&
					<Fragment>
						<Box sx={{ display: 'flex', flexDirection: 'column', pt: 3 }}>
							<Box sx={{ display: 'flex', flexDirection: 'column', p: 5, }}>
								<Typography variant='h6'>Authentication with MOSIP</Typography>
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'column', pt: 3 }}>
								<Button variant='contained' onClick={handleNext}>Verify</Button>
							</Box>
							<Box sx={{ display: 'flex', flexDirection: 'column', pt: 3 }}>
								<Button variant="contained" onClick={handleNextMock}>Mock Verify</Button>
							</Box>
						</Box>
					</Fragment>
				}
				{activeStep === 1 &&
					<Fragment>
						<Box sx={{ display: 'flex', flexDirection: 'column', pt: 2 }}>
							<RequestBioData cb={handleMockMDS} MDS_BYPASS={mockVerification} goBackHandler={handlePrevious} />
						</Box>
					</Fragment>
				}
				{activeStep === 2 &&
					<Fragment>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
							<AuthWithMOSIP bioData={mdsResponse} token={token}/>
						</Box>
					</Fragment>
				}
			</Box>
		</Box>
	);
}


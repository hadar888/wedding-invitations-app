import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AppBar, Toolbar, Typography, Container, Button, Stepper, Step, StepLabel, Grid } from '@mui/material';
import GuestTableContainer from './GuestTableContainer';
import { ChangeEvent, useContext, useState } from 'react';
import WordingContainer from './WordingContainer';
import WordingBasicInfoContainer from './WordingBasicInfoContainer';
import ApprovalContainer from './ApprovalContainer';
import { AppContext } from './AppContext';

function App() {
  const { weddingInfo } = useContext(AppContext);

  const initialWordingValue = `Dear [Guest's Name],
We are delighted to invite you to celebrate our wedding day! 🎉
Date: ${weddingInfo.weddingDate.getDate()}/${weddingInfo.weddingDate.getMonth() + 1}/${weddingInfo.weddingDate.getFullYear()}
Time: ${weddingInfo.weddingTime.getHours()}:${weddingInfo.weddingTime.getMinutes()}
Venue: ${weddingInfo.weddingVenue.name}
location links: [waze link], [google maps link]
Please save the date and join us in this joyous occasion. We look forward to celebrating with you!
RSVP by ${weddingInfo.rsvpDate}
Warmest Regards,
  ${weddingInfo.brideAndGroomNames}`

  const [activeStep, setActiveStep] = useState(0);
  const [wording, setWording] = useState(initialWordingValue);

  const hanldeWordingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setWording(value);
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <GuestTableContainer />;
      case 1:
        return <WordingBasicInfoContainer />;
      case 2:
        return <WordingContainer initialWordingValue={wording} hanldeWordingChange={hanldeWordingChange} />;
      case 3:
        return <ApprovalContainer wording={wording} />;
      default:
        return null;
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Wedding Invitations
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className="container">
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel
              className='step-label'
              onClick={() => handleStepClick(0)}>
              Guests
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              className='step-label'
              onClick={() => handleStepClick(1)}>
              Basic info
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              className='step-label'
              onClick={() => handleStepClick(2)}>
              Wording
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              className='step-label'
              onClick={() => handleStepClick(3)}>
              Approval
            </StepLabel>
          </Step>
        </Stepper>
        <div>{getStepContent(activeStep)}</div>
        <Grid container justifyContent="space-between" marginTop={2}>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handlePreviousStep}
            >
              Previous
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={activeStep === 3}
              onClick={handleNextStep}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;

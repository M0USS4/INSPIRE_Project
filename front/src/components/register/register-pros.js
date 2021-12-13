import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Register from '../register/register';
import '../register/register.css';
import { Navigate } from 'react-router-dom';
import { Button, MobileStepper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Register2 from './register2';

const steps = ['Informations', 'Telecharger des fichiers'];
const ProfessionalRegister = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="reg">

      {activeStep === steps.length ? (
        <Navigate to="/login" />
      ) : (
        <div>
          <div className="stepper">
            <h1 className="registration-title-pro">Inscription</h1>
            <h3 className="register-mobile-title">
              {steps[activeStep]}
            </h3>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 0 ? <Register/> : <Register2/>}
            <div className="stepper-buttons">
              <button
                className="button1"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                  Back
              </button>
              <button
                className="button1"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
            <MobileStepper
              variant="text"
              steps={steps.length}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                >
              Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
              Back
                </Button>
              }
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default ProfessionalRegister;

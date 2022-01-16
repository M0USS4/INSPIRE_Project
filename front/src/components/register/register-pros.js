/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
// import Register from '../register/register';
import '../register/register.css';
import { Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Register2 from './register2';
import { useForm } from 'react-hook-form';
import CollapsableAlert from '../shared/CollapsableAlert';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Register3 from './register3';

const RegisterContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  alignContent: 'center',
  boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.2)',
  minHeight: '550px',
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '850px',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '850px',
  },
}));
const steps = ['Basic Informations', 'Address Informations', 'Telecharger des fichiers'];
const ProfessionalRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setdata] = useState({});
  const [allMedicineTypes, setallMedicineTypes] = useState([]);

  const [success, setsuccess] = useState(null);
  const [message, setmessage] = useState('');
  const [open, setopen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get('http://localhost:2021/getAllMedicine')
      .then(response => {
        if (response.data) {
          setallMedicineTypes(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleNext = (personalData) => {
    const selectedMedicine = allMedicineTypes.find(medicine => medicine.name === personalData.practice);
    personalData.practice = selectedMedicine ? selectedMedicine.id : 1;
    setdata(personalData);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
          <RegisterContainer>
            <h2 className="registration-title-pro">Inscription</h2>
            <Stepper activeStep={activeStep} alternativeLabel sx={{paddingTop: '25px'}}>
              {steps.map((label) => {
                const stepProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel  sx={{fontSize: '1rem'}}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <CollapsableAlert
              open={open}
              setopen={setopen}
              message={message}
              severity={success ? 'success' : 'error'}/>
            {activeStep === 0 &&
                <div className="register-content">
                  <form >
                    <div className="register-fields">
                      <div className={`field-container ${errors.lastname ? 'invalid' : ''}`}>
                        <label htmlFor="nom"><b>Nom</b></label>
                        <input
                          type="text"
                          placeholder="Enter Nom"
                          name="nom"
                          className='form-control'
                          {...register('lastname', { required: true, maxLength: 30, minLength: 2 })}
                        />

                      </div>
                      <div className={`field-container ${errors.firstname ? 'invalid' : ''}`}>
                        <label htmlFor="prenom"><b>Prenom</b></label>
                        <input
                          type="text"
                          placeholder="Enter Prenom"
                          name="prenom"
                          className='form-control'
                          {...register('firstname', { required: true, maxLength: 30, minLength: 2 })}
                        />

                      </div>
                      <div className={`field-container ${errors.dateofBirth ? 'invalid' : ''}`}>
                        <label htmlFor="dateofBirth"><b>Date of Birth</b></label>
                        <input
                          type="date"
                          placeholder="Enter Date of Birth"
                          name="dateofBirth"
                          className='form-control'
                          {...register('dateofBirth', { })}
                        />
                      </div>
                      <div className={`field-container ${errors.phone ? 'invalid' : ''}`}>
                        <label htmlFor="phone"><b>Phone Number</b></label>
                        <input
                          type="text"
                          placeholder="Enter Phone Number"
                          className='form-control'
                          name="phone"
                          {...register('phone', { required: true, maxLength: 12, minLength: 10 })}
                        />
                      </div>
                      <div className={`field-container ${errors.email ? 'invalid' : ''}`}>
                        <label htmlFor="email"><b>Email</b></label>
                        <input
                          type="email"
                          placeholder="Enter Email"
                          name="email"
                          className='form-control'
                          {...register('email', {
                            required: true,
                            // eslint-disable-next-line max-len
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                          })}
                        />
                      </div>
                      <div className={`field-container ${errors.practice ? 'invalid' : ''}`}>
                        <label htmlFor="add"><b>Practice Type</b></label>
                        <select className='form-control'
                          // value={selectedMedicine}
                          // onChange={(e) => setselectedMedicine(e.target.value)}
                          {...register('practice')}
                        >
                          {allMedicineTypes.length && allMedicineTypes.map((medicine, index) => (
                            <option key={index}>{medicine.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className={`field-container ${errors.password ? 'invalid' : ''}`}>
                        <label htmlFor="password"><b>Mot de Passe</b></label>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          name="password"
                          className='form-control'
                          {...register('password', {
                            required: true,
                          })}
                        />
                      </div>

                      <div className={`field-container ${errors.confirm_password ? 'invalid' : ''}`}>
                        <label htmlFor="confirm-password"><b>Confirmer mot de passe</b></label>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          name="confirm-password"
                          className='form-control'
                          {...register('confirm_password', {
                            required: true,
                          })}
                        />
                      </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', margin: '10px', gap: '10px'}}>
                      <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                      <Button variant='contained' onClick={handleSubmit(handleNext)}>Next Step</Button>
                    </div>
                  </form>
                </div>
            }
            {activeStep === 1 &&
            <Register3
              data={data}
              handleBack={handleBack}
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setdata={setdata}
            />
            }
            {activeStep === 2 &&
            <Register2
              data={data}
              // onSubmit={onSubmit}
              setopen={setopen}
              setsuccess={setsuccess}
              setmessage={setmessage}
              handleBack={handleBack}

            />
            }
          </RegisterContainer>

        </div>
      )}
    </div>
  );
};

export default ProfessionalRegistration;

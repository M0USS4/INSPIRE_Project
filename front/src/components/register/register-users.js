import { styled } from '@mui/material';
import React from 'react';
import Register from './register';
import './register.css';

const RegisterContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  alignContent: 'center',
  boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.2)',
  minHeight: '650px',
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '70%',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '800px',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '800px',
  },
}));
const UserRegistration = () => {
  return (
    <div className="register-container1">
      <RegisterContainer >
        <div className="welcome-sub-title">
          <h1>Sign Up</h1>
        </div>
        <Register/>
      </RegisterContainer>
    </div>
  );
};

export default UserRegistration;

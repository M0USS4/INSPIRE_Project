import React from 'react';
// import logo from '../../images/logo.JPG';
import Register from './register';
import './register.css';

const UserRegistration = () => {
  return (
    <div className="register-container1">
      <section className="register1">
        <div className="welcome-sub-title">
          <h1>Sign Up</h1>
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <Register/>
      </section>
    </div>
  );
};

export default UserRegistration;

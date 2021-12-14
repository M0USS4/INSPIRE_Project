/* eslint-disable no-useless-escape */
import {React, useState} from 'react';
import './register.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const Register = () => {
  let navigate = useNavigate();
  const [success, setsuccess] = useState(null);
  const [message, setmessage] = useState('');
  const [open, setopen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const registerData = {
      type: 0,
      login: {
        mail: data.email,
        password: data.password,
        password_v: data.confirm_password,
      },
      user: {
        name: data.firstname,
        surname: data.lastname,
        phone: data.phone,
        birth: data.dateofBirth,
        adress: {
          number: data.number,
          street: data.street,
          postalC: data.postal,
          city: data.city,
          supp: data.add
        }
      }
    };
    console.log(registerData);

    axios.post('http://localhost:2021/register/post', registerData)
      .then(response => {
        console.log(response);
        navigate('/',      { state: {
          success: success,
        }});

      })
      .catch(err => {
        console.log(err);
        setopen(true);
        setmessage(err.data);
        setsuccess(false);
      });
  };

  return (
    <div className="register-content">
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setopen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          An Error Occured!{message}
        </Alert>
      </Collapse>

      <form >
        <div className="register-fields">
          <div className={`field-container ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="nom"><b>Nom</b></label>
            <input
              type="text"
              placeholder="Enter Nom"
              name="nom"
              {...register('lastname', { required: true, maxLength: 30, minLength: 2 })}
            />

          </div>
          <div className={`field-container ${errors.firstname ? 'invalid' : ''}`}>
            <label htmlFor="prenom"><b>Prenom</b></label>
            <input
              type="text"
              placeholder="Enter Prenom"
              name="prenom"
              {...register('firstname', { required: true, maxLength: 30, minLength: 2 })}
            />

          </div>
          <div className={`field-container ${errors.dateofBirth ? 'invalid' : ''}`}>
            <label htmlFor="dateofBirth"><b>Date of Birth</b></label>
            <input
              type="date"
              placeholder="Enter Date of Birth"
              name="dateofBirth"
              {...register('dateofBirth', { })}
            />
          </div>
          <div className={`field-container ${errors.phone ? 'invalid' : ''}`}>
            <label htmlFor="phone"><b>Phone Number</b></label>
            <input
              type="text"
              placeholder="Enter Phone Number"
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
              {...register('email', {
                required: true,
                // eslint-disable-next-line max-len
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            />
          </div>

          <div className={`field-container ${errors.password ? 'invalid' : ''}`}>
            <label htmlFor="password"><b>Mot de Passe</b></label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              {...register('password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
              })}
            />
          </div>

          <div className={`field-container ${errors.confirm_password ? 'invalid' : ''}`}>
            <label htmlFor="confirm-password"><b>Confirmer mot de passe</b></label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm-password"
              {...register('confirm_password', {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
              })}
            />
          </div>

          <div className={`field-container ${errors.city ? 'invalid' : ''}`}>
            <label htmlFor="city"><b>City</b></label>
            <input
              type="text"
              placeholder="City..."
              name="city"
              {...register('city', { required: true, maxLength: 40, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.postal ? 'invalid' : ''}`}>
            <label htmlFor="postal"><b>Postal Code</b></label>
            <input
              type="text"
              placeholder="Postal adresse..."
              name="postal"
              {...register('postal', { required: true, maxLength: 40, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.number ? 'invalid' : ''}`}>
            <label htmlFor="street"><b>Apartment No</b></label>
            <input
              type="number"
              placeholder="Apartment No..."
              name="number"
              {...register('number', { required: true, maxLength: 40, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.street ? 'invalid' : ''}`}>
            <label htmlFor="street"><b>Street</b></label>
            <input
              type="text"
              placeholder="Street..."
              name="street"
              {...register('street', { required: true, maxLength: 30, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.add ? 'invalid' : ''}`}>
            <label htmlFor="add"><b>Additional Info</b></label>
            <input
              type="text"
              placeholder="Additional Info..."
              name="add"
              {...register('add', { required: false, maxLength: 40, minLength: 2 })}
            />
          </div>
        </div>
        <div className="register-buttons">
          <button onClick={handleSubmit(onSubmit)} className="button1">Creer un Compte</button>
        </div>
      </form>

    </div>
  );
};

export default Register;

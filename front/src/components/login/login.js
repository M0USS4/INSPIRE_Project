/* eslint-disable no-useless-escape */
import {React, useState} from 'react';
import './login.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import CollapseAlert from '../shared/Alert';

const Login = () => {
  let navigate = useNavigate();
  const [success, setsuccess] = useState(null);
  const [message, setmessage] = useState('');
  const [open, setopen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) =>{
    console.log(data);
    const loginData = {
      login: {
        mail: data.email,
        password: data.password,
      }
    };
    axios.post('http://localhost:2021/login/post', loginData)
      .then(response => {
        console.log(response);
        console.log(success);
        setsuccess(true);
        navigate('/pro-profile',      { state: {
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
    <div>
      {/* <div className="login-content"> */}
      {/* <div className="welcome">
          <h1 className="welcome-title">
                        Welcome
          </h1>
        </div> */}
      <CollapseAlert
        open={open}
        setopen={setopen}
        message={message}
        severity={'success'}
      />
      <div className="login-fields">
        <form >
          <div className={`${errors.email ? 'invalid' : ''}`}>
            <label htmlFor="email"><b>Email</b></label>
            <input
              className='form-group'
              type="email"
              placeholder={` ${errors.email ? 'Check email' : 'Enter Email'}`}
              name="email"
              {...register('email',                         {
                required: true,
                // eslint-disable-next-line max-len
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            />
          </div>
          <div className={`${errors.password ? 'invalid' : ''}`}>
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              placeholder={` ${errors.email ? 'Check password' : 'Enter Password'}`}
              name="password"
              {...register('password', {
                required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
              })}
            />
          </div>

          <div className="buttons">
            <button onClick={handleSubmit(onSubmit)} className="button1">Se Connecter</button>
            <a href="" className="forgotten-password">Mot de passe oublie?</a>
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Login;

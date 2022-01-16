/* eslint-disable no-useless-escape */
import {React, useState} from 'react';
import './login.css';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import authService from '../helpers/auth.service';
import CollapsableAlert from '../shared/CollapsableAlert';

const Login = ({toDo}) => {
  let navigate = useNavigate();
  const [success, setsuccess] = useState(null);
  const [message, setmessage] = useState('');
  const [open, setopen] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) =>{
    const loginData = {
      login: {
        mail: data.email,
        password: data.password,
      }
    };
    authService.login(loginData)
      .then(() => {
        setsuccess(true);
        const user = authService.getCurrentUser();
        if(user.type === 1){
          navigate(`/pro-profile/customization/${user.user.idUser}`);
        }
        else if(user.type === 0){
          if(toDo === 'refresh'){
            window.location.reload();
          }
          else{
            navigate('/home');
          }
        }

      })
      .catch(err => {
        console.log(err);
        setopen(true);
        setmessage('Account does not exist');
        setsuccess(false);
      });
  };
  return (
    <div>
      <CollapsableAlert
        open={open}
        setopen={setopen}
        message={message}
        severity={success? 'success' : 'error'}
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
              })}
            />
          </div>

          <div className="buttons">
            <button onClick={handleSubmit(onSubmit)} type="button" className="button1">Se Connecter</button>
            <a href="" className="forgotten-password">Mot de passe oublie?</a>
          </div>
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};

Login.propTypes = {
  toDo: PropTypes.string,

};
export default Login;

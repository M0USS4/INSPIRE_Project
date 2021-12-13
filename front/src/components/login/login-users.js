/* eslint-disable no-useless-escape */
import React from 'react';
import './login.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const LoginUsers = () => {
  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) =>{
    console.log(data);
    navigate('/');

  };
  return (
    <section className="user-login">
      <div className="login">
        <div className="login-content">
          <div className="welcome">
            <h1 className="welcome-title">
                        Welcome
            </h1>
          </div>
          <div className="login-fields">
            <form >
              <div className={`${errors.email ? 'invalid' : ''}`}>
                <label htmlFor="email"><b>Email</b></label>
                <input
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
                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                  })}
                />
              </div>

              <div className="buttons">
                <button onClick={handleSubmit(onSubmit)} className="button1">Se Connecter</button>
                <a href="" className="forgotten-password">Mot de passe oublie?</a>
                <div className="new-user">
                  <p>New to Inspire?</p>
                  <a href="" className="button2"> Creer un Compte</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginUsers;

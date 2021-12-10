/* eslint-disable no-useless-escape */
import React from 'react';
import './register.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Register = () => {
  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    navigate('/');
  };

  return (
    <div className="register-content">
      <form  >
        <div className="register-fields">
          <div className={`field-container ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="nom"><b>Nom</b></label>
            <input
              type="text"
              placeholder="Enter Nom"
              name="nom"
              {...register('lastname', { required: true, maxLength: 10, minLength: 2 })}
            />

          </div>
          <div className={`field-container ${errors.firstname ? 'invalid' : ''}`}>
            <label htmlFor="prenom"><b>Prenom</b></label>
            <input
              type="text"
              placeholder="Enter Prenom"
              name="prenom"
              {...register('firstname', { required: true, maxLength: 10, minLength: 2 })}
            />

          </div>
          <div className={`field-container ${errors.age ? 'invalid' : ''}`}>
            <label htmlFor="age"><b>Age</b></label>
            <input
              type="text"
              placeholder="Enter Age"
              name="age"
              {...register('age', { required: true, maxLength: 3, minLength: 1 })}
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
              {...register('confirm_password', { required: true, maxLength: 10, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.city ? 'invalid' : ''}`}>
            <label htmlFor="city"><b>City</b></label>
            <input
              type="text"
              placeholder="City..."
              name="city"
              {...register('city', { required: true, maxLength: 10, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.postal ? 'invalid' : ''}`}>
            <label htmlFor="postal"><b>Postal Adresse</b></label>
            <input
              type="text"
              placeholder="Postal adresse..."
              name="postal"
              {...register('postal', { required: true, maxLength: 10, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.street ? 'invalid' : ''}`}>
            <label htmlFor="street"><b>Street</b></label>
            <input
              type="text"
              placeholder="Street..."
              name="street"
              {...register('street', { required: true, maxLength: 10, minLength: 2 })}
            />
          </div>

          <div className={`field-container ${errors.add ? 'invalid' : ''}`}>
            <label htmlFor="add"><b>Additional Info</b></label>
            <input
              type="text"
              placeholder="Additional Info..."
              name="add"
              {...register('add', { required: false, maxLength: 10, minLength: 2 })}
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

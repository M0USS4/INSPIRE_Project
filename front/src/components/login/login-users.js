/* eslint-disable no-useless-escape */
import {React} from 'react';
import Login from './login';
import './login.css';

const LoginUsers = () => {
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
            <Login/>
            <div className="buttons">
              <div className="new-user">
                <p>New to Inspire?</p>
                <a href="/register" className="button2"> Creer un Compte</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginUsers;

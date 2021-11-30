import React from 'react';
import './login.css';
import hero from '../../images/pexels-karolina-grabowska-4021808.jpg';
import logo from '../../images/logo.JPG';

const LoginUsers = () => {
    return (
        <div className="user-login">
            <div className="login-hero">
                <img src={hero} alt="login image" />
            </div>
            <div className="login-content">
                <div className="welcome">
                    <h1 className="welcome-title">
                        Welcome
                    </h1>
                    <div className="welcome-sub-title">
                        <p>be inspired</p>
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className="login-fields">
                    <label for="email"><b>Username</b></label>
                    <input type="email" placeholder="Enter Email" name="email" required />

                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" />


                    <div className="buttons">
                        <a href="" className="button1">Se Connecter</a>
                        <a href="" className="forgotten-password">Mot de passe oublie?</a>
                        <div className="new-user">
                            <p>New to Inspire?</p>
                            <a href="" className="button2"> Creer un Compte</a>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default LoginUsers

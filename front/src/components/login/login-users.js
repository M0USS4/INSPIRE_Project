/* eslint-disable no-useless-escape */
import {React} from 'react';
import Login from './login';
import './login.css';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router';
// import CollapsableAlert from '../shared/CollapsableAlert';

const LoginUsers = () => {
  // let navigate = useNavigate();
  // const [success, setsuccess] = useState(null);
  // const [message, setmessage] = useState('');
  // const [open, setopen] = useState(false);

  // const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = (data) =>{
  //   console.log(data);
  //   const loginData = {
  //     login: {
  //       mail: data.email,
  //       password: data.password,
  //     }
  //   };
  //   axios.post('http://localhost:2021/login/post', loginData)
  //     .then(response => {
  //       console.log(response);
  //       console.log(success);
  //       setsuccess(true);
  //       navigate('/pro-profile',      { state: {
  //         success: success,
  //       }});

  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setopen(true);
  //       setmessage(err.data);
  //       setsuccess(false);
  //     });
  // };
  return (
    <section className="user-login">
      <div className="login">
        <div className="login-content">
          <div className="welcome">
            <h1 className="welcome-title">
                        Welcome
            </h1>
          </div>
          {/* <CollapsableAlert
            open={open}
            setopen={setopen}
            message={message}
            severity={'success'}
          /> */}
          <div className="login-fields">
            <Login/>
            <div className="buttons">
              <div className="new-user">
                <p>New to Inspire?</p>
                <a href="" className="button2"> Creer un Compte</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginUsers;

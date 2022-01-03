import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import Login from '../../login/login';
import Register from '../../register/register';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import pic from '../../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';
import authService from '../../../auth.service';

import Radio from '@mui/material/Radio';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: 'black',
  display: 'block',
  marginTop: theme.spacing(2),
  backgroundColor: '#f0fafe'
}));

const IdType = {
  login: 'login',
  register: 'register'
};

const Identification = ({practicianData, handleNext}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState({
    login: false,
    register: false
  });
  const [appointmentData, setappointmentData] = useState({});
  const [currentUser, setcurrentUser] = useState();
  useEffect(() => {
    const paramsToObject = Object.fromEntries(new URLSearchParams(searchParams));
    const paramsFiltered = Object.keys(paramsToObject)
      .filter(key => key !== 'active')
      .reduce((cur, key) => { return Object.assign(cur, { [key]: paramsToObject[key] });}, {});
    setappointmentData(paramsFiltered);
    const user = authService.getCurrentUser();
    console.log(user);
    setcurrentUser(user);
  }, []);

  const handleExpandClick = (type) => {
    switch (type){
    case IdType.login:
      setExpanded({
        login: true,
        register: false
      });
      break;
    case IdType.register:
      setExpanded({
        login: false,
        register: true
      });
      break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryString = Object.keys(appointmentData).map(key => key + '=' + appointmentData[key]).join('&');
    setappointmentData(appointmentData);
    console.log(appointmentData);
    handleNext();
    navigate({
      pathname: '/pro-profile/1/booking',
      search: `?active=2&${queryString}`,
    });
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={12} sm={10} md={7} lg={6}>
          <Item>
            <p>J&apos;ai déjà un compte Inspire ?</p>
            {!expanded.login &&
            <button
              className='button1 identity-button'
              onClick={() => handleExpandClick(IdType.login)}>
              Se connecter
            </button>}
            <Collapse in={expanded.login} timeout="auto" unmountOnExit>
              {
                currentUser ?
                  <div>

                    <form onSubmit={handleSubmit}>
                      <label>Confirm Account</label>
                      <div className='confirm-account'>
                        <Radio
                          checked={true}
                        />
                        <p>{`${currentUser.name} ${currentUser.surname}`}</p>
                      </div>

                      <button sx={{ mt: 1, mr: 1 }} type="submit" className='button2' disabled={!currentUser}>
                          Confirm
                      </button>
                    </form>
                  </div>
                  :
                  <Login/>
              }
            </Collapse>
          </Item>
          <Item>
            <p>Nouveau sur Inspire ?</p>
            {!expanded.register &&
            <button
              className='button2 identity-button'
              onClick={() => handleExpandClick(IdType.register)}
            >
              S&apos;inscrire
            </button>}
            <Collapse in={expanded.register} timeout="auto" unmountOnExit>
              <Register/>
            </Collapse>
          </Item>
        </Grid>
        <Grid item xs={12} sm={10} md={4} lg={3}>
          <Item>
            <div className="pro-data-header">
              <img src={pic} alt="" className='pro-img-circle'/>
              <p>{practicianData.name}</p>
            </div>
            <p><b>{appointmentData.type}</b></p>
            <p>{practicianData.address}</p>
            <p>{`${practicianData.code} ${practicianData.city}`}</p>
            <p>{`${appointmentData.day} ${appointmentData.date}`}</p>
            <p>{appointmentData.time}</p>
            <p>{`Price: ${appointmentData.price} Duration: ${appointmentData.duration}`}</p>

          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

Identification.propTypes = {
  practicianData: PropTypes.object,
  handleNext: PropTypes.func
};
export default Identification;

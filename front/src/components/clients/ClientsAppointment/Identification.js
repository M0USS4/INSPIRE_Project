import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import Login from '../../login/login';
import Register from '../../register/register';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import pic from '../../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';
import authService from '../../helpers/auth.service';

import Radio from '@mui/material/Radio';

const Div = styled('div')(() => ({
}));

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'block',
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.secondary.contrastText
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
  const [AnotherAccount, setAnotherAccount] = useState(false);
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
            <Button
              variant='contained'
              onClick={() => handleExpandClick(IdType.login)}
              sx={{width: '100%'}}>
              Se connecter
            </Button>}
            <Collapse in={expanded.login} timeout="auto" unmountOnExit>
              {
                currentUser &&
                  <div>

                    <form onSubmit={handleSubmit}>
                      <label>Confirm Account</label>
                      <div className='confirm-account'>
                        <Radio
                          checked={true}
                        />
                        <p>{`${currentUser.name} ${currentUser.surname}`}</p>
                      </div>
                      <Div sx={{display: {sm: 'flex'}, gap: '10px'}}>
                        <Button
                          sx={{ width: '100%', margin: '10px auto',  }}
                          variant='contained'
                          type="submit"
                          disabled={!currentUser}>
                          Confirm
                        </Button>
                        <Button
                          sx={{ width: '100%', margin: '10px auto', backgroundColor: 'background.paper' }}
                          variant='outlined'
                          type="button"
                          onClick={() => setAnotherAccount(!AnotherAccount)}
                        >
                          {AnotherAccount ? 'Use Current Account' : 'Use Another Account'}
                        </Button>
                      </Div>

                    </form>
                  </div>
              }
              {
                (AnotherAccount || !currentUser) &&
                  <Login/>
              }
            </Collapse>
          </Item>
          <Item>
            <p>Nouveau sur Inspire ?</p>
            {!expanded.register &&
            <Button
              variant='outlined'
              onClick={() => handleExpandClick(IdType.register)}
              sx={{width: '100%', backgroundColor: 'background.paper'}}
            >
              S&apos;inscrire
            </Button>}
            <Collapse in={expanded.register} timeout="auto" unmountOnExit>
              <Register/>
            </Collapse>
          </Item>
        </Grid>
        <Grid item xs={12} sm={10} md={4} lg={3}>
          <Item>
            <div className="pro-data-header">
              <div style={{display: 'flex'}}>
                <img src={pic} alt="" className='pro-img-circle'/>
                <p>{`${practicianData.prenom} ${practicianData.nom}`}</p>
              </div>
            </div>
            <p><b>{appointmentData.nom}</b></p>
            <p>{practicianData.rue}</p>
            <p>{`${practicianData.codeP} ${practicianData.ville}`}</p>
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

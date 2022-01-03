import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Alert, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import pic from '../../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';
import axios from 'axios';
import authService from '../../../auth.service';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: 'black',
  display: 'block',
  marginTop: theme.spacing(2),
  backgroundColor: '#f0fafe'
}));

const Confirmation = ({practicianData}) => {
  const [searchParams] = useSearchParams();
  const [appointmentData, setappointmentData] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [success, setsuccess] = useState(false);
  useEffect(() => {
    const paramsToObject = Object.fromEntries(new URLSearchParams(searchParams));
    const paramsFiltered = Object.keys(paramsToObject)
      .filter(key => key !== 'active')
      .reduce((cur, key) => { return Object.assign(cur, { [key]: paramsToObject[key] });}, {});
    setappointmentData(paramsFiltered);
    const user = authService.getCurrentUser();
    if(user){
      setcurrentUser(user);
    }
  }, []);

  const handleConfirm = () => {
    const email = currentUser.mail;
    const date = `${appointmentData.day} ${appointmentData.date} ${appointmentData.time}`;
    axios.post('http://localhost:2021/sendemail', {email, date})
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setsuccess(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={12} sm={10} md={7} lg={8}>
          <Item>
            {success &&
            <Alert severity='success'> Appointment is confirmed. Check your email to add to calendar</Alert>
            }
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
            <button className="button2" onClick={handleConfirm}>
              Confirm
            </button>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

Confirmation.propTypes = {
  practicianData: PropTypes.object,
};

export default Confirmation;

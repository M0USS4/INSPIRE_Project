import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {  Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import authService from '../../helpers/auth.service';
import Button from '@mui/material/Button';
import CollapsableAlert from '../../shared/CollapsableAlert';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'block',
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.secondary.contrastText
}));

const Confirmation = ({practicianData}) => {
  const [searchParams] = useSearchParams();
  const [appointmentData, setappointmentData] = useState({});
  const [currentUser, setcurrentUser] = useState({});
  const [success, setsuccess] = useState(null);
  const [open, setopen] = useState(false);
  const [message, setmessage] = useState('');
  let navigate = useNavigate();

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
    if(currentUser.type === 1){
      setsuccess(false);
      setmessage('You cannot create an appointment with a pro account');
      setopen(true);
    }
    else{
      const startTime = Number(appointmentData.time_raw);
      const endTime = Number(appointmentData.time_raw) + 1;
      const startDate = `${appointmentData.fulldate} ${startTime + ':00'}`;
      const endDate = `${appointmentData.fulldate} ${endTime + ':00'}`;
      axios.post('http://localhost:2021/pro/appt/create', {
        appointmentType: appointmentData.type_id,
        clientId: currentUser.user.idUser,
        proId: practicianData.pro_id,
        proMail: practicianData.mail,
        start: startDate,
        end: endDate,
      })
        .then(response => {
          if (response.data) {
            navigate( {
              pathname: `/clients/${currentUser.user.idUser}/my-appoinments`,
            });
          }
        })
        .catch(error => {
          console.log(error);
          setsuccess(false);
          setmessage('Could not create Appointment');
          setopen(true);
        });
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
      >
        <Grid item xs={12} sm={10} md={10} lg={8}>
          <Item>
            {!success && <CollapsableAlert
              open={open}
              setopen={setopen}
              message={message}
              severity={success? 'success' : 'error'}
            />
            }
            <div className="pro-data-header">
              <div style={{display: 'flex'}}>
                <img src={practicianData.img} alt="" className='pro-img-circle'/>
                <p>{`${practicianData.prenom} ${practicianData.nom}`}</p>
              </div>

            </div>
            <p><b>{appointmentData.type}</b></p>
            <p>{practicianData.address}</p>
            <p>{`${practicianData.rue} ${practicianData.ville}`}</p>
            <p>{`${appointmentData.day} ${appointmentData.date}`}</p>
            <p>{appointmentData.time_formatted}</p>
            <p>{`Price: ${appointmentData.price} Duration: ${appointmentData.duration}`}</p>
            <Button
              variant='contained'
              sx={{width: '100%'}}
              onClick={handleConfirm}>
              Confirm
            </Button>
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

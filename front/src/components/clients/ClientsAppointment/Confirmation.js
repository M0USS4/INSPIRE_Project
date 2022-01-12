import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {  Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import authService from '../../helpers/auth.service';
import Button from '@mui/material/Button';

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
  let navigate = useNavigate();

  // const [success, setsuccess] = useState(false);
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
    console.log(practicianData);
  }, []);

  const handleConfirm = () => {
    const email = currentUser.mail;
    // const date = `${appointmentData.day} ${appointmentData.date} ${appointmentData.time}`;
    // axios.post('http://localhost:2021/sendemail', {email, date})
    //   .then(response => {
    //     if (response.data) {
    //       console.log(response.data);
    //       setsuccess(true);
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    console.log(email);
    console.log(appointmentData.datetime);
    console.log(`${appointmentData.fulldate}T${appointmentData.time_raw}`);
    const startTime = Number(appointmentData.time_raw);
    const endTime = Number(appointmentData.time_raw) + 1;
    const startDate = `${appointmentData.fulldate} ${startTime + ':00'}`;
    const endDate = `${appointmentData.fulldate} ${endTime + ':00'}`;

    console.log(startDate);

    axios.post('http://localhost:2021/pro/appt/create', {
      appointmentType: appointmentData.type_id,
      clientId: currentUser.idUser,
      proId: practicianData.pro_id,
      proMail: practicianData.mail,
      start: startDate,
      end: endDate,
    })
      .then(response => {
        if (response.data) {
          console.log(response.data);
          navigate( {
            pathname: `/clients/${currentUser.idUser}/my-appoinments`,
          });
          // setsuccess(true);
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
            {/* {success &&
            <Alert severity='success'> Appointment is confirmed. Check your email to add to calendar</Alert>
            } */}
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
            <p>{appointmentData.time}</p>
            <p>{`Price: ${appointmentData.price} Duration: ${appointmentData.duration}`}</p>
            <Button className="button2" onClick={handleConfirm}>
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

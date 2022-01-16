import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {  Button, Grid, IconButton, Link, TextareaAutosize, Typography } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { Controller, useForm } from 'react-hook-form';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: 'black',
  display: 'block',
  marginTop: theme.spacing(2),
  backgroundColor: '#f0fafe',
  width: '100%'
}));
const MyAppointments = () => {
  const params = useParams();
  const [clientAppointments, setclientAppointments] = useState([]);
  const [selectedAppointment, setselectedAppointment] = useState({});
  const [edit, setedit] = useState(false);
  const ratingValue = 4.5;
  const { handleSubmit , control  } = useForm();

  useEffect(() => {
    axios.get('http://localhost:2021/client/appt/all/v2',{
      params: {
        client_id: params.id
      }
    })
      .then(response => {
        setclientAppointments(response.data);
        setselectedAppointment(response.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleUpdate = (data) => {
    axios.post('http://localhost:2021/client/appt/update', {
      'idClient':selectedAppointment.id_client,
      'idPro':selectedAppointment.id_pro,
      'note_client':data.note_client,
      'rating':data.rating,
    })
      .then(response => {
        if (response.data) {
          setedit(false);
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
        <Grid item xs={11} sm={11} md={5.5} lg={4}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
          >
            {
              clientAppointments.map((appointment, index) => (
                <Grid key={index} item>
                  <Item>
                    <div className="pro-data-header">
                      <div style={{display: 'flex'}}>
                        <img src={appointment.img} alt="" className='pro-img-circle'/>
                        <p>{`${appointment.prenom} ${appointment.nom_pro}`}</p>
                      </div>
                      <Button
                        variant="contained"
                        endIcon={<VisibilityIcon />}
                        onClick={() => setselectedAppointment(appointment)}
                      >
                        View
                      </Button>
                    </div>
                    <p><b>{appointment.nom_type}</b></p>
                    <p>{`${appointment.rue} ${appointment.ville}`}</p>
                    <p>{`${new Date(appointment.appt_dateStart)}`}</p>
                    {/* <p>{appointmentData.time}</p> */}
                    <p>{`Price: ${appointment.price} Duration: ${appointment.duration}`}</p>
                  </Item>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
        <Grid item xs={11} sm={11} md={5.5} lg={7}>
          <Item >
            <div className="profile-header-container">
              <div className="profile-header-basic">
                <img src={selectedAppointment.img} alt="" />
                <div className="header-basic-info">
                  <h3>{`${selectedAppointment.prenom} ${selectedAppointment.nom_pro}`}</h3>
                  <span className="header-basic-info-sub-title">{selectedAppointment.nom_type}</span>
                  {/* <span className="header-basic-info-sub-title">{selectedAppointment.nom_medicine}</span> */}
                  <Rating
                    className="rating"
                    name="text-feedback"
                    value={ratingValue}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  <div>
                    <Link href="" style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}><LocationOnIcon fontSize='small'/>{selectedAppointment.rue}</Link>
                  </div>
                </div>
              </div>
              <div className="profile-header-other"></div>
            </div>
            <div style={{margin: '10px auto' }}>
              <Typography
                sx={{ flex: '1 1 100%', color: '#009ba4' }}
                variant="h5"
                component="div"
              >
                {'Professional’s prescription and recommendations:'}
              </Typography>
              <Typography
                sx={{ flex: '1 1 100%' }}
                variant="body1"
                component="div"
              >
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua.`}
              </Typography>
            </div>
            <div style={{margin: '10px auto' }}>
              <Typography
                sx={{ flex: '1 1 100%', color: '#009ba4' }}
                variant="h5"
                component="div"
              >
                {'My Notes'}
              </Typography>
              <Controller
                name="note_client"
                control={control}
                defaultValue=""
                rules={{ required: 'Notes required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextareaAutosize
                    value={value? value : selectedAppointment.note_client}
                    onChange={onChange}
                    aria-label="maximum height"
                    style={{ width: '100%' }}
                    className='appointment-textarea'
                    disabled={!edit}
                    sx={{border: error ? '1px solid red' : 'none'}}
                  />
                )}
              />

            </div>
            <div style={{margin: '10px auto' }}>
              <Typography
                sx={{ flex: '1 1 100%', color: '#009ba4' }}
                variant="h5"
                component="div"
              >
                {'My Rating'}
              </Typography>
              <Controller
                name="rating"
                control={control}
                defaultValue=""
                rules={{ required: 'Rating required' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Rating
                    name="simple-controlled"
                    value={value || selectedAppointment.rating}
                    onChange={onChange}
                    disabled={!edit}
                    sx={{border: error ? '1px solid red' : 'none'}}
                  />
                )}
              />
            </div>
            <IconButton aria-label="delete" size="large" onClick={() => setedit(true)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
            {
              edit &&  <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmit(handleUpdate)}
              >
              Update
              </Button>
            }

          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyAppointments;

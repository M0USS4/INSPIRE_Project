import { Avatar, Card } from '@mui/material';
import React from 'react';
import data from '../../data/data';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MyClients = () => {
  return (
    <div>
      <h1>Clients</h1>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {data.map((appointment, index) => (
          <Grid item xs={2} sm={4} md={4} key={index} >
            <Item >
              <Avatar sx={{ bgcolor: 'lightblue', marginTop: '20px' }}>N</Avatar>
              <div className="card-content">
                <h4>{appointment.name}</h4>
                <span>{appointment.start.toDateString()}</span>
              </div>
            </Item>
          </Grid>
        ))}
      </Grid>
      {data.map(appointment => (
        <Card key={appointment.id} className="card">
          <Avatar sx={{ bgcolor: 'lightblue', marginTop: '20px' }}>N</Avatar>
          <div className="card-content">
            <h4>{appointment.name}</h4>
            <span>{appointment.start.toDateString()}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MyClients;
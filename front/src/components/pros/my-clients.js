import { Avatar, Card } from '@mui/material';
import React from 'react';
import data from '../../data/data';

const MyClients = () => {
  return (
    <div>
      <h1>Clients</h1>
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
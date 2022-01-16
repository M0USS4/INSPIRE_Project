import React from 'react';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@mui/material/styles';
import {  useForm } from 'react-hook-form';
import { Button, Chip,  } from '@mui/material';
import axios from 'axios';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const AppoinmentTypes = ({appointmentTypes, setappointmentTypes, practicianData}) => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const onSubmit = (data) => {
    const appt = {
      ...data,
      public: false,
      id_pro : practicianData.pro_id
    };
    console.log(appt);

    axios.post('http://localhost:2021/pro/apptType/create', appt)
      .then(() => {
        setappointmentTypes([...appointmentTypes, appt]);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <Item>
          Appointment Types
        <div
          className="tags"
        >
          {
            appointmentTypes.map((type, index) => (
              <ListItem key={'a'+index}>
                <Chip
                  onDelete={() =>
                    setappointmentTypes(appointmentTypes.filter(appointment => appointment.nom !== type.nom))}
                  label={type.nom}
                  style={{backgroundColor: '#abe4e7'}}
                />
              </ListItem>

            ))
          }
        </div>
        <div style={{margin: '10px'}}>
          <input
            className="form-control"
            type="text"
            placeholder="Enter appointmentType"
            name="nom"
            style={{border: errors.nom ? '1px solid red' : ''}}
            {...register('nom', { required: true, minLength: 2 })}
          />
        </div>

        <div style={{margin: '10px'}}>
          <input
            className="form-control"
            type="number"
            min={10}
            max={180}
            placeholder="Enter duration"
            name="duration"
            style={{border: errors.duration ? '1px solid red' : ''}}
            {...register('duration', { required: true, maxLength: 30, minLength: 2 })}
          />
        </div>

        <div style={{margin: '10px'}}>
          <input
            className="form-control"
            type="number"
            min={10}
            max={500}
            placeholder="Enter price"
            name="price"
            style={{border: errors.price ? '1px solid red' : ''}}
            {...register('price', { required: true, maxLength: 30, minLength: 2 })}

          />
        </div>

        <div style={{margin: '10px'}}>
          <input
            className="form-control"
            type="datetime-local"
            placeholder="Enter startDate"
            min={new Date().toISOString()}
            name="startDate"
            style={{border: errors.startDate ? '1px solid red' : ''}}
            {...register('startDate', { required: true })}

          />
        </div>

        <div style={{margin: '10px'}}>
          <input
            className="form-control"
            type="datetime-local"
            placeholder="Enter endDate"
            min={new Date().toISOString()}
            name="endDate"
            style={{border: errors.endDate ? '1px solid red' : ''}}
            {...register('endDate', { required: true })}

          />
        </div>

        <Button onClick={handleSubmit(onSubmit)}>Add Appointment Type</Button>
      </Item>
    </div>
  );
};

AppoinmentTypes.propTypes = {
  appointmentTypes: PropTypes.array,
  setappointmentTypes: PropTypes.func,
  practicianData: PropTypes.object,
};

export default AppoinmentTypes;

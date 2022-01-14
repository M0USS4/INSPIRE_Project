/* eslint-disable no-useless-escape */
import {React, useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { Button, Chip } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Availability from './Availability';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Customization = () => {
  const params = useParams();

  const [practicianData, setpracticianData] = useState({});
  const [appointmentTypes, setappointmentTypes] = useState([]);
  const [motifValue, setmotifValue] = useState('');
  const [scheduleDays, setscheduleDays] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get('http://localhost:2021/getProDetailed',{
      params: {
        pro_id: params.id
      }
    })
      .then(response => {
        setpracticianData(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://localhost:2021/getAppointmentTypes',{
      params: {
        pro_id: params.id
      }
    })
      .then(response => {
        setappointmentTypes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    init();
  }, [practicianData]);

  const init = () => {
    if(practicianData.availability){
      const availability = JSON.parse(practicianData.availability);
      setscheduleDays(availability);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleChange = (e) => {
    setmotifValue(e.target.value);
  };

  return (
    <div className="profile-settings">
      <Item>
                  About
        <div className={`basic-info-container ${errors.firstname ? 'invalid' : ''}`}>
          <label htmlFor="about"><b>Description</b></label>
          <textarea
            name="about"
            placeholder="Enter Description"

            rows="7"
            {...register('firstname', { required: true, maxLength: 30, minLength: 2 })}
          >
          </textarea>

        </div>
      </Item>

      <Item>
          Appointment Types
        <div className="tags">
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
        <input
          className="form-control"
          type="text"
          placeholder="Enter Motif"
          name="motif"
          {...register('motif', { required: true, maxLength: 30, minLength: 2 })}

          value={motifValue}
          onChange={event => handleChange(event)}
          onKeyPress={event => {
            if(event.key === 'Enter'){
              setappointmentTypes([...appointmentTypes, event.target.value]);
              setmotifValue('');
            }
          }}
        />
      </Item>
      {scheduleDays.length && <Availability scheduleDays={scheduleDays}/>}
      <Button onClick={handleSubmit(onSubmit)} variant='contained'>Update</Button>

    </div>
  );
};
export default Customization;

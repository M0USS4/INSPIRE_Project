/* eslint-disable no-useless-escape */
import {React, useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
// import { Controller, useForm } from 'react-hook-form';
import { Button, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Availability from './Availability';
import AppoinmentTypes from './AppoinmentTypes';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

// const ListItem = styled('li')(({ theme }) => ({
//   margin: theme.spacing(0.5),
// }));

const Customization = () => {
  const params = useParams();

  const [practicianData, setpracticianData] = useState({});
  const [appointmentTypes, setappointmentTypes] = useState([]);
  const [scheduleDays, setscheduleDays] = useState([]);
  const [description, setdescription] = useState('');
  // const { register, handleSubmit, formState: { errors }, control } = useForm();

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
  }, []);

  useEffect(() => {
    axios.get('http://localhost:2021/getAppointmentTypes',{
      params: {
        pro_id: params.id,
        nom_medicine: practicianData.nom_medicine
      }
    })
      .then(response => {
        console.log(response.data);

        setappointmentTypes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    init();
  }, [practicianData]);

  const init = () => {
    if(practicianData.availability){
      const availability = JSON.parse(practicianData.availability);
      setscheduleDays(availability);
    }
  };

  const onSubmit = () => {
    const data = {
      description: description,
      availability: JSON.stringify(scheduleDays),
      id_pro: practicianData.pro_id
    };
    console.log(data);
    axios.post('http://localhost:2021/pro/customization', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="profile-settings">
      <Item>
                  About
        {/* <div className={`basic-info-container ${errors.desc ? 'invalid' : ''}`}>
          <label htmlFor="desc"><b>Description</b></label>
          <textarea
            name="desc"
            placeholder="Enter Description"

            rows="7"
            {...register('desc', { required: true })}
          >
          </textarea>

        </div> */}
        {practicianData &&
            <TextareaAutosize
              // value={description ? description : practicianData.description}
              defaultValue={practicianData.description}
              onChange={(e) => setdescription(e.target.value)}
              minRows={3}
              style={{ width: '100%' }}
              className='appointment-textarea'
            />
        }
      </Item>
      {appointmentTypes &&
      <AppoinmentTypes
        appointmentTypes={appointmentTypes}
        setappointmentTypes={setappointmentTypes}
        practicianData={practicianData} />
      }
      {scheduleDays.length &&
      <Availability scheduleDays={scheduleDays} setscheduleDays={setscheduleDays}/>
      }
      <Button onClick={onSubmit} variant='contained'>Update</Button>

    </div>
  );
};
export default Customization;

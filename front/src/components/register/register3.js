import { Button, Paper, Select } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';

const Register3 = ({data, setdata, setActiveStep, handleBack}) => {
  const [autoCompleteData, setautoCompleteData] = useState([]);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [openList, setopenList] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const autoComplete = (data) => {
    const query = `${data.number} ${data.street} ${data.postal} ${data.city}`;
    axios.get(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=housenumber&autocomplete=0`)
      .then(response => {
        setautoCompleteData(response.data.features);
        if(response.data.features){
          setopenList(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setselectedAddress(e.target.value);
    setopenList(false);
  };

  const handleNext = () => {
    const registerData = {
      type: 1,
      login: {
        mail: data.email,
        password: data.password,
        password_v: data.confirm_password,
      },
      user: {
        name: data.firstname,
        surname: data.lastname,
        phone: data.phone,
        birth: data.dateofBirth,
        adress: {
          number: data.number,
          street: data.street,
          postalC: data.postal,
          city: data.city,
          supp: data.add,
          coordinates: selectedAddress.geometry.coordinates,
        },
        practice: data.practice
      }
    };
    setdata(registerData);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <div>
      <div className="register-fields">
        <div className={`field-container ${errors.city ? 'invalid' : ''}`}>
          <label htmlFor="city"><b>City</b></label>
          <input
            type="text"
            placeholder="City..."
            name="city"
            className='form-control'
            {...register('city', { required: true, maxLength: 40, minLength: 2 })}
          />
        </div>

        <div className={`field-container ${errors.postal ? 'invalid' : ''}`}>
          <label htmlFor="postal"><b>Postal Code</b></label>
          <input
            type="text"
            placeholder="Postal adresse..."
            name="postal"
            className='form-control'
            {...register('postal', { required: true, maxLength: 40, minLength: 2 })}
          />
        </div>

        <div className={`field-container ${errors.number ? 'invalid' : ''}`}>
          <label htmlFor="street"><b>Apartment No</b></label>
          <input
            type="number"
            placeholder="Apartment No..."
            name="number"
            className='form-control'
            {...register('number', { required: true, maxLength: 40, minLength: 2 })}
          />
        </div>

        <div className={`field-container ${errors.street ? 'invalid' : ''}`}>
          <label htmlFor="street"><b>Street</b></label>
          <input
            type="text"
            placeholder="Street..."
            name="street"
            className='form-control'
            {...register('street', { required: true, maxLength: 30, minLength: 2 })}
          />
        </div>
        <div>
        </div>
      </div>
      <Paper
        component="form"
        sx={{  display: 'flex', alignItems: 'center', height: 50, border: 'none', boxShadow: 'none', ml: '10px' }}
      >
        <Select
          open={openList}
          sx={{ ml: 1, flex: 1, border: 'none', height: 40 }}
          //   value="one"
          //   options={autoCompleteData.map(data => data.properties.label)}
          onChange={(e) =>handleChange(e)}
          onClick={() => setopenList(!openList)}
          openOnFocus={autoCompleteData.length}
          autofocus={autoCompleteData.length}
        >
          {autoCompleteData.map((data, index) => (
            <MenuItem key={index} value={data}>{data.properties.label}</MenuItem>

          ))}
        </Select>
        <Button
          variant="contained"
          sx={{ height: 40, flex: 0.3 }}
          onClick={handleSubmit(autoComplete)}
        >Find Address</Button>
      </Paper>

      <div style={{display: 'flex', justifyContent: 'center', margin: '10px', gap: '10px'}}>
        <Button onClick={handleBack}>Back</Button>
        <Button variant='contained' type="button" onClick={handleNext} disabled={!selectedAddress}>Next Step</Button>
      </div>
    </div>

  );
};

Register3.propTypes = {
  data: PropTypes.object,
  setdata: PropTypes.func,
  activeStep: PropTypes.number,
  setActiveStep: PropTypes.func,
  handleBack: PropTypes.func,
};
export default Register3;

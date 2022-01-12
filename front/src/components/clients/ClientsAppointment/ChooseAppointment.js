import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Picker from '../../shared/Picker/Picker';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ChooseAppointment = ({practicianData, handleRdv, setappointmentType,
  appointmentType, appointmentTypes, eventList}) => {
  const [address, setaddress] = useState('');
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => {
    setaddress(`${practicianData.rue}, ${practicianData.ville}`);
    console.log('working');
  }, []);
  return (
    <div style={{margin: '15px'}}>
      <div style={{marginTop: '15px'}}>
        <label htmlFor="" style={{marginTop: '15px'}}> <LocationOnIcon sx={{color: '#009ba4'}}/> Location</label>
        <input type="text" className="form-control"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        />
      </div>
      <div style={{marginTop: '15px'}}>
        <label htmlFor="" tyle={{marginTop: '15px'}}> <BookOnlineIcon sx={{color: '#009ba4'}}/> Appointment type</label>
        <select className='form-control'
          value={appointmentType || ''}
          onChange={(e) => setappointmentType(e.target.value)}>
          {appointmentTypes && appointmentTypes.map((appointment, index) => (
            <option key={index}>{appointment.nom}</option>
          ))}
        </select>
      </div>
      <br/>
      {useMediaQuery(theme.breakpoints.up('sm')) &&
      <Picker
        practicianData={practicianData}
        columns={7}
        filter={4}
        handleRdv={handleRdv}
        selectedType={appointmentType}
        eventList={eventList}
      />
      }
      {useMediaQuery(theme.breakpoints.between('xs', 'sm')) &&
      <Picker
        practicianData={practicianData}
        columns={3}
        filter={4}
        handleRdv={handleRdv}
        selectedType={appointmentType}
        eventList={eventList}
      />
      }
    </div>
  );
};

ChooseAppointment.propTypes = {
  practicianData: PropTypes.object,
  handleRdv: PropTypes.func,
  setappointmentType: PropTypes.func,
  appointmentType: PropTypes.string,
  appointmentTypes: PropTypes.array,
  eventList: PropTypes.array,
};

export default ChooseAppointment;

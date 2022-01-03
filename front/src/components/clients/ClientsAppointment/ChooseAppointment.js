import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Picker from '../../shared/Picker';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ChooseAppointment = ({practicianData, handleRdv, setappointmentType, appointmentType}) => {
  const [address, setaddress] = useState('');
  const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up('md'));
  useEffect(() => {
    setaddress(`${practicianData.address}, ${practicianData.city}`);
  }, []);
  return (
    <div>
      <div>
        <label htmlFor=""> <LocationOnIcon/> Location</label>
        <input type="text" className="form-control"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor=""> <BookOnlineIcon/> Appointment type</label>
        <select className='form-control'
          value={appointmentType || ''}
          onChange={(e) => setappointmentType(e.target.value)}>
          {practicianData && practicianData.appointmentTypes.map((appointment, index) => (
            <option key={index}>{appointment.type}</option>
          ))}
        </select>
      </div>

      {useMediaQuery(theme.breakpoints.up('sm')) &&
      <Picker practicianData={practicianData} columns={7} filter={4} handleRdv={handleRdv}/>
      }
      {/* {useMediaQuery(theme.breakpoints.between('sm', 'md')) &&
      <Picker practicianData={practicianData} columns={4} filter={4} handleRdv={handleRdv}/>
      } */}
      {useMediaQuery(theme.breakpoints.between('xs', 'sm')) &&
      <Picker practicianData={practicianData} columns={3} filter={4} handleRdv={handleRdv}/>
      }
    </div>
  );
};

ChooseAppointment.propTypes = {
  practicianData: PropTypes.object,
  handleRdv: PropTypes.func,
  setappointmentType: PropTypes.func,
  appointmentType: PropTypes.string
};

export default ChooseAppointment;

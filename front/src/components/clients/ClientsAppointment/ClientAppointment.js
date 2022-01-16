import React , { useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ChooseAppointment from './ChooseAppointment';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Identification from './Identification';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Confirmation from './Confirmation';
import axios from 'axios';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '90%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  // color: 'black',
  margin: '5px'
}));

const steps = [
  'Reserve slot',
  'Identification',
  'Confirmation',
];
const ClientAppointment = ({selectedType}) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const getActive = searchParams.get('active');
  const [activeStep, setActiveStep] = useState(getActive | 0);
  const [practicianData, setpracticianData] = useState();
  const [appointmentTypes, setappointmentTypes] = useState();
  const [appointmentData, setappointmentData] = useState( {});
  const [appointmentType, setappointmentType] = useState(selectedType | '');
  const [eventList, seteventList] = useState([]);

  const params = useParams();

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
    if(practicianData){
      axios.get('http://localhost:2021/getAppointmentTypes',{
        params: {
          pro_id: params.id,
          nom_medicine: practicianData.nom_medicine
        }
      })
        .then(response => {
          setappointmentTypes(response.data);
          if(response.data.length){
            setappointmentType(response.data[0].nom);
          }
        })
        .catch(error => {
          console.log(error);
        });

      axios.get('http://localhost:2021/pro/appt/all/v2',{
        params: {
          pro_id: params.id
        }
      })
        .then(response => {
          const data = response.data.map(event => {
            return {
              start: new Date(event.date_start),
              end: new Date(event.date_end),
              title: 'Testing',
              status: event.status.data[0] === 0 ? false : true
            };
          });
          seteventList(data);
        })
        .catch(error => {
          console.log(error);
        });
      const paramsToObject = Object.fromEntries(new URLSearchParams(searchParams));
      const paramsFiltered = Object.keys(paramsToObject)
        .filter(key => key !== 'active')
        .reduce((cur, key) => { return Object.assign(cur, { [key]: paramsToObject[key] });}, {});
      setappointmentData(paramsFiltered);
    }
  }, [practicianData]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRdv = (id,day, date, time_raw, time_formatted, fulldate) => {
    const type = appointmentType ?
      appointmentTypes.find(appointment => appointment.nom === appointmentType)
      : appointmentTypes.find(appointment => appointment);
    setappointmentType(type.nom);
    const appointmentDataTemp = {
      id: id,
      day: day,
      date: date,
      fulldate: fulldate,
      time_raw: time_raw,
      time_formatted:time_formatted,
      type: type.nom,
      type_id: type.id,
      duration: type.duration,
      price: type.price
    };
    const queryString = Object.keys(appointmentDataTemp).map(key => key + '=' + appointmentDataTemp[key]).join('&');
    setappointmentData(appointmentDataTemp);
    console.log(appointmentData);
    navigate({
      pathname: `/practician/${params.id}/booking`,
      search: `?active=1&${queryString}`,
    });
    handleNext();
  };

  return (
    <Root>
      <Item sx={{ width: '100%' }} >
        <Stepper activeStep={activeStep} alternativeLabel className="booking-stepper">
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 &&
          practicianData &&
          <ChooseAppointment
            practicianData={practicianData}
            handleRdv={handleRdv}
            setappointmentType={setappointmentType}
            appointmentType={appointmentType}
            appointmentTypes={appointmentTypes}
            eventList={eventList}
          />
        }
        {activeStep === 1 &&
          practicianData &&
          <Identification practicianData={practicianData} handleNext={handleNext}/>
        }
        {activeStep === 2 &&
          practicianData &&
          <Confirmation practicianData={practicianData} handleNext={handleNext}/>
        }
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
              Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Item>
    </Root>
  );
};

ClientAppointment.propTypes = {
  setselectedType: PropTypes.func,
  selectedType: PropTypes.string
};
export default ClientAppointment;

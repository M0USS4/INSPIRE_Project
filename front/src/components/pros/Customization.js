/* eslint-disable no-useless-escape */
import {React, useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import TimeslotsDialog from '../shared/TimeslotsDialog';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'black',
  marginBottom: theme.spacing(3),
}));

const addButtonStyle = {
  border: 'none',
  background: 'none',
  textTransformation: 'none',
  boxShadow: 'none',
  color: '#009ba4'
};

const removeButtonStyle = {
  color: 'red'
};

const Customization = () => {
  const [motifs, setmotifs] = useState([]);
  const [motifValue, setmotifValue] = useState('');
  const [scheduleDays, setscheduleDays] = useState([]);
  const [currentDay, setcurrentDay] = useState([]);
  const [currentTimeslots, setcurrentTimeslots] = useState([
    {
      start: 0,
      end: 0
    }
  ]
  );
  const [openTimeslotEdit, setopenTimeslotEdit] = useState(false);
  const [experiences, setexperiences] = useState([{
    hospital: '1',
    from: '',
    to: '',
    location: ''
  }]);
  const [startTimes, setstartTimes] = useState([]);
  const [openRangeErrorAlert, setopenRangeErrorAlert] = useState(false);
  const [rangeErrorMessage, setrangeErrorMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const mot = ['Ostéopathie du sport', 'Ostéopathie de la femme enceinte', 'Ostéopathie biodynamique'];
    setmotifs(mot);
    handleDays();
  }, [experiences]);

  useEffect(() => {
    handleTimeslots();

  }, [currentTimeslots]);

  const handleDays = () => {
    const days = moment.weekdays();
    const daysSchedule = [];
    days.forEach(day => {
      let timeslots = {
        day: day,
        timeslots: [
          {
            start: 9,
            end: 13
          },
          {
            start: 14,
            end: 17
          }
        ]
      };
      daysSchedule.push(timeslots);
    });
    setscheduleDays(daysSchedule);
    setcurrentDay(daysSchedule[0].day);
    setcurrentTimeslots(daysSchedule[0].timeslots);
    handleTimeslots();

  };
  const handleTimeslots = () => {
    let updatedCurrentTimeslots = [];
    let tempCurrentTimeslots = [...currentTimeslots];
    for(let i = 0; i < 24; i++){
      updatedCurrentTimeslots.push({
        time: i,
        status: false
      });
    }

    tempCurrentTimeslots.map(time => {
      for(let j = time.start; j <= time.end; j++){
        updatedCurrentTimeslots.forEach(t => {
          if(t.time === j){
            t.status = true;
            // console.log(j);

          }
        });
      }
    });
    // console.log(updatedCurrentTimeslots);
    setstartTimes(updatedCurrentTimeslots);
  };
  const checkTimeslotReccursion = (time) => {
    let updatedCurrentTimeslots = [];
    let find;
    let find2;
    for(let i = 0; i < 24; i++){
      updatedCurrentTimeslots.push({
        time: i,
        status: false
      });
    }

    for(let j = time.start; j <= time.end; j++){
      find = startTimes.some(t => t.time === j);
      find2 = startTimes.find(t =>
      {
        return t.time === j && t.status === true;
      });
      console.log(find2);
    }
    return find;
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleChange = (e) => {
    setmotifValue(e.target.value);
  };

  let handleAddExperiences = (i, e) => {
    let newFormValues = [...experiences];
    newFormValues[i][e.target.name] = e.target.value;
    setexperiences(newFormValues);
  };

  let handleAddTimeslots = (i, e) => {
    let newFormValues = [...currentTimeslots];
    if(e.target.name === 'start'){
      newFormValues[i][e.target.name] = Number(e.target.value);
      newFormValues[i]['end'] = Number(e.target.value) + 1;
    }
    else{
      const currentTimeslot = {
        start: newFormValues[i]['start'],
        end: newFormValues[i]['end']
      };
      const check = checkTimeslotReccursion(currentTimeslot);
      if(check){
        setrangeErrorMessage('Time range already taken');
        setopenRangeErrorAlert(true);
      }
      else newFormValues[i][e.target.name] = Number(e.target.value);
    }
    setcurrentTimeslots(newFormValues);

  };

  let addFormFields = () => {
    setexperiences([...experiences, {
      hospital: '',
      from: '',
      to: '',
      location: ''
    }]);
  };

  let addTimeslotFormFields = () => {
    const availableTime = startTimes.find(timeslot => timeslot.status === false);
    if(availableTime){
      const tempCurrentTimeslots = [...currentTimeslots, {
        start: availableTime.time,
        end: availableTime.time + 1
      }];
      setcurrentTimeslots(tempCurrentTimeslots);
    }
    else{
      setrangeErrorMessage('No timeslot left');
      setopenRangeErrorAlert(true);
    }
    setopenTimeslotEdit(true);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...experiences];
    newFormValues.splice(i, 1);
    setexperiences(newFormValues);
  };

  let removeTimeslotFormFields = (i) => {
    let newFormValues = [...currentTimeslots];
    newFormValues.splice(i, 1);
    setcurrentTimeslots(newFormValues);
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
          {motifs.map((motif, index) => (
            <span className="tag" key={index}>
              {motif}<CancelIcon onClick={() => setmotifs(motifs.filter(mot => mot !== motif))}/>
            </span>
          ))}
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
              setmotifs([...motifs, event.target.value]);
              setmotifValue('');
            }
          }}
        />
      </Item>
      <Item>
          Schedule
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          { scheduleDays && scheduleDays.map((schedule, index) => (
            <Grid item  className="schedule_days" key={index}>
              <div className="button2" onClick={() => setcurrentTimeslots(schedule.timeslots)}>
                {schedule.day}
              </div>
            </Grid>
          ))}
        </Grid>
        <div className="timeslot-container">
          Time Slots
          <LoadingButton
            onClick={() => addTimeslotFormFields()}
            endIcon={<AddCircleOutlineIcon />}
            loading={false}
            loadingPosition="end"
            variant="contained"
            style={addButtonStyle}
          >
        add slot
          </LoadingButton>
        </div>
        <Grid className="timeslot-contents" container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          {currentTimeslots && currentTimeslots.map((timeslot, index) => (
            timeslot.start && <Grid item  key={index} className="schedule_days" >
              <div className="button1" >
                {`${timeslot.start} - ${timeslot.end}`}
                <CancelIcon
                  onClick={() =>
                    setcurrentTimeslots(
                      currentTimeslots.filter(time => time !== currentTimeslots))
                  } />
              </div>
            </Grid>

          ))}
        </Grid>
        {currentTimeslots && <TimeslotsDialog
          open={openTimeslotEdit}
          currentDay={currentDay}
          currentTimeslots={currentTimeslots}
          handleAddTimeslots={handleAddTimeslots}
          addTimeslotFormFields={addTimeslotFormFields}
          removeTimeslotFormFields={removeTimeslotFormFields}
          setopenRangeErrorAlert={setopenRangeErrorAlert}
          openRangeErrorAlert={openRangeErrorAlert}
          startTimes={startTimes}
          rangeErrorMessage={rangeErrorMessage}
        />}
      </Item>
      <Item>
          Experience
        { experiences && experiences.map((experience, index) => (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} key={index}>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.hospital ? 'invalid' : ''}`}>
              {/* <div className={`field-container ${errors.lastname ? 'invalid' : ''}`}> */}
              <label htmlFor="hospital"><b>Hospital</b></label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter hospital"
                name="hospital"
                value={experience.hospital || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
              {/* </div> */}
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.location ? 'invalid' : ''}`}>
              <label htmlFor="location"><b>Location</b></label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter location"
                name="location"
                value={experience.location || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.from ? 'invalid' : ''}`}>
              <label htmlFor="from"><b>From</b></label>
              <input
                className="form-control"

                type="date"
                placeholder="Enter start date"
                name="from"
                {...register('from', { })}
                value={experience.from || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.to ? 'invalid' : ''}`}>
              <label htmlFor="to"><b>To</b></label>
              <input
                className="form-control"

                type="date"
                placeholder="Enter end Date"
                name="to"
                // {...register('to', { })}
                value={experience.to || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
              {
                index ?
                  <button
                    type="button"
                    className="button remove"
                    onClick={() => removeFormFields(index)}>Remove</button>
                  : null
              }
              {
                index ?
                  <IconButton size="large" style={removeButtonStyle} onClick={() => removeFormFields(index)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  : null
              }
            </Grid>
          </Grid>
        ))}
        <LoadingButton
          onClick={() => addFormFields()}
          endIcon={<AddCircleOutlineIcon />}
          loading={false}
          loadingPosition="end"
          variant="contained"
          style={addButtonStyle}
        >
        add more
        </LoadingButton>
        {/* <button className="button add" type="button" onClick={() => addFormFields()}>Add</button> */}

      </Item>
      <button onClick={handleSubmit(onSubmit)} className="button1">Creer un Compte</button>

    </div>
  );
};
export default Customization;

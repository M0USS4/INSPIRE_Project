import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { Button, Chip, styled } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CollapsableAlert from '../shared/CollapsableAlert';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  marginBottom: theme.spacing(3),
}));

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Availability = ({scheduleDays, setscheduleDays}) => {

  const [openRangeErrorAlert, setopenRangeErrorAlert] = useState(false);
  const [message, setmessage] = useState('');
  const [open, setopen] = useState(false);
  const [currentDay, setcurrentDay] = useState([]);
  const [availableTimes, setavailableTimes] = useState([]);
  const [timeslotStatus, settimeslotStatus] = useState([]);

  useEffect(() => {
    setcurrentDay(scheduleDays[1].id);
    setavailableTimes(scheduleDays[1].availability);
  }, [scheduleDays]);

  useEffect(() => {
    handleTimeslots();
  }, [availableTimes]);

  let handleAddTimeslots = (i, e) => {
    let newFormValues = [...availableTimes];
    if(e.target.name === 'start'){
      newFormValues[i][e.target.name] = Number(e.target.value);
      newFormValues[i]['end'] = Number(e.target.value) + 1;
    }
    else{
      const currentTimeslot = {
        start: newFormValues[i]['start'],
        end: newFormValues[i][e.target.name] = Number(e.target.value)
      };
      const check = checkTimeslotReccursion(currentTimeslot);
      if(check){
        setmessage('Time range already taken');
        setopenRangeErrorAlert(true);
      }
      else newFormValues[i][e.target.name] = Number(e.target.value);
    }
    setavailableTimes(newFormValues);

  };

  const handleTimeslots = () => {
    let updatedCurrentTimeslots = [];
    let tempCurrentTimeslots = [...availableTimes];
    console.log(tempCurrentTimeslots);

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
          }
        });
      }
    });
    settimeslotStatus(updatedCurrentTimeslots);
  };

  const checkTimeslotReccursion = (time) => {
    let find;
    console.log(time);
    for(let j = time.start; j <= time.end; j++){
      find = timeslotStatus.find(t =>
      {
        return t.time === j && t.status === true;
      });
    }
    return find;
  };

  const handleDayChange = (schedule) => {
    setcurrentDay(schedule.id);
    setavailableTimes(schedule.availability);
  };

  let addTimeslotFormFields = () => {
    const availableTime = timeslotStatus.find(timeslot => timeslot.status === false);
    if(availableTime){
      const tempCurrentTimeslots = [...availableTimes, {
        start: availableTime.time,
        end: availableTime.time + 1
      }];
      setavailableTimes(tempCurrentTimeslots);
    }
    else{
      setmessage('No timeslot left');
      setopenRangeErrorAlert(true);
    }
    setopen(true);
  };

  let removeTimeslotFormFields = (i) => {
    let newFormValues = [...availableTimes];
    newFormValues.splice(i, 1);
    setavailableTimes(newFormValues);
  };

  const handleClose = () => {
    setopen(false);
  };

  const handleSave = () => {
    let tempDaySchedule = scheduleDays;
    let index = scheduleDays.findIndex(day => day.id === currentDay);
    tempDaySchedule[index].availability = availableTimes;
    setscheduleDays(tempDaySchedule);
  };

  return (
    <div>
      <Item>
          Schedule
        <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          { scheduleDays && scheduleDays.map((schedule, index) => (
            <Grid item  className="schedule_days" key={'d'+index}>
              <Button
                variant={currentDay === schedule.id ? 'contained' : 'outlined'}
                onClick={() => handleDayChange(schedule)}>
                {schedule.id}
              </Button>

            </Grid>
          ))}
        </Grid>
        <div className="timeslot-container" style={{marginTop: '10px'}}>
          Time Slots
          <LoadingButton
            onClick={() => addTimeslotFormFields()}
            endIcon={<AddCircleOutlineIcon />}
            loading={false}
            loadingPosition="end"
          >
            add slot
          </LoadingButton>
        </div>
        {}
        <Grid
          className="timeslot-contents tags" container    >
          {availableTimes && availableTimes.map((timeslot, index) => (
            <Grid item  key={'t'+index} className="schedule_days" >
              <ListItem >
                <Chip
                  deleteIcon={<DeleteIcon />}
                  onDelete={() =>
                    setavailableTimes(
                      availableTimes.filter(time => time !== availableTimes))}
                  label={`${timeslot.start} - ${timeslot.end}`}
                  style={{backgroundColor: '#abe4e7'}}
                />
              </ListItem>
            </Grid>

          ))}
        </Grid>
        {availableTimes &&
        <div>
          <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%' } }}
            maxWidth="xs"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2 }}>
              {`Edit Timeslots for ${currentDay}`}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <CollapsableAlert
              message={message}
              setopen={setopenRangeErrorAlert}
              open={openRangeErrorAlert}
            />
            <DialogContent dividers>

              {availableTimes && availableTimes.map((timeslot, index) => (
                <div key={'s' + index} style={{margin: '10px'}}>
                  <label><em>Slot</em></label>
                  <Grid container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{alignItems: 'flex-end'}} >
                    <Grid item  className="schedule_days" key={'t' + index}>
                      <label htmlFor="start"><b>Start Time</b></label>
                      <select
                        value={timeslot.start}
                        onChange={e => handleAddTimeslots(index, e)}
                        name="start"
                        className="form-control">
                        {timeslotStatus.map( (start,i) =>
                          (<option key={i} disabled={start.status}>{start.time}</option>)
                        )}
                      </select>
                    </Grid>
                    <Grid item  className="schedule_days" key={index}>
                      <label htmlFor="end"><b>End Time</b></label>
                      <select
                        value={timeslot.end ? timeslot.end :
                          parseInt(timeslot.start) + 1 + ' : 00'}
                        onChange={e => handleAddTimeslots(index, e)}
                        name="end"
                        className="form-control">
                        {timeslotStatus.map( (end,i) =>
                          (<option key={i} disabled={end.status || timeslot.start >= end.time}>{end.time}</option>)
                        )}
                      </select>
                    </Grid>
                    <Grid item  className="schedule_days" key={index}>
                      {
                        index ?
                          <IconButton
                            size="large"
                            // style={removeButtonStyle}
                            sx={{color: 'red'}}
                            onClick={() => removeTimeslotFormFields(index)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                          : null
                      }
                    </Grid>
                  </Grid>
                </div>
              ))}
              <LoadingButton
                onClick={() => addTimeslotFormFields()}
                endIcon={<AddCircleOutlineIcon />}
                loading={false}
                loadingPosition="end"
                sx={{margin: '10px'}}
              >
                add new slot
              </LoadingButton>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleSave}>
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        }
      </Item>
    </div>
  );
};

Availability.propTypes = {
  availableTimes: PropTypes.array,
  scheduleDays: PropTypes.array,
  setscheduleDays: PropTypes.func,
  timeslotStatus: PropTypes.array,
  setopenTimeslotEdit: PropTypes.func,
  id: PropTypes.number

};

export default Availability;
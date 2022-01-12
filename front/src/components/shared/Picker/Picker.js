import {React, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Picker.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Button, CircularProgress, IconButton, Typography } from '@mui/material';

const Picker = ({ practicianData, columns, handleRdv, selectedType, eventList}) => {
  const [dates, setdates] = useState([]);
  const [page, setpage] = useState(0);
  const numberOfColumns = columns? columns : 7;
  const [filter, setfilter] = useState(4);

  useEffect(() => {
    getDates();
  }, [page, numberOfColumns, eventList]);

  const checkReserved = (time) => {
    return eventList.some(event => {
      return +event.start === +time.date;
    });

  };

  const nextDate = () => {
    setpage(page + numberOfColumns);
  };

  const prevDate = () => {
    if(page > 0){
      setpage(page - numberOfColumns);
    }
  };

  const handleMoreTimes = () => {
    const maxTimeSlot = Math.max(...dates.map(date => date.timeslots.length));
    setfilter(maxTimeSlot);
  };

  const handleAvailability = (current) => {
    let date;
    let times = [];

    const month = current.format('M');
    const day   = current.format('D');
    const dayOfweek = current.format('dddd').toLowerCase();
    const year  = current.format('YYYY');
    console.log(dayOfweek);
    const practicianAvailability = JSON.parse(practicianData.availability);
    practicianAvailability.find(available => available.id === dayOfweek).availability.map(available => {
      for(let k = available.start; k <= available.end; k++){
        times.push({
          raw: k,
          formatted: k+':00',
          date: new Date(year, month - 1  , day, k, 0, 0),
          disabled: checkReserved({date: new Date(year, month - 1  , day  , k, 0, 0)})
        } );
      }
    });

    date ={
      format: current.format('DD MMM'),
      day: current.format('dddd'),
      full: current.format('YYYY-MM-DD'),
      timeslots: times.filter(time => time.disabled === false)
    };
    return date;
  };
  const getDates = () => {
    const currentDate = moment();
    const today = moment();
    const weekStart = currentDate.clone().weekday(page);
    let days = [];
    let current;

    switch(numberOfColumns){
    case 7:
      for (let i = 0; i <= 6; i++) {
        current = moment(weekStart).add(i, 'days');
        const date = handleAvailability(current);
        days.push(date);
      }
      break;
    case 4:
      for (let i = 0; i <= 3; i++) {
        current = moment(today).add((page + i), 'days');
        const date = handleAvailability(current);
        days.push(date);
      }
      break;
    case 3:
      for (let i = 0; i <= 2; i++) {
        current = moment(today).add((page + i), 'days');
        const date = handleAvailability(current);
        days.push(date);
      }
      break;
    case 2:
      for (let i = 0; i <= 1; i++) {
        current = moment(today).add(i, 'days');
        const date = handleAvailability(current);
        days.push(date);
      }
      break;
    }
    setdates(days);
  };

  return (
    <div className="k-timer-container">
      <div className="k-timer">
        <IconButton onClick={prevDate} size="large" className="k-picker-button">
          <ArrowBackIosIcon fontSize="inherit"/>
        </IconButton>
        {(selectedType) && dates.map(day => (
          <div key={day.format} className="k-picker-content">
            <Typography variant="subtitle1" >
              {day.day.slice(0, 3)}
            </Typography>
            <Typography variant="subtitle2" >
              {day.format}
            </Typography>
            <div className="k-timeslots">
              {
                day.timeslots.slice(0,filter).map(time => (
                  !time.disabled &&
                  <button key={time.raw}
                    disabled={time.disabled}
                    onClick={() => handleRdv(practicianData, day.day, day.format, time.raw, time.formatted, day.full)}>
                    {time.formatted}
                  </button>
                ))
              }
              {
                (day.timeslots.length < filter) &&
                  Array(filter - day.timeslots.length ).fill().map((item, index) =>
                    (<span className="blocked" key={index}> - </span>))
              }
            </div>
          </div>
        ))}
        {!selectedType && dates.map(day => (
          <div key={day.format} className="k-picker-content">
            <Typography variant="subtitle1" >
              {day.day.slice(0, 3)}
            </Typography>
            <Typography variant="subtitle2" >
              {day.format}
            </Typography>
          </div>
        ))}
        <IconButton onClick={nextDate} size="large" className="k-picker-button">
          <ArrowForwardIosIcon fontSize="inherit"/>
        </IconButton>
      </div>
      <Box sx={{ display: selectedType? 'none' : 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
      <div  style={{ display: selectedType? 'block' : 'none' }} className="picker-more">
        {filter <= 4 &&
        <Button
          className="picker-more-btn"
          onClick={handleMoreTimes}
          sx={{
            color: 'text.primary',
            borderRadius: '0px'

          }}
        >See More Times</Button>}
      </div>

    </div>
  );
};

Picker.propTypes = {
  filter: PropTypes.number,
  handleRdv: PropTypes.func,
  practicianData: PropTypes.object,
  columns: PropTypes.number.isRequired,
  selectedType: PropTypes.string.isRequired,
  eventList: PropTypes.array
};

export default Picker;

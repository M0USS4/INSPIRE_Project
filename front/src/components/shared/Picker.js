import {React, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import data from '../../data/data';
import './Picker.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton, Typography } from '@mui/material';

const Picker = ({ practicianData, columns, handleRdv}) => {
  const [dates, setdates] = useState([]);
  const [displayNumber, setdisplayNumber] = useState(0);
  const [responsiveNumber, setresponsiveNumber] = useState(7);
  const [filter, setfilter] = useState(4);

  useEffect(() => {
    getDates(7);
    const number = columns? columns : 7;
    setresponsiveNumber(number);
  }, [displayNumber, responsiveNumber]);

  const checkReserved = (time) => {

    const find = data.some(event => {
      return +event.start === +time.date;
    });
    return find;
  };

  const nextDate = () => {
    setdisplayNumber(displayNumber + responsiveNumber);
    // getDates();
  };

  const prevDate = () => {
    if(displayNumber > 0){
      setdisplayNumber(displayNumber - responsiveNumber);
    }
    // getDates();
  };

  const handleMoreTimes = () => {
    console.log(dates);
    const maxTimeSlot = Math.max(...dates.map(date => date.timeslots.length));
    console.log(maxTimeSlot);
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
    practicianData.availability.find(available => available.id === dayOfweek).availability.map(available => {
      for(let k = available.start; k <= available.end; k++){
        times.push({
          raw: k+':00',
          date: new Date(year, month - 1  , day, k, 0, 0),
          disabled: checkReserved({date: new Date(year, month - 1  , day  , k, 0, 0)})
        } );
      }
    });

    date ={
      format: current.format('DD MMM'),
      day: current.format('dddd'),
      date: current.format('dddd'),
      timeslots: times.filter(time => time.disabled === false)
    };
    return date;
  };
  const getDates = () => {
    const currentDate = moment();
    const today = moment();
    const weekStart = currentDate.clone().weekday(displayNumber);
    let days = [];
    let current;

    switch(responsiveNumber){
    case 7:
      for (let i = 0; i <= 6; i++) {
        current = moment(weekStart).add(i, 'days');
        const date = handleAvailability(current);
        days.push(date);
      }
      break;
    case 4:
      for (let i = 0; i <= 3; i++) {
        current = moment(today).add((displayNumber + i), 'days');
        const date = handleAvailability(current);
        days.push(date);
      }
      break;
    case 3:
      for (let i = -1; i <= 1; i++) {
        current = moment(today).add((displayNumber + i), 'days');
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
      {/* <div className="k-picker-button">
        <IconButton onClick={prevDate} size="large" className="picker-button">
          <ArrowBackIosIcon fontSize="inherit"/>
        </IconButton>
        <IconButton onClick={nextDate} size="large">
          <ArrowForwardIosIcon fontSize="inherit"/>
        </IconButton>
      </div> */}
      <div className="k-timer">
        <IconButton onClick={prevDate} size="large" className="k-picker-button">
          <ArrowBackIosIcon fontSize="inherit"/>
        </IconButton>
        {dates.map(day => (
          <div key={day.format} className="k-picker-content">
            {/* <h3 >{day.day.slice(0, 3)}</h3>
            <span >{day.format}</span> */}

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
                        onClick={() => handleRdv(practicianData, day.day, day.format, time.raw)}>{time.raw}</button>
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
        <IconButton onClick={nextDate} size="large" className="k-picker-button">
          <ArrowForwardIosIcon fontSize="inherit"/>
        </IconButton>
      </div>
      <div className="picker-more">
        {filter <= 4 && <button className="picker-more-btn" onClick={handleMoreTimes}>See More Times</button>}
      </div>
    </div>
  );
};

Picker.propTypes = {
  filter: PropTypes.number,
  handleRdv: PropTypes.func,
  practicianData: PropTypes.object,
  columns: PropTypes.number
};

export default Picker;

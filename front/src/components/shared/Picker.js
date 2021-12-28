import {React, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import data from '../../data/data';
import './Picker.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton } from '@mui/material';

const Picker = ({filter, practicianData, columns, handleRdv}) => {
  const [dates, setdates] = useState([]);
  const [displayNumber, setdisplayNumber] = useState(0);
  const [responsiveNumber, setresponsiveNumber] = useState(7);
  // const [proData, setProData] = useState({});

  useEffect(() => {
    getDates(7);
    const number = columns? columns : 7;
    setresponsiveNumber(number);
  }, [displayNumber, responsiveNumber]);

  // const handleRdv = (id,day, date, time) => {
  //   setProData({
  //     id: id,
  //     day: day,
  //     date: date,
  //     time: time
  //   });
  //   console.log(proData);
  // };

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

  const getDates = () => {
    const currentDate = moment();
    const today = moment();
    const weekStart = currentDate.clone().weekday(displayNumber);
    let days = [];
    let current;

    switch(responsiveNumber){
    case 7:
      for (let i = 0; i <= 6; i++) {

        let times = [];
        current = moment(weekStart).add(i, 'days');
        const month = current.format('M');
        const day   = current.format('D');
        const year  = current.format('YYYY');

        for(let j = 9; j <= 17; j++){
          times.push({
            raw: j+':00',
            date: new Date(year, month - 1  , day, j, 0, 0),
            disabled: checkReserved({date: new Date(year, month - 1  , day  , j, 0, 0)})
          } );
        }
        days.push({
          format: current.format('Do MMM'),
          day: current.format('dddd'),
          date: current.format('dddd'),
          timeslots: times.filter(time => time.disabled === false)
        });
      }
      break;
    case 4:
      for (let i = 0; i <= 3; i++) {
        let times = [];
        current = moment(today).add((displayNumber + i), 'days');
        const month = current.format('M');
        const day   = current.format('d');
        const year  = current.format('YYYY');

        for(let j = 9; j <= 17; j++){
          times.push({
            raw: j+':00',
            date: new Date(year, month - 1 , i, j, 0, 0),
            disabled: checkReserved({date: new Date(year, month - 1 , day, j, 0, 0)})
          } );
        }
        days.push({
          format: current.format('Do MMM'),
          day: current.format('dddd'),
          date: current.format('dddd'),
          timeslots: times.filter(time => time.disabled === false)
        });
      }
      break;
    case 3:
      for (let i = -1; i <= 1; i++) {
        let times = [];
        current = moment(today).add((displayNumber + i), 'days');
        const month = current.format('M');
        const day   = current.format('d');
        const year  = current.format('YYYY');

        for(let j = 9; j <= 17; j++){
          times.push({
            raw: j+':00',
            date: new Date(year, month - 1 , i, j, 0, 0),
            disabled: checkReserved({date: new Date(year, month - 1 , day, j, 0, 0)})
          } );
        }
        days.push({
          format: current.format('Do MMM'),
          day: current.format('dddd'),
          date: current.format('dddd'),
          timeslots: times.filter(time => time.disabled === false)
        });
      }
      break;
    case 2:
      for (let i = 0; i <= 1; i++) {
        let times = [];
        current = moment(today).add(i, 'days');
        const month = current.format('M');
        const day   = current.format('d');
        const year  = current.format('YYYY');

        for(let j = 9; j <= 17; j++){
          times.push({
            raw: j+':00',
            date: new Date(year, month - 1 , i, j, 0, 0),
            disabled: checkReserved({date: new Date(year, month - 1 , day, j, 0, 0)})
          } );
        }
        days.push({
          format: current.format('Do MMM'),
          day: current.format('dddd'),
          date: current.format('dddd'),
          timeslots: times.filter(time => time.disabled === false)
        });
      }
      break;
    }
    console.log(days);
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
            <h3 >{day.day.slice(0, 3)}</h3>
            <span >{day.format}</span>
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
        <button className="picker-more-btn">See More Times</button>
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

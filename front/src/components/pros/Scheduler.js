import { React, useState } from 'react';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import data from '../../data/data';
import './pros.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const Scheduler = () => {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [eventList, seteventList] = useState(data);
  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      var newEvent = {
        start: start,
        end: end,
        title: title
      };
      seteventList([...eventList, newEvent]);
    }
  };

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        selectable
        events={eventList}
        step={60}
        defaultView='week'
        //   views={['week']}
        min={new Date(2021, 11, 9, 8, 0)}
        max={new Date(2021, 11, 8, 17, 0)}
        date={selectedDate}
        onNavigate={date => {
          setselectedDate(date);
        }}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        titleAccessor='title'
      />
    </div>
  );};

export default Scheduler;
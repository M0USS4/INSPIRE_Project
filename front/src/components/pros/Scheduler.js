import { React, useState } from 'react';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import data from '../../data/data2';
import './pros.css';
import DialogAlert from '../shared/Dialog';
import { ClickType } from '../shared/types';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const Scheduler = () => {
  const [selectedDate, setselectedDate] = useState(new Date());
  const [eventList, seteventList] = useState(data);
  const [open, setOpen] = useState(false);
  const [clicktype, setclicktype] = useState('');
  const [timeRange, settimeRange] = useState({
    start: null,
    end: null,
    type: null,
    id: null,
    status: null
  });

  // const handleSelect = ({ start, end }) => {
  //   const title = window.prompt('New Event name');
  //   if (title) {
  //     var newEvent = {
  //       start: start,
  //       end: end,
  //       title: title
  //     };
  //     seteventList([...eventList, newEvent]);
  //   }
  // };
  const eventStyleGetter = (event) => {
    const backgroundColor = event.status ? 'lightblue' : 'red';
    return { style: { backgroundColor } };
  };

  const handleBlock = () => {
    const title = 'block';
    const find = eventList.some(event => event.start === timeRange.start);
    if(!find){
      var newEvent = {
        ...timeRange,
        title: title,
        status: true,
        type: 'block'
      };
      seteventList([...eventList, newEvent]);
    }
    settimeRange({
      start: null,
      end: null,
      type: null,
      id: null,
      status: null
    });
    setOpen(false);
  };

  const handleUnblock = () => {
    const list = eventList.filter(event =>
      event.start !== timeRange.start);
    seteventList(list);
    settimeRange({
      start: null,
      end: null,
      type: null,
      id: null,
      status: null
    });
    setOpen(false);
  };

  const handleManage = () => {
    if(timeRange.type === 'block'){
      const list = eventList.filter(event =>
        event.start !== timeRange.start);
      seteventList(list);
    }
    else if(timeRange.type === 'appointment'){
      console.log(timeRange.id);

      const find = eventList.findIndex(event => {
        console.log(event);
        return event.id === timeRange.id;
      });
      let events = [...eventList];
      console.log(find);
      if(find){
        let event = {
          ...events[find],
          status: false
        };
        events[find] = event;
      }
      seteventList(events);

    }

    settimeRange({
      start: null,
      end: null,
      type: null,
      status: null,
      id: null
    });
    setOpen(false);
  };

  const handleOpen = ({ start, end, type, id, status }, t) => {
    console.log(t);
    settimeRange({ start, end, type, id, status });
    setclicktype(t);
    setOpen(true);

  };

  const handleOpen1 = ({ start, end, type, id, status }) => {
    settimeRange({ start, end, type, id, status });
    let t;
    if(type === 'appointment' && status){
      t = ClickType.cancel;
      setOpen(true);

    }
    else if(type === 'block'){
      t = ClickType.unblock;
      setOpen(true);

    }
    setclicktype(t);
    console.log(type);

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ height: '100%' }}>
      {open &&
      <DialogAlert
        type={clicktype}
        open={open}
        handleUnblock={handleUnblock}
        handleBlock={handleBlock}
        handleManage={handleManage}
        handleClose={handleClose}
      />
      }
      <Calendar
        localizer={localizer}
        selectable
        events={eventList}
        step={30}
        defaultView='week'
        //   views={['week']}
        min={new Date(2021, 11, 9, 8, 0)}
        max={new Date(2021, 11, 8, 18, 0)}
        date={selectedDate}
        onNavigate={date => {
          setselectedDate(date);
        }}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={event => handleOpen1(event)}
        onSelectSlot={event =>  handleOpen(event, ClickType.block)}
        eventPropGetter={eventStyleGetter}
        titleAccessor='title'
      />
    </div>
  );};

export default Scheduler;
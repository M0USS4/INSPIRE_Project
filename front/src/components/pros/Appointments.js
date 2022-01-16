import { React, useEffect, useState } from 'react';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import data from '../../data/data2';
import './pros.css';
import DialogAlert from '../shared/Dialog';
import { ClickType } from '../shared/types';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { alpha, Autocomplete, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const Appointments = () => {
  const params = useParams();
  const { register, handleSubmit } = useForm();
  const theme = useTheme();

  const [selectedDate, setselectedDate] = useState(new Date());
  const [eventList, seteventList] = useState([]);
  const [open, setOpen] = useState(false);
  const [clicktype, setclicktype] = useState('');
  const [timeRange, settimeRange] = useState({
    start: null,
    end: null,
    type: null,
    id: null,
    status: null
  });

  useEffect(() => {
    axios.get('http://localhost:2021/pro/appt/all/v2',{
      params: {
        pro_id: params.id
      }
    })
      .then(response => {
        console.log(response.data);
        const data = response.data.map(event => {
          const checkDate = (new Date() - new Date(event.date_start)) > 0;
          return {
            start: new Date(event.date_start),
            end: new Date(event.date_end),
            title: `${event.nom_type} appointment with : ${event.prenom_client} ${event.nom_client}`,
            status: (event.status.data[0] === 0 || checkDate) ? false : true,
            type: event.id_type > 0 ? 'appointment' : 'block'
          };
        });
        console.log(data);
        seteventList(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.status ?
      alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity) : red[100];
    return { style: { backgroundColor, color: 'black', border: 'none', width: '100%' } };
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

  // const handleCreate = (data) => {
  //   const {title, type} = data;
  //   const find = eventList.some(event => event.start === timeRange.start);
  //   if(!find){
  //     var newEvent = {
  //       ...timeRange,
  //       title: title,
  //       status: true,
  //       type: 111
  //     };
  //     seteventList([...eventList, newEvent]);
  //   }
  //   settimeRange({
  //     start: null,
  //     end: null,
  //     type: null,
  //     id: null,
  //     status: null
  //   });
  //   setOpen(false);
  // };

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
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {'Create Appointment'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {'type.subtitle'}
          </DialogContentText>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['appointment', 'block']}
            sx={{ flex: 1}}

            renderInput={(params) =>
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                }}
                sx={{width: '100%', border: 'none'}}
                {...register('type', { required: true,  minLength: 2 })}
              />
            }
          />
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
            }}
            sx={{width: '100%', border: 'none'}}
            {...register('title', { required: true,  minLength: 2 })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Close</Button>
        </DialogActions>
      </Dialog>
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
        style={{ minHeight: '550px' }}
      />
    </div>
  );};

export default Appointments;
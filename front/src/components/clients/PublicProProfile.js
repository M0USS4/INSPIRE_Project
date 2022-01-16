import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Chip, Grid, Link } from '@mui/material';
import Picker from '../shared/Picker/Picker';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClientAppointment from './ClientsAppointment/ClientAppointment';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: '5px',
}));

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '90%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '75%',
  },
}));

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Div = styled('div')(() => ({
}));

const PublicProProfile = () => {
  const [value, setValue] = useState('1');
  const [selectedType, setselectedType] = useState(null);
  const [appointmentData, setappointmentData] = useState({});
  const [practicianData, setpracticianData] = useState();
  const [appointmentTypes, setappointmentTypes] = useState();
  const [eventList, seteventList] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    axios.get('http://localhost:2021/getProDetailed',{
      params: {
        pro_id: params.id
      }
    })
      .then(response => {
        if(response.data.found === false){
          navigate('/home');
        }
        else{
          setpracticianData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if(practicianData){
      init();
    }
  }, [practicianData]);

  const init = () => {
    axios.get('http://localhost:2021/getAppointmentTypes',{
      params: {
        pro_id: params.id,
        nom_medicine: practicianData.nom_medicine
      }
    })
      .then(response => {
        setappointmentTypes(response.data);
        if(response.data.length){
          setselectedType(response.data[0].nom);
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
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRdv = (id,day, date, time_raw, time_formatted, fulldate) => {
    const type = selectedType ?
      appointmentTypes.find(appointment => appointment.nom === selectedType)
      : appointmentTypes.find(appointment => appointment);
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
    navigate({
      pathname: `/practician/${params.id}/booking`,
      search: `?active=1&${queryString}`,
    });
  };

  const ratingValue = 4.5;

  return (
    <Root className="pro-profile-client">
      {matches}
      {(matches && practicianData && appointmentTypes) ?
        <div>
          <Item >
            <div className="profile-header-container">
              <div className="profile-header-basic">
                <img src={practicianData.img} alt="" />
                <div className="header-basic-info">
                  <h3>{`${practicianData.prenom} ${practicianData.nom}`}</h3>
                  <span className="header-basic-info-sub-title">{practicianData.nom_medicine}</span>
                  <span className="header-basic-info-sub-title">{practicianData.nom_medicine}</span>
                  <Rating
                    className="rating"
                    name="text-feedback"
                    value={ratingValue}
                    readOnly
                    precision={0.5}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  <div>
                    <Link href="" style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}><LocationOnIcon fontSize='small'/>{practicianData.rue}</Link>
                  </div>
                </div>
              </div>
              <div className="profile-header-other"></div>
            </div>

          </Item>
          <div sx={{ flexGrow: 1}}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
            >
              <Grid item xs={12} sm={12} md={8} lg={9}>
                <Item>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Summary" value="1" />
                        <Tab label="About" value="2" />
                        <Tab label="Review" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div className="profile-body-main">
                        <div className="basic-info-container">
                          <h3>Description</h3>
                          <p>
                            {practicianData.description ? practicianData.description : 'Hello Client'}
                          </p>

                        </div>
                        <div className="basic-info-container">
                          <label htmlFor="about"><h3>Expertises and acts</h3></label>
                          <div className="tags">
                            {
                              appointmentTypes.map((type, index) => (
                                // <div className="tag" key={index}>{type.type}</div>
                                <ListItem key={index}>
                                  <Chip
                                    label={type.nom}
                                    sx={{backgroundColor: 'primary.main', color: 'white'}}/>
                                </ListItem>

                              ))
                            }
                          </div>
                        </div>
                        <div className="basic-info-container">
                          <label htmlFor="charges"><h3>Charges</h3></label>
                          <TableContainer component={Paper}>
                            <Table size="small">
                              <TableHead sx={{backgroundColor: 'primary.main', color: 'white'}}>
                                <TableRow >
                                  <TableCell>Appointment Type</TableCell>
                                  <TableCell align="right">Price</TableCell>
                                  <TableCell align="right">Duration</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {appointmentTypes.map((type) => (
                                  <TableRow
                                    key={'r1' + type.type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {type.nom}
                                    </TableCell>
                                    <TableCell align="right">{type.price}</TableCell>
                                    <TableCell align="right">{type.duration}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">To Do</TabPanel>
                    <TabPanel value="3">To Do</TabPanel>
                  </TabContext>
                </Item>

              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={3} >
                <Item sx={{textAlign: 'center'}}>
                  <Div
                    sx={{
                      borderBottom:'1px solid', borderColor: 'primary.main',
                      textTransform: 'uppercase', padding: '10px'}}>
                    <span>Prendez un rendez-vous</span>
                  </Div>
                  <p>Choose Appointment Type</p>
                  {selectedType}
                  <select
                    className="form-control"
                    name="appointment_type"
                    value={selectedType || ''}
                    onChange={(e) => setselectedType(e.target.value)}
                  >
                    {appointmentTypes.map((type, index) => (
                      <option  key={index}>{type.nom}</option>
                    ))}
                  </select>

                  <Picker
                    practicianData={practicianData}
                    columns={3}
                    handleRdv={handleRdv}
                    selectedType={selectedType}
                    eventList={eventList}
                  />

                </Item>

              </Grid>
            </Grid>
          </div>
        </div>
        :
        <ClientAppointment
          selectedType={selectedType}
          setselectedType={setselectedType}
          appointmentData={appointmentData}
          setappointmentData={setappointmentData}
        />
      }

    </Root>
  );
};

export default PublicProProfile;

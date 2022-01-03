import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import proImage from '../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';
import { Chip, Grid, Link } from '@mui/material';
import Picker from '../shared/Picker';
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
import professionals from '../../data/pro-data';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: 'black',
  margin: '5px'
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

const ProfessionalProfile = () => {
  const [value, setValue] = useState('1');
  const [selectedType, setselectedType] = useState(null);
  const [appointmentData, setappointmentData] = useState({});
  const [practicianData, setpracticianData] = useState();

  const navigate = useNavigate();
  const params = useParams();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const practician = professionals.find(pro => pro.id === Number(params.id) );
    setpracticianData(practician);
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRdv = (id,day, date, time) => {
    const type = selectedType ?
      practicianData.appointmentTypes.find(appointment => appointment.type === selectedType)
      : practicianData.appointmentTypes.find(appointment => appointment);
    const appointmentDataTemp = {
      id: id,
      day: day,
      date: date,
      time: time,
      type: type.type,
      duration: type.duration,
      price: type.price
    };
    const queryString = Object.keys(appointmentDataTemp).map(key => key + '=' + appointmentDataTemp[key]).join('&');
    setappointmentData(appointmentDataTemp);
    console.log(appointmentData);
    navigate({
      pathname: '/pro-profile/1/booking',
      search: `?active=1&${queryString}`,
    });

  };

  const ratingValue = 4.5;
  const types = [
    {type:'Ostéopathie du sport',
      price: 50,
      duration: 60
    },
    {type:'Ostéopathie de la femme enceinte',
      price: 45,
      duration: 30
    },
    {type:'Ostéopathie biodynamique',
      price: 30,
      duration: 60
    }];

  return (
    <Root className="pro-profile-client">
      <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>

      {matches ?
        <div>
          <Item >
            <div className="profile-header-container">
              <div className="profile-header-basic">
                <img src={proImage} alt="" />
                <div className="header-basic-info">
                  <h3>Dr. Prenom Nom</h3>
                  <span className="header-basic-info-sub-title">BDS, Osteology</span>
                  <span className="header-basic-info-sub-title">Osteopatist</span>
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
                    }}><LocationOnIcon fontSize='small'/> 89 Avenue de Bretagne 59000 Lille</Link>
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
                        Cras mattis tortor nec risus ultricies, vitae interdum odio sodales.
                        Nulla dignissim viverra vulputate. Phasellus vel leo elit.
                        Class aptent taciti sociosqu ad litora torquent per conubia nostra,
                        per inceptos himenaeos. Curabitur at ligula eu leo tincidunt ullamcorper vitae et purus.
                        Pellentesque at scelerisque purus, sit amet mattis risus.
                        Nam risus diam, hendrerit in lorem quis, ullamcorper mollis ligula.
                          </p>

                        </div>
                        <div className="basic-info-container">
                          <label htmlFor="about"><h3>Expertises and acts</h3></label>
                          <div className="tags">
                            {
                              types.map((type, index) => (
                                // <div className="tag" key={index}>{type.type}</div>
                                <ListItem key={index}>
                                  <Chip  label={type.type} style={{backgroundColor: '#abe4e7'}}/>
                                </ListItem>

                              ))
                            }
                          </div>
                        </div>
                        <div className="basic-info-container">
                          <label htmlFor="about"><h3>Charges</h3></label>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow sx={{backgroundColor: '#abe4e7'}}>
                                  <TableCell>Appointment Type</TableCell>
                                  <TableCell align="right">Price</TableCell>
                                  <TableCell align="right">Duration</TableCell>

                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {types.map((type) => (
                                  <TableRow
                                    key={type.type}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {type.type}
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
                <Item>
                  <div className='rdv-title'>
                    Prendez un rendez-vous
                  </div>
                  <h3>Choose Appointment Type</h3>
                  {selectedType}
                  <select
                    className="form-control"
                    name="appointment_type"
                    value={selectedType || ''}
                    onChange={(e) => setselectedType(e.target.value)}
                  >
                    {types.map((type, index) => (
                      <option  key={index}>{type.type}</option>
                    ))}
                  </select>
                  <Picker practicianData={practicianData} columns={3} handleRdv={handleRdv}/>
                </Item>

              </Grid>
            </Grid>
          </div>
        </div>
        :
        <ClientAppointment selectedType={selectedType} setselectedType={setselectedType}/>
      }

    </Root>
  );
};

export default ProfessionalProfile;

import { Avatar, Divider, Typography } from '@mui/material';
import {React, useState, useEffect} from 'react';
// import Picker from '../shared/Picker';
import professionals from '../../data/pro-data';
import './clients.css';
import woman from '../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';
import ConfirmPopup from './ConfirmPopup';
import { useNavigate } from 'react-router';
import { Grid, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from '../shared/Map';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../shared/SearchBar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: 'black',
  margin: '5px'
}));

// const Item2 = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   color: 'black',
//   margin: '5px',
//   paddingTop: 0
// }));

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '90%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
  },
}));
const Search = () => {
  let navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const getLocation = searchParams.get('location');
  const getPractice = searchParams.get('practice');
  const [filterParams, setfilterParams] = useState({
    location: getLocation,
    practice: getPractice
  });
  const [searchData, setsearchData] = useState([]);
  const [open, setopen] = useState(false);
  const [data, setdata] = useState({});
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);
  useEffect(() => {
    console.log(filterParams);
    handleSearch();
  }, [data]);

  const handleSearch = () => {

    console.log(searchParams.get('location'));
    // eslint-disable-next-line max-len
    const search = professionals.filter(pro => pro.city === filterParams.location && pro.practice === filterParams.practice);
    console.log(search);
    setsearchData(search);
    // setfilterParams({
    //   location: '',
    //   practice: ''
    // });
  };
  const handleRdv = (id,day, date, time) => {
    setdata({
      id: id,
      day: day,
      date: date,
      time: time
    });
    console.log(data);
    handleOpen();
  };

  const goToProPage = () => {
    navigate('/pro-profile/1',      { state: {
      success: true,
    }});
  };
  return (
    <div >
      {open && <ConfirmPopup data={data} open={open} handleClose={handleClose} handleOpen={handleOpen}/>}
      <div style={{height: 120, backgroundColor: '#e9ffff', textAlign: 'center'}}>
        {filterParams &&<p>{`${getPractice} in ${getLocation}
        : Make an appointment with a selected and validated therapist`}</p>}
        <Root>
          <SearchBar handleSearch={handleSearch} setfilterParams={setfilterParams}/>
        </Root>
      </div>
      <div style={{ backgroundColor: 'white', textAlign: 'center'}} className='filter-bar'>
        <Root>
          <Paper
            component="form"
            sx={{  display: 'flex', alignItems: 'center', border: 'none', boxShadow: 'none' }}
          >
            <p>Search Par</p>
            <Divider sx={{ height: 40, ml: 1 }} orientation="vertical" />
            <Select
              sx={{ ml: 1, flex: 1, height: 40 }}
            >
              <MenuItem disabled value="">
                <em>Availability</em>
              </MenuItem>
              <MenuItem value={3}>Next 3 months</MenuItem>
            </Select>
            <Select
              sx={{ ml: 1, flex: 1, height: 40 }}
            >
              <MenuItem disabled value="">
                <em>Appointment Type</em>
              </MenuItem>
              <MenuItem value={10}>Sports</MenuItem>
            </Select>
            <Select
              sx={{ ml: 1, flex: 1, height: 40 }}
            >
              <MenuItem disabled selected value="">
                <em>Availability</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </Paper>
        </Root>
      </div>
      <Root>

        <Grid
          container
          spacing={2}
        >
          {searchData.length ?
            <Grid item xs={12} sm={7} md={7} lg={7} >
              {searchData.map(pro => (
              // <Item2 key={pro.id}>
              //   <div className="profile-header-basic">
              //     <Avatar className="rdv-image" src={woman} sx={{ width: 90, height: 90 }}/>
              //     <div className="header-basic-info">
              //       <Typography variant="h6">
              //         {pro.name}
              //       </Typography>
              //       <Typography variant="subtitle1" >
              //         {pro.diplomas[0]}
              //       </Typography>
              //       <Typography variant="subtitle1">
              //         {pro.practice}
              //       </Typography>
              //       <div>
              //         <Link href="" >
              //           <Typography variant="subtitle2" style={{
              //             display: 'flex',
              //             alignItems: 'center',
              //             flexWrap: 'wrap',
              //           }}>
              //             <LocationOnIcon fontSize="small" />
              //             {`${pro.address} ${pro.code},${pro.city}`}
              //           </Typography>
              //         </Link>
              //       </div>
              //     </div>
              //   </div>
              //   <div className="rdv-button">
              //     <Button variant="outlined" onClick={goToProPage}>Prendez un rdv</Button>

                //     {/* <button className="button1" onClick={goToProPage}>Prendez un rdv</button> */}
                //   </div>
                // </Item2>
                <Card key={pro.id} sx={{margin: '5px', padding: theme.spacing(1)}} >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ width: 56, height: 56 }} aria-label="recipe"  src={woman}>
                    R
                      </Avatar>
                    }
                    sx={{padding: '2px', borderBottom: '1px solid #009ba4'}}
                    title={pro.name}
                    subheader={pro.diplomas[0]}
                  />
                  <CardContent sx={{padding: '5px', display: 'flex'}}>
                    {/* <Typography variant="h6">
                      {pro.name}
                    </Typography>
                    <Typography variant="subtitle1" >
                      {pro.diplomas[0]}
                    </Typography> */}
                    <div style={{marginRight: '15px'}}>
                      <Typography variant="body2" sx={{textTransform: 'uppercase'}}>
                        {pro.practice}
                      </Typography>
                      <Link href="" >
                        <Typography variant="body2" style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                          <LocationOnIcon fontSize="small" />
                          {`${pro.address} ${pro.code}, ${pro.city}`}
                        </Typography>
                      </Link>
                      <Button variant="contained" onClick={goToProPage}>Prendez un rdv</Button>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </Grid>
            :
            <Grid item xs={12} sm={7} md={7} lg={7} >
              <Typography variant="subtitle2" sx={{textTransform: 'uppercase'}}>
          No practician Found... please search with different criteria
              </Typography>
            </Grid>

          }
          {searchData && <Grid item xs={12} sm={5} md={5} lg={5}>
            <Item>
              <Map address={`${searchData.address}, ${searchData.city}`}/>
              {handleRdv}
              {/* <Picker filter={3} handleRdv={handleRdv}  id={pro}/> */}
            </Item>

          </Grid>}

        </Grid>
      </Root>
    </div>
  );
};

export default Search;

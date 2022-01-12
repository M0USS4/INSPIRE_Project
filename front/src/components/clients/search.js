import { Avatar, Typography } from '@mui/material';
import {React, useState, useEffect} from 'react';
// import Picker from '../shared/Picker';
// import professionals from '../../data/pro-data';
import './clients.css';
import { useNavigate } from 'react-router';
import { Grid, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Map from '../shared/Map';
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../shared/SearchBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';

const Div = styled('div')(() => ({
}));
const Span = styled('span')(() => ({
}));

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
  const getLabel = searchParams.get('label');
  const [filterParams, setfilterParams] = useState({
    location: '',
    practice: '',
    label: ''
  });
  const [searchData, setsearchData] = useState([]);
  const [data, setdata] = useState({});

  useEffect(() => {
    console.log(filterParams);
    handleSearch(getPractice, getLocation, getLabel);
  }, [data]);

  const handleSearch = (practice, location, label) => {
    setfilterParams({
      location: location,
      practice: practice,
      label: label
    });
    axios.get('http://localhost:2021/getAllProsByParams',{
      params: {
        practice: practice,
        location: location
      }
    })
      .then(response => {
        console.log(response.data);
        setsearchData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleRdv = (id,day, date, time) => {
    setdata({
      id: id,
      day: day,
      date: date,
      time: time
    });
    console.log(data);
  };

  const goToProPage = (id) => {
    navigate(`/pro-profile/${id}`,      { state: {
      success: true,
    }});
  };
  return (
    <div >
      <Div sx={{minHeight: 120, backgroundColor: 'secondary.contrastText', textAlign: 'center', padding: '20px'}}>
        {filterParams && <h3>
          <Span sx={{color: 'primary.main'}}>
            {`${getPractice.toLocaleUpperCase()} in ${getLabel.toLocaleUpperCase()}`}
          </Span>
          {': Make an appointment with a selected and validated therapist'}</h3>}
        <Root>
          <SearchBar handleSearch={handleSearch} setfilterParams={setfilterParams} type='search'/>
        </Root>
      </Div>
      <Root>
        <Grid
          container
          spacing={2}
        >
          {searchData.length ?
            <Grid item xs={12} sm={7} md={7} lg={7} >
              {searchData && searchData.map(pro => (
                <Card key={pro.id} sx={{margin: '5px', padding: theme.spacing(1), backgroundColor: 'primary.light'}} >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ width: 56, height: 56 }}  src={pro.img}>
                    R
                      </Avatar>
                    }
                    sx={{padding: '2px', borderBottom: '1px solid', borderColor: 'primary.main'}}
                    title={`${pro.prenom} ${pro.nom}`}
                    subheader={pro.nom_medicine}
                  />
                  <CardContent sx={{padding: '5px', display: 'flex'}}>
                    <div style={{marginRight: '15px'}}>
                      <Typography variant="body2" sx={{textTransform: 'uppercase'}}>
                        {pro.nom_medicine}
                      </Typography>
                      <Link href="" >
                        <Typography variant="body2" style={{
                          display: 'flex',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                        }}>
                          <LocationOnIcon fontSize="small" />
                          {`${pro.rue} ${pro.codeP}, ${pro.ville}`}
                        </Typography>
                      </Link>
                      <Button variant="contained" onClick={() => goToProPage(pro.pro_id)}>Prendez un rdv</Button>
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
          {searchData.length ? <Grid item xs={12} sm={5} md={5} lg={5}>
            <Item>
              <Map address={searchData} />
              {handleRdv}
              {/* <Picker filter={3} handleRdv={handleRdv}  id={pro}/> */}
            </Item>

          </Grid> : <span></span>}

        </Grid>
      </Root>
    </div>
  );
};

export default Search;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';

const useStyles  = makeStyles({
  inputbase : {
    '& input::placeholder': {
      borderColor: 'green',
      color: 'red'
    },
  },
  invalid: {
    color: 'red'
  },
  noBorder: {
    border: 'none',
  },
});
const SearchBar = ({ handleSearch, type }) => {
  let navigate = useNavigate();
  const theme = useTheme();
  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [allMedicine, setallMedicine] = useState([]);
  const [autoCompleteData, setautoCompleteData] = useState([]);
  const [selectedLocation, setselectedLocation] = useState(null);
  const [selectedPractice, setselectedPractice] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get('http://localhost:2021/getAllMedicine')
      .then(response => {
        if (response.data) {
          setallMedicine(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) =>{
    const location = JSON.stringify(selectedLocation.geometry.coordinates);
    const label = JSON.stringify(selectedLocation.properties.label);
    const practice = data.practice;
    navigate( {
      pathname: '/search',
      search: `?practice=${practice}&location=${location}&label=${label}`,
    });
    if(type === 'search'){
      handleSearch(practice, location, label);
    }
  };

  const autoComplete = (e) => {
    const query = e.target.value;
    axios.get(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=street&autocomplete=1`)
      .then(response => {
        setautoCompleteData(response.data.features);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{  display: 'flex', alignItems: 'center',  }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allMedicine.map(medicine => medicine.name)}
          sx={{ flex: 1}}
          value={selectedPractice}
          onChange={(e, value) => setselectedPractice(value)}
          renderInput={(params) =>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                classes:{notchedOutline:classes.noBorder},
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <PersonSearchIcon color='primary' className={`${errors.practice ? classes.invalid : ''}`}/>
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              sx={{width: '100%', border: 'none'}}
              {...register('practice', { required: true,  minLength: 2 })}
            />
          }
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={autoCompleteData}
          getOptionLabel={option => option.properties.label}
          sx={{  ml: 1, flex: 1 }}
          value={selectedLocation}
          onChange={(e, value) => setselectedLocation(value)}
          renderInput={(params) =>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                classes:{notchedOutline:classes.noBorder},
                startAdornment: (
                  <>
                    <InputAdornment position="start">
                      <LocationOnIcon color='primary' className={`${errors.location ? classes.invalid : ''}`}/>
                    </InputAdornment>
                    {params.InputProps.startAdornment}
                  </>
                )
              }}
              // label="Location..."
              onKeyDown={(e) => autoComplete(e)}
              {...register('location', { required: true,  minLength: 2 })}
            />
          }
        />
        {mobile &&
          <>
            <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />

            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon color='primary'/>
            </IconButton>
          </>
        }
        {!mobile &&
          <Button
            variant="contained"
            sx={{ height: 56, ml: 1, flex: 0.3}}
            onClick={handleSubmit(onSubmit)}
          >Trouvez</Button>
        }
      </Paper>
    </div>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
  setfilterParams: PropTypes.func,
  type: PropTypes.oneOf(['home', 'search']),
};

export default SearchBar;

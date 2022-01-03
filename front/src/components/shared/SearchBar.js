import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { makeStyles } from '@material-ui/styles';

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
});
const SearchBar = () => {
  let navigate = useNavigate();
  const theme = useTheme();
  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) =>{
    console.log(data);
    const location = new String(data.location).toLowerCase();
    const practice = new String(data.practice).toLowerCase();
    navigate( {
      pathname: '/search',
      search: `?practice=${practice}&location=${location}`,
    });
    window.location.reload();
    // setfilterParams(
    //   {
    //     location: location,
    //     practice: practice
    //   }
    // );
    // handleSearch(location , practice);
  };
  return (
    <div>
      <form action="">
        <Paper
          component="form"
          sx={{  display: 'flex', alignItems: 'center', height: 50 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Practique, Therapeute, ..."
            startAdornment={
              <InputAdornment position="start">
                <PersonSearchIcon color='primary' className={`${errors.practice ? classes.invalid : ''}`}/>
              </InputAdornment>
            }
            className={`${errors.practice ? classes.inputbase : ''}`}
            {...register('practice', { required: true,  minLength: 2 })}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Ville"
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon color='primary' className={`${errors.location ? classes.invalid : ''}`}/>
              </InputAdornment>
            }
            className={`${errors.location ? classes.inputbase : ''}`}
            {...register('location', { required: true,  minLength: 2 })}
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
            sx={{ height: 50, ml: 1, flex: 0.3 }}
            onClick={handleSubmit(onSubmit)}
          >Trouvez</Button>
          }
        </Paper>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  handleSearch: PropTypes.func,
  setfilterParams: PropTypes.func
};

export default SearchBar;

/* eslint-disable no-useless-escape */
import {React } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'black',
  marginBottom: theme.spacing(3),
  boxShadow: 'none'
}));

const ProfileSettings = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="profile-settings">
      <Item>
          Basic Infomation
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            {/* <div className={`field-container ${errors.lastname ? 'invalid' : ''}`}> */}
            <label htmlFor="nom"><b>Nom</b></label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Nom"
              name="nom"
              {...register('lastname', { required: true, maxLength: 30, minLength: 2 })}
            />
            {/* </div> */}
          </Grid>
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="prenom"><b>Prenom</b></label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Prenom"
              name="prenom"
              {...register('firstname', { required: true, maxLength: 30, minLength: 2 })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="dateofBirth"><b>Date of Birth</b></label>
            <input
              className="form-control"

              type="date"
              placeholder="Enter Date of Birth"
              name="dateofBirth"
              {...register('dateofBirth', { })}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="phone"><b>Phone Number</b></label>
            <input
              className="form-control"

              type="text"
              placeholder="Enter Phone Number"
              name="phone"
              {...register('phone', { required: true, maxLength: 12, minLength: 10 })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="email"><b>Email</b></label>
            <input
              className="form-control"

              type="email"
              placeholder="Enter Email"
              name="email"
              {...register('email', {
                required: true,
                // eslint-disable-next-line max-len
                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              })}
            />
          </Grid>
        </Grid>
      </Item>

      <Item>
          Address Infomation
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="city"><b>City</b></label>
            <input
              className="form-control"
              type="text"
              placeholder="City..."
              name="city"
              {...register('city', { required: true, maxLength: 40, minLength: 2 })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="postal"><b>Postal Code</b></label>
            <input
              className="form-control"
              type="text"
              placeholder="Postal adresse..."
              name="postal"
              {...register('postal', { required: true, maxLength: 40, minLength: 2 })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="street"><b>Apartment No</b></label>
            <input
              className="form-control"
              type="number"
              placeholder="Apartment No..."
              name="number"
              {...register('number', { required: true, maxLength: 40, minLength: 2 })}
            />
          </Grid>

          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="street"><b>Street</b></label>
            <input
              className="form-control"
              type="text"
              placeholder="Street..."
              name="street"
              {...register('street', { required: true, maxLength: 30, minLength: 2 })}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
            <label htmlFor="add"><b>Additional Info</b></label>
            <input
              className="form-control"
              type="text"
              placeholder="Additional Info..."
              name="add"
              {...register('add', { required: false, maxLength: 40, minLength: 2 })}
            />
          </Grid>
        </Grid>
      </Item>
      <button onClick={handleSubmit(onSubmit)} className="button1">Update</button>

    </div>
  );
};

export default ProfileSettings;

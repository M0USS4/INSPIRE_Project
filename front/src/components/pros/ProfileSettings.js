/* eslint-disable no-useless-escape */
import {React, useState, useEffect } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';

const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: 'black',
  marginBottom: theme.spacing(3),
//   marginTop: theme.spacing(3),
}));

const addButtonStyle = {
  border: 'none',
  background: 'none',
  textTransformation: 'none',
  boxShadow: 'none',
  color: '#009ba4'
};

const removeButtonStyle = {
  color: 'red'
};

const ProfileSettings = () => {
  const [motifs, setmotifs] = useState([]);
  const [motifValue, setmotifValue] = useState('');
  const [experiences, setexperiences] = useState([{
    hospital: '1',
    from: '',
    to: '',
    location: ''
  }]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const mot = ['Stop Smoking', 'Massage', 'Eat Healthy'];
    setmotifs(mot);
  }, [experiences]);

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleChange = (e) => {
    setmotifValue(e.target.value);
  };

  let handleAddExperiences = (i, e) => {
    let newFormValues = [...experiences];
    newFormValues[i][e.target.name] = e.target.value;
    setexperiences(newFormValues);
  };

  let addFormFields = () => {
    console.log(experiences);
    setexperiences([...experiences, {
      hospital: '',
      from: '',
      to: '',
      location: ''
    }]);
    console.log(experiences);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...experiences];
    newFormValues.splice(i, 1);
    setexperiences(newFormValues);
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

      <Item>
                  About
        <div className={`basic-info-container ${errors.firstname ? 'invalid' : ''}`}>
          <label htmlFor="about"><b>Description</b></label>
          <textarea
            name="about"
            placeholder="Enter Description"

            rows="7"
            {...register('firstname', { required: true, maxLength: 30, minLength: 2 })}
          >
          </textarea>

        </div>
      </Item>

      <Item>
          Motifs
        <div className="tags">
          {motifs.map((motif, index) => (
            <span className="tag" key={index}>
              {motif}<CancelIcon onClick={() => setmotifs(motifs.filter(mot => mot !== motif))}/>
            </span>
          ))}
        </div>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Motif"
          name="motif"
          {...register('motif', { required: true, maxLength: 30, minLength: 2 })}

          value={motifValue}
          onChange={event => handleChange(event)}
          onKeyPress={event => {
            if(event.key === 'Enter'){
              setmotifs([...motifs, event.target.value]);
              setmotifValue('');
            }
          }}
        />
      </Item>
      <Item>
          Experience
        { experiences && experiences.map((experience, index) => (
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} key={index}>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.hospital ? 'invalid' : ''}`}>
              {/* <div className={`field-container ${errors.lastname ? 'invalid' : ''}`}> */}
              <label htmlFor="hospital"><b>Hospital</b></label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter hospital"
                name="hospital"
                value={experience.hospital || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
              {/* </div> */}
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.location ? 'invalid' : ''}`}>
              <label htmlFor="location"><b>Location</b></label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter location"
                name="location"
                value={experience.location || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.from ? 'invalid' : ''}`}>
              <label htmlFor="from"><b>From</b></label>
              <input
                className="form-control"

                type="date"
                placeholder="Enter start date"
                name="from"
                {...register('from', { })}
                value={experience.from || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.to ? 'invalid' : ''}`}>
              <label htmlFor="to"><b>To</b></label>
              <input
                className="form-control"

                type="date"
                placeholder="Enter end Date"
                name="to"
                // {...register('to', { })}
                value={experience.to || ''}
                onChange={e => handleAddExperiences(index, e)}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} className={`basic-info-container  ${errors.lastname ? 'invalid' : ''}`}>
              {
                index ?
                  <button
                    type="button"
                    className="button remove"
                    onClick={() => removeFormFields(index)}>Remove</button>
                  : null
              }
              {
                index ?
                  <IconButton size="large" style={removeButtonStyle} onClick={() => removeFormFields(index)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                  : null
              }
            </Grid>
          </Grid>
        ))}
        <LoadingButton
          onClick={() => addFormFields()}
          endIcon={<AddCircleOutlineIcon />}
          loading={false}
          loadingPosition="end"
          variant="contained"
          style={addButtonStyle}
        >
        add more
        </LoadingButton>
        {/* <button className="button add" type="button" onClick={() => addFormFields()}>Add</button> */}

      </Item>
      <button onClick={handleSubmit(onSubmit)} className="button1">Creer un Compte</button>

    </div>
  );
};

export default ProfileSettings;

import React, { useEffect, useState } from 'react';
import './pros.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import authService from '../helpers/auth.service';

import {
  Outlet,
  Link,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProProfile = () => {
  const params = useParams();
  let navigate = useNavigate();

  const [practicianData, setpracticianData] = useState({});
  useEffect(() => {
    const user = authService.getCurrentUser();
    if(user.type !== 1){
      navigate('/login');
    }
    else{
      axios.get('http://localhost:2021/getProDetailed',{
        params: {
          pro_id: params.id
        }
      })
        .then(response => {
          console.log(response.data);
          setpracticianData(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);
  return (
    <section className="pro-profile">
      <Box sx={{ flexGrow: 1, margin: '10px' }}>
        <Grid
          container
          spacing={2}
          // alignItems="stretch"
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={4} lg={2.5}>
            <Item >
              <div className="pro-profile-menu">
                <img className="pro-profile-menu-image"
                  src={practicianData.img}
                  alt=""/>
                <h2>{`${practicianData.prenom} ${practicianData.nom}`}</h2>
                <h3>{practicianData.nom_medicine}</h3>
                <ul className="pro-profile-menu-list">
                  <li>
                    <div className="u-list-icon u-list-icon-1">
                      <EventAvailableIcon/>
                    </div>
                    <Link to="appointments">Appointments</Link>
                  </li>
                  <li>
                    <div className="u-list-icon u-list-icon-2">
                      <SettingsIcon/>
                    </div>
                    <Link to="customization">Customization</Link>
                  </li>
                  <li>
                    <div className="u-list-icon u-list-icon-2">
                      <PeopleIcon/>
                    </div>
                    <Link to="clients">Clients</Link>
                  </li>
                  <li>
                    <div className="u-list-icon u-list-icon-3">
                      <RateReviewIcon/>
                    </div>
                    <Link to="reviews">Reviews</Link>

                  </li>
                  <li>
                    <div className="u-list-icon u-list-icon-1">
                      <ShareIcon/>
                    </div>
                    <Link to="social media">Social Media</Link>

                  </li>
                  <li>
                    <div className="u-list-icon u-list-icon-1">
                      <AppSettingsAltIcon/>
                    </div>
                    <Link to="profile-settings">Account Settings</Link>

                  </li>
                  <li>
                    <div className="u-list-icon u-list-icon-1">
                      <LogoutIcon/>
                    </div>
                    <Link to="logout">Logout</Link>
                  </li>
                </ul>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={7.5} style={{height: '100%' }}>
            <Item>
              <Outlet/>
            </Item>
          </Grid>
        </Grid>
      </Box>

    </section>
  );
};

export default ProProfile;

import React from 'react';
import './pros.css';
import proImage from '../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';
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
import {
  Outlet,
  Link,
} from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Appointment = () => {
  return (
    <section className="pro-profile">
      <Box sx={{ flexGrow: 1, backgroundColor: '#f8f9fa' }}>
        <Grid
          container
          spacing={2}
          // alignItems="stretch"
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={5} lg={3}>
            <Item >
              <div className="pro-profile-menu">
                <img className="pro-profile-menu-image"
                  src={proImage}
                  alt=""/>
                <h2>Dr. Prenom Nom</h2>
                <h3>BDS. Osteology</h3>
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
                    <Link to="password">Account Settings</Link>

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
          <Grid item xs={12} sm={12} md={6} lg={8} style={{height: '100%' }}>
            {/* <Item> */}
            <div className="u-container-layout u-container-layout-2">
              <Outlet/>
            </div>
            {/* </Item> */}
          </Grid>
        </Grid>
      </Box>

    </section>
  );
};

export default Appointment;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Colors from '@mui/material/colors';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import PracticianTable from './PracticianTable';
import ClientsTable from './ClientsTable';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import PeopleIcon from '@mui/icons-material/People';
import axios from 'axios';

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
    width: '90%',
  },
}));

const DashboardCard = ({number, color, label, icon}) => {
  return(
    <Card sx={{margin: '10px'}}>
      <CardContent sx={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '70%'}}>
          <Typography variant="body2" color="text.secondary"
            style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
            {label}
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {number}
          </Typography>
        </div>

        <Avatar sx={{ bgcolor: Colors[color] ? Colors[color][500] : Colors.blue[500] }}>
          {icon ? icon : <FolderIcon />}
        </Avatar>
      </CardContent>
    </Card>
  );
};

DashboardCard.propTypes = {
  number: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element
};

const Dashboard = () => {
  const [clientStats, setclientStats] = useState({});
  const [proStats, setproStats] = useState({});
  useEffect(() => {
    axios.get('http://localhost:2021/getAllClients')
      .then(response => {
        if (response.data) {
          const verified = response.data.filter(r => r.status.data[0] === 1).length;
          const unverified = response.data.filter(r => r.status.data[0] === 0).length;

          let res = {
            total : response.data.length,
            number_verified : verified,
            number_unverified : unverified
          };
          console.log(res);
          setclientStats(res);
        }
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:2021/getAllPros')
      .then(response => {
        if (response.data) {
          const verified = response.data.filter(r => r.status.data[0] === 1).length;
          const unverified = response.data.filter(r => r.status.data[0] === 0).length;

          let res = {
            total : response.data.length,
            number_verified : verified,
            number_unverified : unverified
          };
          console.log(res);
          setproStats(res);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Root >
        <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 , lg: 12}}>
          {/* {Array.from(Array(6)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))} */}
          <Grid item xs={4} sm={4} md={6} lg={3} xl={3} >
            <DashboardCard number={proStats.total} color='green' label='Number of Practicians'
              icon={<PeopleIcon/>}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6} lg={3} xl={3}>
            <DashboardCard number={clientStats.total} color='blue' label='Number of Clients'
              icon={<PeopleIcon/>}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6} lg={3} xl={3}>
            <DashboardCard number={proStats.number_unverified} color='red' label='Number of Unverified Practicians'
              icon={<NoAccountsIcon/>}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={6} lg={3} xl={3} >
            <DashboardCard number={clientStats.number_unverified} color='yellow' label='Number of Unverified Clients'
              icon={<NoAccountsIcon/>}
            />
          </Grid>
        </Grid>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 , lg: 12}}>
          <Grid item xs={4} sm={8} md={12} lg={6}>
            <PracticianTable/>
          </Grid>
          <Grid item xs={4} sm={8} md={12} lg={6}>
            <ClientsTable/>
          </Grid>
        </Grid>
      </Root>
    </div>
  );
};

export default Dashboard;

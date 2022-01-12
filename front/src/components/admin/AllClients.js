import React from 'react';
import { styled } from '@mui/material/styles';
import ClientsTable from './ClientsTable';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  margin: 'auto',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '60%',
  },
}));
const AllClients = () => {
  return (
    <Root>
      <ClientsTable/>
    </Root>
  );
};

export default AllClients;

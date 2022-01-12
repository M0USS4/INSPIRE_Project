/* eslint-disable no-useless-escape */
import {React, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import PracticianTable from './PracticianTable';
import axios from 'axios';

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

const AllPracticians = () => {
  useEffect(() => {
    axios.get('http://localhost:2021/getAllPros')
      .then(response => {
        if (response.data) {
          console.log(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <Root>
      <PracticianTable/>
    </Root>
  );
};

export default AllPracticians;

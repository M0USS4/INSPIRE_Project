import { Paper, styled } from '@mui/material';
import React from 'react';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CustomLink = styled('a')(() => ({
  textDecoration: 'none',
  color: 'white'
}));

const LinksManual = () => {
  return (
    <div>
      <Item >
        <div >
          <ul className="pro-profile-menu-list">
            <li>
              <CustomLink href='http://localhost:3000/admin'>Admin</CustomLink>
              <ul className="pro-profile-menu-list">
                <li>
                  <CustomLink href='http://localhost:3000/admin/all-practicians'>All Practicians</CustomLink>
                </li>
                <li>

                  <CustomLink href='http://localhost:3000/admin/all-clients'>All Clients</CustomLink>
                </li>
                <li>

                  <CustomLink href='http://localhost:3000/admin/create-practice'>Create Practice</CustomLink>
                </li>
              </ul>
            </li>
            <li>
              <CustomLink href='http://localhost:3000/admin'>Register</CustomLink>
              <ul className="pro-profile-menu-list">
                <li>
                  <CustomLink href='http://localhost:3000/register'>Register Clients</CustomLink>
                </li>
                <li>
                  <CustomLink href='http://localhost:3000/register-pro'>Register Pro</CustomLink>
                </li>
              </ul>
            </li>
            <li>
              <CustomLink href='http://localhost:3000/home'>Home</CustomLink>
              <br/>
              From this page, The flow to create an appoinments is easy
              Note: When logged in as a Pro, all pro pages can be accessed and vice versa for Clients
            </li>
          </ul>
        </div>
      </Item>
    </div>
  );
};

export default LinksManual;

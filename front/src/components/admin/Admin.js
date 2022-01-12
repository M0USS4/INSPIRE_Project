import React, { useState } from 'react';
import './Admin.css';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Outlet } from 'react-router-dom';
const style = {
  // height: '100%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

const Admin = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <section className="pro-profile">
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Dashboard" value={1}/>
                <Tab label="Practicians" value={2} />
                <Tab label="Clients" value={3}/>
                <Tab label="Reviews" value={4} />
              </TabList>
            </Box>
            <TabPanel sx={{ height: '100%' }}>
              <h1>Hi</h1>
            </TabPanel>
          </TabContext>
        </Box>
        <Outlet />
      </Box>
    </section>
  );
};

export default Admin;

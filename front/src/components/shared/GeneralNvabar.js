import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import logo from '../../images/logo-inverse.png';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const drawerWidth = 240;
const Div = styled('div')(() => ({
}));
function GeneralNvabar({list, setisDarkMode, isDarkMode, ...props}) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navlist, setnavlist] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  //   const loggedIn = true;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setnavlist(list);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar
        color="white"
        sx={{backgroundColor: 'primary.light', justifyContent: 'center', textTransform: 'uppercase'}}>
          Menu
      </Toolbar>
      <Divider />
      <List>
        {navlist && navlist.map((link, index) => (
          <ListItem button key={link.text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{backgroundColor: 'primary.main'}}
      >
        <Toolbar
          sx={{ justifyContent: 'space-between'}}
        >
          <Link to="/">
            <img className="logo" style={{height: '60px'}} src={logo} alt="Logo" />
          </Link>

          <Div sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'space-evenly', alignItems: 'center'}}>
            <ul style={{display: 'flex', justifyContent: 'space-evenly'}}>
              {navlist && navlist.map(item => (
                <li key={item.text} style={{listStyleType: 'none', margin:'auto 25px'}}>
                  <Link  sx={{color: 'white'}} >{item.text}</Link>
                </li>
              ))}
            </ul>
            <div>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <AccountCircleIcon sx={{ width: 32, height: 32, color: 'white' }} fontSize="large"/>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar /> Personnel
                </MenuItem>
                <MenuItem>
                  <Avatar /> Practicien
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={()=> setisDarkMode(!isDarkMode)}
            sx={{ mr: 2 }}
          >
            {isDarkMode ? <LightModeIcon/> : <DarkModeIcon/>}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 , display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{  flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

GeneralNvabar.propTypes = {
  window: PropTypes.func,
  list: PropTypes.array,
  setisDarkMode: PropTypes.func,
  isDarkMode: PropTypes.bool
};

export default GeneralNvabar;
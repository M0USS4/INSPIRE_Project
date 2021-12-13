import './navbar.css';
import logo from './images/logo.JPG';
import menu from './images/menu.png';
import {React, useState} from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {

  // const onClick = () => {
  //   console.log(!visibility);
  //   setvisibility(!visibility);
  // };

  const [anchorEl, setAnchorEl] = useState(null);
  const loggedIn = true;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section>
      <div className="navbar">
        <div className="container">
          <a href="#">
            <img className="logo" src={logo} alt="Logo" />
          </a>
          {loggedIn &&
          <div className="nav-container">
            <ul className="nav">
              <li>
                <a href="#">Spécialités</a>
              </li>
              <li>
                <a href="#">Actualités</a>
              </li>
              <li>
                <a href="#">Boutique</a>
              </li>
            </ul>
            <div className="pro">
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Account settings">
                  <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                    <AccountCircleIcon sx={{ width: 32, height: 32, color: '#009BA4' }} fontSize="large"/>
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
          </div>
          }
          <img className="mobile-menu" src={menu} alt="menu" />
          {!loggedIn &&  <button className="connect button1" >
                  Se connecter
          </button>

          }

        </div>
      </div>
	  {/* <div>
        <ul className="line-display">
          <li>
            <img className="small-top-logo" src ={logo}/>
          </li><li className="spaced-elements">
            <h5 className="hover-link"> <a href="https://localhost" className="link-no-link">Spécialités</a></h5>
          </li><li className="spaced-elements">
            <h5 className="hover-link"> <a href="https://localhost" className="link-no-link">Actualités</a></h5>
          </li><li className="spaced-elements">
            <h5 className="hover-link"> <a href="https://localhost" className="link-no-link">Boutique</a></h5>
          </li>
          <li className="fix-right">
            <div className="hover-button">
              <button  className="typical_button" >Vous êtes praticien?</button>
            </div>
            <div className="div-input-group" id="connexion-nav-button">
              <button  className="input-noborder">Connexion</button>
              <img className="connexion-small-arrow" src="images/liteArrow.png"/>
            </div>
          </li>
        </ul>
	  </div>
      <div
	  id="float-menu-toShow" className="float-menu"
	  style={{visibility: visibility ? 'visible' : 'collapse'}}
	  onClick={onClick}>
        <img className="top-hidden-triangle" src="images/settingsLiteArrow.png"/>
        <div className="main-hidden-square">
          <a className="textButton hover-link" href="https://localhost">Praticien</a>
          <a className="textButton hover-link" href="https://localhost">Personnel</a>
        </div>
      </div> */}
    </section>
  );
}

export default Navbar;
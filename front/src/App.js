import { React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/home';
import LoginUsers from './components/login/login-users';
import UserRegistration from './components/register/register-users';
import MyClients from './components/pros/MyClients';
import Clients from './components/clients/clients';
import Search from './components/clients/search';
import ProfileSettings from './components/pros/ProfileSettings';
import Customization from './components/pros/Customization';
import ClientAppointment from './components/clients/ClientsAppointment/ClientAppointment';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import Dashboard from './components/admin/Dashboard';
import AllPracticians from './components/admin/AllPracticians';
import AllClients from './components/admin/AllClients';
import Admin from './components/admin/Admin';
import { Link, styled } from '@mui/material';
import Appointments from './components/pros/Appointments';
import ProProfile from './components/pros/ProProfile';
import PublicProProfile from './components/clients/PublicProProfile';
import ProfessionalRegistration from './components/register/register-pros';
import GeneralNvabar from './components/shared/GeneralNvabar';
import MyAppointments from './components/clients/ClientsAppointment/MyAppointments';
import CreatePracticeType from './components/admin/CreatePracticeType';
import authService from './components/helpers/auth.service';
import NotFound from './components/shared/404';
import LinksManual from './components/shared/LinksManual';

const baseTheme = createTheme({
  typography: {
    'fontFamily': '"Poppins", "Helvetica", "Arial", sans-serif',
    'fontSize': 14,
    'fontWeightLight': 300,
    'fontWeightRegular': 400,
    'fontWeightMedium': 500
  },
});

const LightMode = createTheme({
  ...baseTheme,
  palette: {
    type: 'light',
    primary: {
      main: '#009BA4',
      light: '#f0fafe'
    },
    secondary: {
      main: '#f0fafe',
      light: '#eef2f7',
      contrastText: '#f0fafe'
    }
  }
});

const DarkMode = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    type: 'dark',
    primary: {
      main: '#009BA4',
      light: '#2f2f2f'
    },
    secondary: {
      main: '#f0fafe',
      light: '#121212',
      contrastText: '#2f2f2f'
    }
  }
});
const Div = styled('div')(() => ({
}));

const App = () => {
  const isAdmin = false;
  const [isDarkMode, setisDarkMode] = useState(false);
  const navlist = [
    {
      text: 'Sp??cialit??s',
      link: <Link to="dashboard">Sp??cialit??s</Link>
    },
    {
      text: 'Actualit??s',
      link: <Link to="dashboard">Actualit??s</Link>
    },
    {
      text: 'Boutique',
      link: <Link to="dashboard">Boutique</Link>
    }
  ];

  const adminNavList = [
    {
      text: 'Dashboard',
      link: <Link to="dashboard">Dashboard</Link>
    },
    {
      text: 'All Practicians',
      link: <Link to="/admin/all-practicians">All Practicians</Link>
    },
    {
      text: 'All Clients',
      link: <Link to="all-clients">All Clients</Link>
    }
  ];

  const logout = () => {
    authService.logout();
    window.location = '/';
  };
  return (
    <ThemeProvider  theme={isDarkMode ? DarkMode : LightMode}>
      <Div className="App" sx={{backgroundColor: 'secondary.light'}}>
        <GeneralNvabar
          list={isAdmin ? adminNavList : navlist}
          setisDarkMode={setisDarkMode}
          isDarkMode={isDarkMode}
          logout={logout}/>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="*" element={<NotFound/>} />
            <Route path="/manual" element={<LinksManual />} />
            <Route path="/login" element={<LoginUsers />}/>
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/register-pro" element={<ProfessionalRegistration />} />
            <Route path="/search" element={<Search />} />

            <Route exact path="/pro-profile" element={<ProProfile />} >
              <Route exact path="/pro-profile"
                element={<Appointments className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route  path="appointments/:id"
                element={<Appointments className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route  path="customization/:id"
                element={<Customization className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route path="my-clients/:id"
                element={<MyClients className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route path="profile-settings/:id"
                element={<ProfileSettings className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
            </Route>
            <Route path="practician/:id"
              element={<PublicProProfile />}
            />

            <Route path="practician/:id/booking"
              element={<ClientAppointment />}
            />

            <Route path="/clients/:id" element={<Clients />} >
              <Route exact path="/clients/:id"
                element={<MyAppointments className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route path="my-appoinments"
                element={<MyAppointments className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
            </Route>
            {/* <PrivateRoute component={Admin} path="/admin" exact /> */}

            <Route path="/admin"
              element={
                // <PrivateRoute>
                <Admin />
                // </PrivateRoute>
              } >
              <Route exact path="/admin"
                element={<Dashboard />}
              />
              <Route path="dashboard"
                element={<Dashboard />}
              />
              <Route  path="all-practicians"
                element={<AllPracticians />}
              />
              <Route  path="all-clients"
                element={<AllClients />}
              />
              <Route  path="create-practice"
                element={<CreatePracticeType />}
              />
            </Route>

          </Routes>
        </Router>
      </Div>
    </ThemeProvider >

  );
};

export default App;
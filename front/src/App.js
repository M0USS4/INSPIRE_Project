import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';
import Home from './home';
import LoginUsers from './components/login/login-users';
import LoginProfessionals from './components/login/login-pros';
import ProfessionalRegister from './components/register/register-pros';
import UserRegistration from './components/register/register-users';
import Appointment from './components/pros/appointment';
import Scheduler from './components/pros/Scheduler';
import MyClients from './components/pros/MyClients';
import Picker from './components/shared/Picker';
import Clients from './components/clients/clients';
import Search from './components/clients/search';
import ProfileSettings from './components/pros/ProfileSettings';
import Customization from './components/pros/Customization';
import ProfessionalProfile from './components/clients/ProfessionalProfile';
import ClientAppointment from './components/clients/ClientsAppointment/ClientAppointment';
import { ThemeProvider , createMuiTheme } from '@mui/material/styles';

const THEME = createMuiTheme({
  typography: {
    'fontFamily': '"Poppins", "Helvetica", "Arial", sans-serif',
    'fontSize': 14,
    'fontWeightLight': 300,
    'fontWeightRegular': 400,
    'fontWeightMedium': 500
  },
  palette: {
    primary: {
      main: '#009BA4'
    }
  }
});

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api')
      .then((res) => {
        setData(res.data.message);
        console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <ThemeProvider  theme={THEME}>
      <div className="App">
        <header className="App-header">
          <Navbar></Navbar>
        </header>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/login" element={<LoginUsers />}/>
            <Route path="/login-pro" element={<LoginProfessionals />}/>
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/register-pro" element={<ProfessionalRegister />} />
            <Route path="/search" element={<Search />} />

            <Route path="/pro-profile" element={<Appointment />} >
              <Route exact path="/pro-profile"
                element={<Scheduler className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route  path="appointments"
                element={<Scheduler className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route  path="customization"
                element={<Customization className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route path="clients"
                element={<MyClients className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route path="profile-settings"
                element={<ProfileSettings className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
            </Route>
            <Route path="pro-profile/:id"
              element={<ProfessionalProfile />}
            />

            <Route path="pro-profile/:id/booking"
              element={<ClientAppointment />}
            />

            <Route path="/clients" element={<Clients />} >
              <Route exact path="/clients"
                element={<Picker className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route  path="booking"
                element={<Picker className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route path="clients"
                element={<MyClients className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
            </Route>

          </Routes>
        </Router>
      </div>
    </ThemeProvider >

  );
}

export default App;
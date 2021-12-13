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
import MyClients from './components/pros/my-clients';
import Picker from './components/shared/Picker';
import Clients from './components/clients/clients';
import Search from './components/clients/search';

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
    <div className="App">
      <header className="App-header">
        <Navbar></Navbar>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/login" element={<LoginUsers />}/>
            <Route path="/login-pro" element={<LoginProfessionals />}/>
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/register-pro" element={<ProfessionalRegister />} />
            <Route path="/search/:practice/:location" element={<Search />} />

            <Route path="/pro-profile" element={<Appointment />} >
              <Route exact path="/pro-profile"
                element={<Scheduler className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route  path="appointments"
                element={<Scheduler className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
              <Route path="clients"
                element={<MyClients className="u-expanded-width u-image u-image-default u-image-2"/>}
              />
            </Route>

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
      </header>
    </div>
  );
}

export default App;
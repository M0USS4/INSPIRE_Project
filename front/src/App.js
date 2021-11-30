import { React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios'
import Navbar from './navbar';
import Home from './home'
import LoginUsers from './components/login/login-users';
import LoginProfessionals from './components/login/login-pros';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/api")
      .then((res) => {
        setData(res.data.message)
      })
      .catch(err => console.log(err))
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
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
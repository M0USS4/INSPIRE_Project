import React from 'react';
import '../pros/pros.css';

import {
  Outlet,
} from 'react-router-dom';

const Clients = () => {
  return (
    <section>
      <Outlet/>
    </section>
  );
};

export default Clients;

import React from 'react';
import './pros.css';
import proImage from '../../images/ben-parker-OhKElOkQ3RE-unsplash.jpg';

import {
  Outlet,
  Link,
} from 'react-router-dom';

const Appointment = () => {
  return (
    <section className="u-clearfix u-section-1" id="sec-c4ab">
      <div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
          <div className="u-layout">
            <div className="u-layout-row">
              <div
                className="u-container-style u-layout-cell
                u-size-21-lg u-size-21-md u-size-21-sm u-size-21-xs u-size-23-xl u-layout-cell-1">
                <div className="u-container-layout u-container-layout-1">
                  <img className="u-image u-image-circle u-image-1"
                    src={proImage}
                    alt="" data-image-width="4480" data-image-height="6720" />
                  <h5 className="u-text u-text-default u-text-1">Dr. Prenom Nom</h5>
                  <p className="u-text u-text-default u-text-2"> BDS. Osteology<br/>
                    <a href="https://doccure-react.dreamguystech.com/template/doctor/doctor-dashboard"
                      className="u-active-none u-border-none u-btn
                      u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1"><i></i>
                    </a>
                  </p>
                  <ul className="u-custom-list u-indent-0 u-spacing-27 u-text u-text-3">
                    <li>
                      <div className="u-list-icon u-list-icon-1">
                      </div>
                      <Link to="appointments">Appointments</Link>
                    </li>
                    <li>
                      <div className="u-list-icon u-list-icon-2">
                      </div>
                      <Link to="clients">Clients</Link>

                    </li>
                    <li>
                      <div className="u-list-icon u-list-icon-3">
                      </div>
                      <Link to="reviews">Reviews</Link>

                    </li>
                    <li>
                      <div className="u-list-icon u-list-icon-1">
                      </div>
                      <Link to="social media">Soicial Media</Link>

                    </li>
                    <li>
                      <div className="u-list-icon u-list-icon-1">
                      </div>
                      <Link to="password">Change Password</Link>

                    </li>
                    <li>
                      <div className="u-list-icon u-list-icon-1">
                      </div>
                      <Link to="logout">Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="u-container-style u-layout-cell u-size-37-xl
              u-size-39-lg u-size-39-md u-size-39-sm u-size-39-xs u-layout-cell-2">
                <div className="u-container-layout u-container-layout-2">
                  {/* <img className="u-expanded-width u-image u-image-default u-image-2"
                    src="images/appTest.PNG" alt="" data-image-width="1906" data-image-height="700" /> */}
                  <Outlet/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;

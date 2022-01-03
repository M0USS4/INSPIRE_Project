import {React, useState} from 'react';
import { useNavigate } from 'react-router';
import Modal from '@mui/material/Modal';
import { Card } from '@mui/material';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import './home.css';
import animate from '../../images/massage-therapist-animate.svg';

const UserType = {
  Client: 'client',
  Professional: 'Professional'
};

const HomePopup = ({open, handleClose}) => {
  let navigate = useNavigate();

  const [checked, setChecked] = useState({
    client: false,
    professional: false
  });
  const handleChange = (type, e) => {
    switch (type){
    case UserType.Client:
      setChecked({
        client: e.target.checked,
        professional: !e.target.checked
      });
      break;
    case UserType.Professional:
      setChecked({
        client: !e.target.checked,
        professional: e.target.checked
      });
      break;
    }
  };

  const handleConfirm = () => {
    if(checked.client === true){
      handleClose();
    }
    else if(checked.professional === true){
      navigate('register-pro');
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        className="home-popup"
      >
        <Card sx={style} >
          <div className="modal-title">
            <span>Choose an Account</span>
          </div>
          <div className="modal-container">
            <div className="modal-banner">
              <img src={animate} alt="" />
            </div>
            <div className="modal-content-container">
              <div className="modal-content">
                <h3>Client</h3>
                <Switch
                  checked={checked.client}
                  onChange={(e) => handleChange(UserType.Client, e)} size="large" />
              </div>
              <div className="modal-content">
                <h3>Professional</h3>
                <Switch
                  checked={checked.professional}
                  onChange={(e) => handleChange(UserType.Professional, e)} size="large" />
              </div>
            </div>
          </div>

          <div className="modal-button button1" onClick={handleConfirm}>Confirm</div>

        </Card>
      </Modal>
    </div>
  );
};

HomePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func
};
export default HomePopup;

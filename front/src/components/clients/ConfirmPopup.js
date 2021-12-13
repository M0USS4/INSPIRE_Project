import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import { Card } from '@mui/material';

const ConfirmPopup = ({open, handleClose, data}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className="home-popup"
      >
        <Card sx={style} >
          <h1>Confirm</h1>
          <h2>{data.id.name}</h2>
          <h3>{data.id.address}</h3>
          <h3>{data.id.code} {data.id.city}</h3>
          <h2>{data.day} {data.date}</h2>
          <h2>{data.time}</h2>
        </Card>
      </Modal>
    </div>
  );
};

ConfirmPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
  data: PropTypes.object
};

export default ConfirmPopup;

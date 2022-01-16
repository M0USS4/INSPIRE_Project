import React from 'react';
import propTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ClickType } from './types';

const DialogAlert = ({ handleClose, handleBlock,handleManage,type, open}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {type.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {type.subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={type === ClickType.block ? handleBlock : handleManage} autoFocus>
          {type.type}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogAlert.propTypes = {
  open: propTypes.bool,
  handleBlock: propTypes.func,
  handleUnblock: propTypes.func,
  handleManage: propTypes.func,
  handleClose: propTypes.func,
  type: propTypes.object
};
export default DialogAlert;

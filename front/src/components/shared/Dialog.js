import React from 'react';
import propTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ClickType } from './types';

// import { useForm } from 'react-hook-form';

const DialogAlert = ({ handleClose, handleBlock,handleManage,type, open}) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = (data) =>{
//     console.log(data);
//   };
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
        {/* <div className={`field-container ${errors.title ? 'invalid' : ''}`}>
          <label htmlFor="nom"><b>Nom</b></label>
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            {...register('title', { required: true, maxLength: 30, minLength: 2 })}
          />
        </div> */}
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

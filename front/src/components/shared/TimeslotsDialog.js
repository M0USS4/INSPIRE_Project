import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CollapsableAlert from './CollapsableAlert';

const addButtonStyle = {
  border: 'none',
  background: 'none',
  textTransformation: 'none',
  boxShadow: 'none',
  color: '#009ba4'
};
const removeButtonStyle = {
  color: 'red'
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const TimeslotsDialog =
({open, currentDay, currentTimeslots, handleAddTimeslots,rangeErrorMessage,
  addTimeslotFormFields, removeTimeslotFormFields, startTimes, setopenRangeErrorAlert, openRangeErrorAlert}) => {

  const handleClose = () => {
    open = false;
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="timeslotDialog"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Edit Timeslots for {currentDay}
          <CollapsableAlert
            message={rangeErrorMessage}
            setopen={setopenRangeErrorAlert}
            open={openRangeErrorAlert}
          />
        </BootstrapDialogTitle>
        <DialogContent dividers>

          {currentTimeslots && currentTimeslots.map((timeslot, index) => (
            <div key={'s' + index}>
              <h3>Slot</h3>

              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                <Grid item  className="schedule_days" key={'t' + index}>
                  <label htmlFor="start"><b>Start Time</b></label>
                  <select
                    value={timeslot.start}
                    onChange={e => handleAddTimeslots(index, e)}
                    name="start"
                    className="form-control">
                    {startTimes.map( (start,i) =>
                      (<option key={i} disabled={start.status}>{start.time}</option>)
                    )}
                  </select>
                </Grid>
                <Grid item  className="schedule_days" key={index}>
                  <label htmlFor="end"><b>End Time</b></label>
                  <select
                    value={timeslot.end ? timeslot.end :
                      parseInt(timeslot.start) + 1 + ' : 00'}
                    onChange={e => handleAddTimeslots(index, e)}
                    name="end"
                    className="form-control">
                    {startTimes.map( (end,i) =>
                      (<option key={i} disabled={end.status || timeslot.start >= end.time}>{end.time}
                        {console.log(end.status )}</option>)
                    )}
                  </select>
                </Grid>
                <Grid item  className="schedule_days" key={index}>
                  {
                    index ?
                      <IconButton
                        size="large"
                        style={removeButtonStyle}
                        onClick={() => removeTimeslotFormFields(index)}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      : null
                  }
                </Grid>
              </Grid>
            </div>
          ))}
          <LoadingButton
            onClick={() => addTimeslotFormFields()}
            endIcon={<AddCircleOutlineIcon />}
            loading={false}
            loadingPosition="end"
            variant="contained"
            style={addButtonStyle}
          >
                  add slot
          </LoadingButton>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
              Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
TimeslotsDialog.propTypes = {
  open: PropTypes.bool,
  currentDay: PropTypes.object,
  currentTimeslots: PropTypes.array,
  handleAddTimeslots: PropTypes.func.isRequired,
  addTimeslotFormFields: PropTypes.func.isRequired,
  removeTimeslotFormFields: PropTypes.func.isRequired,
  setopenRangeErrorAlert: PropTypes.func.isRequired,
  openRangeErrorAlert: PropTypes.bool.isRequired,
  rangeErrorMessage: PropTypes.string,
  startTimes: PropTypes.array,
};

export default TimeslotsDialog;

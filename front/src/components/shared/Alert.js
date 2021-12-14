import React from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const CollapseAlert = ({message, setopen, open}) => {
  return (
    <Collapse in={open}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setopen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  );
};

CollapseAlert.propTypes = {
  message: PropTypes.string.isRequired,
  setopen: PropTypes.func.isRequired,
  open: PropTypes.bool
};
export default CollapseAlert;

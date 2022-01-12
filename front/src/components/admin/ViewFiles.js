import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ViewFiles = ({  open, setopen}) => {
  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <embed
          src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0"
          type="application/pdf"
          frameBorder="0"
          scrolling="auto"
          height="100%"
          width="100%"
        ></embed>
      </Modal>
    </div>
  );
};

ViewFiles.propTypes = {
  files: PropTypes.array,
  open: PropTypes.bool,
  setopen: PropTypes.func,

};
export default ViewFiles;

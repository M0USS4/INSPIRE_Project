import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
const style = {

  height: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TabModal = ({files, open, setopen}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => setopen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="View CV" value={0} />
                <Tab label="View Diploma" value={1} />
              </TabList>
              <IconButton onClick={ handleClose}>
                <CloseIcon/>
              </IconButton>

            </Box>
            { files && files.map((tab, index)=> (
              <TabPanel key={index} value={index} index={index} sx={{height: '100%'}}>
                {/* {tab.component} */}
                <embed
                  src={tab}
                  type="application/pdf"
                  frameBorder="0"
                  scrolling="auto"
                  height="100%"
                  width="100%"
                ></embed>
                {tab}
                <iframe
                  src={tab}
                  frameBorder="0"
                  scrolling="auto"
                  height="100%"
                  width="100%"
                ></iframe>
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </Modal>
    </div>
  );
};

TabModal.propTypes = {
  files: PropTypes.array,
  open: PropTypes.bool,
  setopen: PropTypes.func,

};
export default TabModal;

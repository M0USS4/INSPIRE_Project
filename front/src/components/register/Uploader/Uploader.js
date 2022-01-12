import {React, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import avatar from '../../../images/avatar.png';
import pdf from '../../../images/pdf.png';
import './Uploader.css';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// const Input = styled('input')({
//   display: 'none',
// });

const Uploader = ({ uploadSingleFile , file, title, type}) => {
  const [accept, setaccept] = useState('image/*, .pdf, .doc');
  useEffect(() => {
    switch (type){
    case 'image':
      setaccept('image/*');
      break;
    case 'pdf':
      setaccept('.pdf, .doc');}
    // setaccept('image/*, .pdf, .doc');
  }, [accept]);

  return (
    <div className="file-uploader">

      <div className="upload-content">
        {type === 'image' ?
          file ? <img src={file} alt='' className="image-preview" /> :
            <div>
              <img src={avatar} alt='' className="image-preview" />
            </div>
          :
          <div>
            <img src={pdf} alt='' className="image-preview" />
          </div>
        }

      </div>
      <div className="form-group">
        <input type="file" className="choose-file" onChange={uploadSingleFile} accept={accept}/>
        <label htmlFor="file">{title}</label>
      </div>

      {/* <label htmlFor="contained-button-file">
        {accept}
        {accept && <Input  onChange={uploadSingleFile} accept={accept} id="contained-button-file" type="file" />}
        <Button variant="outlined" component="span" sx={{backgroundColor: 'white'}}>
          {title}
        </Button>
      </label> */}

      {/* <button  className="upload-button" onClick={upload}>{title}</button> */}
    </div>

  );
};

Uploader.propTypes = {
  uploadSingleFile: PropTypes.func,
  upload: PropTypes.func,
  type: PropTypes.oneOf(['image', 'pdf']),
  file: PropTypes.instanceOf(Blob),
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default Uploader;

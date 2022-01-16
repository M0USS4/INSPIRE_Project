import {React, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import avatar from '../../../images/avatar.png';
import pdf from '../../../images/pdf.png';
import './Uploader.css';

const Uploader = ({ uploadSingleFile , file, title, type}) => {
  const [accept, setaccept] = useState('image/*, .pdf, .doc');
  useEffect(() => {
    switch (type){
    case 'image':
      setaccept('image/*');
      break;
    case 'pdf':
      setaccept('.pdf, .doc');}
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

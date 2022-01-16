import {React, useState} from 'react';
import PropTypes from 'prop-types';
import Uploader from './Uploader/Uploader';
import './register-pros.css';
import authService from '../helpers/auth.service';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register2 = ({data, setmessage, setopen, setsuccess, handleBack}) => {
  const navigate =  useNavigate();
  const [files, setfile] = useState([]);
  const uploadSingleFile = (id, e) => {
    setfile([...files, {
      [id]: e.target.files[0],
      name: id,
      data: e.target.files[0]
    }]);
  };

  const upload = (e) => {
    e.prevenDefault;
    if(files.length === 3){
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      for(let file of files){
        formData.append('files', file.data, `${file.name}`);
      }
      authService.registerPro(formData)
        .then(() => {
          setopen(true);
          setmessage('Registered');
          setsuccess(true);
          navigate('/login');
        })
        .catch(err => {
          console.log(err);
          setopen(true);
          setmessage(err.data);
          setsuccess(false);
        });
    }
    else{
      alert('select all files');
    }
  };

  return (
    <form >
      <div className="register-uploader">
        <Uploader
          className="register-uploader-content"
          upload={upload}
          uploadSingleFile={(e) => uploadSingleFile('image', e)}
          index={1}
          file={files['image']}
          title="Choose image"
          type="image"
        />
        <Uploader
          upload={upload}
          uploadSingleFile={(e) => uploadSingleFile('cv', e)}
          index={2}
          file={files['cv']}
          title="Choose CV"
          type="pdf"
        />
        <Uploader
          upload={upload}
          uploadSingleFile={(e) => uploadSingleFile('diplome', e)}
          index={3}
          file={files['diplome']}
          title="Choose Diplome"
          type="pdf"
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', margin: '10px', gap: '10px'}}>
        <Button onClick={handleBack}>Back</Button>
        <Button variant='contained' type="button" onClick={(e) => upload(e)}>Upload Files</Button>
      </div>

    </form >
  );
};

Register2.propTypes = {
  data: PropTypes.object,
  onsubmit: PropTypes.func,
  setsuccess: PropTypes.func,
  setopen: PropTypes.func,
  setmessage: PropTypes.func,
  handleBack: PropTypes.func,
};
export default Register2;

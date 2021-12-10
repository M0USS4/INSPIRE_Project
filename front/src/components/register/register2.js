import {React, useState} from 'react';
// import avatar from '../../images/avatar.png';
import Uploader from './Uploader/Uploader';
import './register-pros.css';

const Register2 = () => {
  const [file, setfile] = useState({});
  const uploadSingleFile = (id, e) => {
    setfile({...file, [id]: URL.createObjectURL(e.target.files[0])});
  };

  const upload = () => {
    const formData = { image: file };
    console.log(formData);

    // let url = 'http://localhost:8000/...';
    // axios.post(url, formData, {
    // })
    //   .then(res => {
    //     console.log(res.data);
    //   });

  };
  return (
    <form>
      <div className="register-uploader">
        <Uploader
          className="register-uploader-content"
          upload={upload}
          uploadSingleFile={(e) => uploadSingleFile(1, e)}
          index={1}
          file={file[1]}
          title="Upload image"
          type="image"
        />
        <Uploader
          upload={upload}
          uploadSingleFile={(e) => uploadSingleFile(2, e)}
          index={2}
          file={file[2]}
          title="Upload CV"
          type="pdf"
        />
        <Uploader
          upload={upload}
          uploadSingleFile={(e) => uploadSingleFile(3, e)}
          index={3}
          file={file[3]}
          title="Upload Diplome"
          type="pdf"
        />
      </div>

    </form >
  );
};

export default Register2;

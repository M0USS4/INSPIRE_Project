import React from 'react';
import imgNotFound from '../../images/404-error-animate.svg';
const NotFound = () => {
  return (
    <div style={{display: 'flex', justifyContent:'center', alignContent: 'center', height:'100%'}}>
      <img src={imgNotFound} alt="" style={{maxHeight: '600px'}}/>
    </div>
  );
};

export default NotFound;

import React from 'react';
import imgNotFound from '../../images/404-error-animate.svg';
const NotFound = () => {
  return (
    <div style={{display: 'flex'}}>
      <img src={imgNotFound} alt="" />
    </div>
  );
};

export default NotFound;

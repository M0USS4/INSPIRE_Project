import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import authService from '../helpers/auth.service';

const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  return (
    authService.isLogin() ?
      children
      : navigate('/login')
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
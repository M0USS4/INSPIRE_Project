import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = 'http://localhost:2021/';

class AuthService {
  async login(loginData) {
    return axios
      .post(API_URL + 'login/post', loginData)
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  decodeToken(){
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      return jwt_decode(user.token);
    }

    return null;
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(registerData) {
    return axios.post(API_URL + 'register/post', registerData);
  }

  registerPro(registerData) {
    return axios.post(API_URL + 'register/pro/post', registerData);
  }

  getCurrentUser() {
    const decoded = this.decodeToken();
    if(decoded){
      return decoded.infos;

    }
    return null;
  }

  isLogin(){
    if (localStorage.getItem('user')) {
      return true;
    }

    return false;
  }
}

export default new AuthService();
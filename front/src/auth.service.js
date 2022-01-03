import axios from 'axios';

const API_URL = 'http://localhost:2021/';

class AuthService {
  async login(loginData) {
    return axios
      .post(API_URL + 'login/post', loginData)
      .then(response => {
        if (response.data.token) {
          console.log(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('userInfo');
  }

  register(registerData) {
    return axios.post(API_URL + 'register/post', registerData);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
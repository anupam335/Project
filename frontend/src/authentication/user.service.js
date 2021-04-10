import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080';

class UserService {
  getPublicContent(id) {
    return axios.get(`${API_URL}/user/details/${id}`,{headers: authHeader()})
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  addWorkDesc(userId) {
    return axios.post(`${API_URL}/user/regWorkDesc/${userId}`, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();

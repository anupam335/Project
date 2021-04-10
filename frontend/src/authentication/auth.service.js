import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";
const base_url = "http://localhost:8080";

class AuthService {



  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, fName, lName, dob, address, phoneNo, gender, role, workCategory) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      fName,
      lName,
      dob,
      address,
      phoneNo,
      gender,
      role,
      workCategory
    });
  }

  addWorkDesc(id, workAmount, description, location, category) {
    return axios.post(`${base_url}/user/regWorkDesc/${id}`, {
      workAmount,
      description,
      location,
      category
    }, { headers: authHeader() });
  }

  updateUser(id, fName, lName, email, dob, phoneNo, gender, address) {
    return axios.put(`${base_url}/user/update/${id}`, {
      fName,
      lName,
      email,
      dob,
      phoneNo,
      gender,
      address
    }, { headers: authHeader() });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getUserDetails(id) {
    return axios
      .get(base_url + "details", {
        id
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("details", JSON.stringify(response.data));
        }

        console.log(response.data);
      });
  }


}

export default new AuthService();

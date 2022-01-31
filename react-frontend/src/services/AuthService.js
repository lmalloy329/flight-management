import axios from "axios";

const AUTH_API_URL = "http://localhost:8080/api/test/";

class AuthService {
  // goal:logs in by submitting the username and password to the bvackend, if it receives a token back it knows the user is correct and stores it in local storage so the user is persistently logged in
  // now it logs user in and stores user in session storage, i know this is security risk.
  login(username, password) {
    // axios.post(AUTH_API_URL+"sign-in",{username,password}).then(response =>{
    //     console.log("hi")

    //     if(response.data.accessToken){
    //         localStorage.setItem("user", JSON.stringify(response.data))
    //     }
    //     return response.data;
    // })
    return axios.get(AUTH_API_URL + "customers").then((response) => {
      let user = response.data.filter(
        (data) => data.username.toLowerCase() === username.toLowerCase()
      );
      if (user[0] && user[0].password === password) {
        return user[0];
      }
    });
  }
  //on logout it removes the user from session storage
  logout() {
    sessionStorage.removeItem("user");
  }
  //submits customer data to sign up to register user
  signup(customer) {
    return axios.post("http://localhost:8080/api/auth/signup", customer);
  }
  //gets the user info for thhe user currently logged in.
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();

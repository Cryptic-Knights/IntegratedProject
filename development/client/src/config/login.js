import axios from "axios";

export function checklogin(email, password) {
    let data_for_login = JSON.stringify({
      email: email,
      password: password,
    });
  
    let config_for_login = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      data: data_for_login,
    };
  
    return axios
      .request(config_for_login)
      .then((response) => {
        // Handle success response from server
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        // Handle error response from server
        console.error(error);
        throw error;
      });
  }
  

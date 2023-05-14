import axios from "axios";

export function registerUser(email, name, age, password, confirmpassword) {
    let data_for_login = JSON.stringify({
        email: email,
        name: name,
        age: age,
        password: password,
        confirmPassword: confirmpassword,
    });
  
    let config_for_login = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      SameSite: true,
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
  

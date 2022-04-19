import axios from "axios";

async function register(
  firstname,
  lastname,
  nickname,
  email,
  password,
  confirmPassword
) {
  try {
    if (password === confirmPassword) {
      const response = await axios.post(`http://localhost:8080/signup`, {
                                firstname, lastname ,nickname, email, password});
      return response;
    } else {
      return {
        status: 400,
        data: {
          instancePath: "confirmPassword: ",
          message: "Passwords don't match",
        },
      };
    }
  } catch (err) {
    //console.log(err.response)
    return err.response;
  }
}

async function login(email, password) {
  try {
    const response = await axios.post(`http://localhost:8080/login`, {
      email,
      password
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
}

async function sendScore(email, turns) {
  try {
    const response = await axios.post(`http://localhost:8080/addScore`, {
      email,
      turns
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
}



export { register, login, sendScore };

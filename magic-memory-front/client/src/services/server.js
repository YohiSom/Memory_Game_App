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

async function sendScore(email, moves, activeUser) {
  try {
    const response = await axios.post(`http://localhost:8080/scores/${email}`, {
      moves: moves,
      nickname: activeUser
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
}

async function getBestscore(email){
  try {
    const response = await axios.get(`http://localhost:8080/highscore/${email}`);
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
}


async function getLastscore(email){
  try {
    const response = await axios.get(`http://localhost:8080/lastscore/${email}`);
    return response;
  } catch (err) {
    console.log(err.response);
    return err.response;
  }
}

export { register, login, sendScore, getBestscore, getLastscore };
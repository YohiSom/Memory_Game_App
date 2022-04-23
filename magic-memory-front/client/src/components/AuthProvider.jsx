import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexes/AuthContext.jsx";
import { login } from "../services/server.js";

function AuthProvider({ children }) {
  
  const [activeUser, setActiveUser] = useState("");
  const [email, setEmail] = useState("");
  const [lastScore, setlastScore] = useState("");
  const [highestScore, sethighestScore] = useState("");


  const navigate = useNavigate();

  async function handleLogin(email, password) {
    const user = await login(email, password);
    setActiveUser(`${user.data[0].nickname}`);
    setEmail(`${user.data[0].email}`);
    sethighestScore(`${user.data[0].highestScore}`)
    setlastScore(`${user.data[0].lastScore}`)

    return user;
  }


  function handleLogout() {
    setActiveUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ activeUser ,email,lastScore, setlastScore , highestScore,sethighestScore , onLogin: handleLogin, onLogout: handleLogout}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
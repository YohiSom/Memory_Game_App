import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexes/AuthContext.jsx";
import { login } from "../services/server.js";

function AuthProvider({ children }) {
  
  const [activeUser, setActiveUser] = useState("");
  const navigate = useNavigate();

  async function handleLogin(email, password) {
    const user = await login(email, password);
    setActiveUser(`${user.data.firstName} ${user.data.lastName}`);
    return user;
    //navigate("/notes");
  }


  function handleLogout() {
    setActiveUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ activeUser , onLogin: handleLogin, onLogout: handleLogout}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
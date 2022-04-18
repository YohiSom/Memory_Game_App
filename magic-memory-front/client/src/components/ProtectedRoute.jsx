import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexes/AuthContext.jsx"


function ProtectedRoute({ children }) {

const { activeUser } = useContext(AuthContext);

  if (!activeUser) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export {ProtectedRoute};
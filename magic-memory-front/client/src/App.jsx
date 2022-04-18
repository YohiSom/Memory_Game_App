import { Route, Routes } from "react-router-dom";
import './App.css';

import {ProtectedRoute} from "./components/ProtectedRoute.jsx";
import AuthProvider from "./components/AuthProvider.jsx";
import GameNavbar from "./components/GameNavbar.jsx";

import GamePage from "./pages/GamePage.jsx";
import LoginPage from "./pages/LogInPage.jsx";



function App() {
  return (
    <div className="App">
      <AuthProvider>
          <GameNavbar/>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/game" element={<ProtectedRoute><GamePage/></ProtectedRoute>} />
          </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
import React, {useState, useContext} from "react";
import AuthContext from "../contexes/AuthContext.jsx";
import { Button } from "react-bootstrap";
import MyModal from "../components/MyModal.jsx";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Home(props) {

  const { activeUser, onLogout} = useContext(AuthContext);

  const [showLogin, setshowLogin] = useState(false);
  const [showRegister, setshowRegister] = useState(false);

  const CloseLoginModal = () => setshowLogin(false);
  const ShowLoginModal = () => setshowLogin(true);

  const CloseRegisterModal = () => setshowRegister(false);
  const ShowGegisterModal = () => setshowRegister(true);

  return (
    <div>
      <h1 className="my-3">Memory Game</h1>
      <h2 className="my-5">By: Yochi and Meir</h2>
      <div>
        {!activeUser && <Button className="fs-1 mx-2" variant="outline-primary" onClick={ShowLoginModal}>Login</Button>}
        <Button className="fs-1 mx-2" variant="outline-success" onClick={ShowGegisterModal}>Register</Button>

        <MyModal        
          show={showLogin}
          onHide={CloseLoginModal}
        ><LoginForm onHide={CloseRegisterModal}/>
        </MyModal>

        <MyModal        
          show={showRegister}
          onHide={CloseRegisterModal}
        ><RegisterForm onHide={CloseRegisterModal}/>
        </MyModal>

      </div>
    </div>
  );
}

export default Home;
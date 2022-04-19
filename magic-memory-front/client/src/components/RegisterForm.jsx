//import axios from "axios";
import React, {useState, useContext} from "react";
import AuthContext from "../contexes/AuthContext.jsx";
import { register } from "../services/server.js"
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function RegisterForm({onHide}) {

  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [nickname, setNickName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isAlert, setisAlert] = useState(false);
  const [alert, setalert] = useState(false);

  async function handelAddUser(evt){
    setisAlert(false)
    evt.preventDefault();
    const reponse = await register(firstname, lastname, nickname, email, password, confirmPassword);

    if(reponse.status===200){
      //await onLogin(email, password);
      setfirstName("");setlastName("");setNickName("");setemail("");setpassword("");setconfirmPassword("");
      onHide();
      //navigate("/game");
    } else {
        console.log(reponse.data);
        setalert(`${reponse.data.instancePath.substring(1)}: ${reponse.data.message}`);
        setisAlert(true);
    }
  }

  return (
    <form className="px-4 py-4">
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>First name</label>
        <input type="text" className="form-control" placeholder="First name"
            value={firstname} onChange={(e) => setfirstName(e.target.value)}/>
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name"
            value={lastname} onChange={(e) => setlastName(e.target.value)}/>
      </div>

      <div className="form-group">
        <label>Nick name</label>
        <input type="text" className="form-control" placeholder="Last name"
            value={nickname} onChange={(e) => setNickName(e.target.value)}/>
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input type="email" className="form-control" placeholder="Enter email"
            value={email} onChange={(e) => setemail(e.target.value)}/>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password"
              value={password} onChange={(e) => setpassword(e.target.value)}/>
      </div>

      <div className="form-group">
        <label>Repeat password</label>
        <input type="password" className="form-control" placeholder="Enter password"
              value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)}/>
      </div>
      <div>
        <button type="submit" onClick={(evt)=>handelAddUser(evt)} className="btn btn-primary btn-block">
          Sign Up
        </button>
        {isAlert && <Alert variant="danger">{alert}</Alert>}
      </div>
    </form>
  );
}

export default RegisterForm;
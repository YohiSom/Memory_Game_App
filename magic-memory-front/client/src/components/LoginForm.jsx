import React, {useState, useContext} from "react";
import AuthContext from "../contexes/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

function LoginForm({onHide}) {

  const { onLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isAlert, setisAlert] = useState(false);
  const [alert, setalert] = useState(false);

  async function handlelogIn(evt){
    setisAlert(false);
    evt.preventDefault();
    console.log(email, password);
    const response = await onLogin(email, password);
    console.log(response);
    if(response.status===200){
      setemail("");setpassword("")
      onHide();
      navigate("/GamePage");
    } else {
        console.log(response.data);
        setalert(`${response.data}`);
        setisAlert(true);
    }
  }

  return (
    <form className="px-4 py-4">
      <h3>Sign In</h3>
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
      </div>
      <button type="submit" className="btn btn-primary btn-block"
          onClick={(evt)=>handlelogIn(evt)}>
        Submit
      </button>
      {isAlert && <Alert variant="danger">{alert}</Alert>}
    </form>
  );
}

export default LoginForm;
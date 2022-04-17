import React , {useContext} from "react";
import AuthContext from "../contexes/AuthContext.jsx";
import { Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../components/GameNavbar.css";


function GameNavbar() {

  const { activeUser, onLogout} = useContext(AuthContext);

  return (  
    <Navbar bg="primary" variant="dark" className="Navbar2">
    
      <Navbar.Brand href="/" className="NavHeading mx-2">Memory Game</Navbar.Brand>
      <Navbar.Brand className="NavHeading mx-2">{activeUser}</Navbar.Brand>
      {activeUser && <Button variant="primary" onClick={onLogout}>Logout</Button>}
      <Nav className=" flex-row flex-center align-center">
                       <Nav.Link className="mx-2" as={NavLink} to="/">Home</Nav.Link>
        {activeUser && <Nav.Link className="mx-2" as={NavLink} to="/game">Play</Nav.Link>}

      </Nav>
    
  </Navbar>
  );
}

export default GameNavbar;
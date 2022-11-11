//React Bootstrap Imports

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

//React Router Imports
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";

//Firebase Imports
import { auth } from "../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

///Bootsrap and CSS Imports
import "./navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function MyNavbar() {
  const [activeUser, setActiveUser] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const loggedInLinks = document.querySelectorAll(".loggedIn");
  const loggedOutLinks = document.querySelectorAll(".loggedOut");

  const logOutFirebaseUser = (e) => {
    auth.signOut()
          .then(() => {
            setSuccessMessage("You have been signed out.");
          })
          .catch((error) => {
           console.log(error);
          });
     
  };

  const setupNav = (currentUser) => {
    if (currentUser) {
      // console.log(loggedInLinks, loggedOutLinks);
      loggedInLinks.forEach((item) => (item.style.display = "block"));
      loggedOutLinks.forEach((item) => (item.style.display = "none"));
    } else {
      // console.log(loggedInLinks, loggedOutLinks);
      loggedInLinks.forEach((item) => (item.style.display = "none"));
      loggedOutLinks.forEach((item) => (item.style.display = "block"));
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setActiveUser(currentUser);
      setupNav(currentUser);
    } else {
      setActiveUser(currentUser);
      setupNav();
    }
  });

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        nav-link-active-color="red"
        style={{ width: "1000px" }}

      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand href="#home">The BadBank</Navbar.Brand>
          </LinkContainer>
          <Nav>
            <LinkContainer to="/home">
              <Nav.Link
                className="loggedOut"
                data-toggle="tooltip"
                data-placement="left"
                title="Goes home"
              >
                Home
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/register">
              <Nav.Link
                className="loggedOut"
                data-toggle="tooltip"
                title="Create a new account."
              >
                Create Acount
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/login">
              <Nav.Link
                className="loggedOut"
                data-toggle="tooltip"
                title="Log in to your account."
              >
                Login
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/deposit">
              <Nav.Link
                className="loggedIn"
                data-toggle="tooltip"
                title="Go here to make a deposit.."
              >
                Deposit
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/withdrawl">
              <Nav.Link
                className="loggedIn"
                data-toggle="tooltip"
                title="Go here to make a withdrawl."
              >
                Withdrawl
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/mydata">
              <Nav.Link
                className="loggedIn"
                data-toggle="tooltip"
                title="View your account."
              >
                My Account
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
      {(activeUser?.email) ? (
        <>
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "1101px",
              height: "79.99px",
              width: "200px",
            }}
          >
            <Link to="/login">
            <Button className="btn btn-danger" onClick={logOutFirebaseUser}>Log Out</Button>
            </Link>
            Logged In as: <br />
            {activeUser?.email}
          </div>
        </>
      ) : (
        <>
          {" "}
          <Link to="/login">
            <Button
              type="submit"
              style={{ position: "absolute", top: "0px", left: "1101px" }}
            >
              Log In
            </Button>
          </Link>
        </>
      )}
    </>
  );
}

export default MyNavbar;

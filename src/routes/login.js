import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../utils/firebase.js";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setActiveUser(user);
    });
  }, [auth]);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setErrorMessage("");
    setSuccessMessage("");
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  function signInFirebaseUser(event) {
    (async () => {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        setSuccessMessage("Sign in successful!")
      } catch (error) {
        console.log(error);
        setErrorMessage("Sign in failed.")
      }
    })();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    signInFirebaseUser(email, password);

   
    setEmail("");
    setPassword("");
  };

  const logOutFirebaseUser = (e) => {
    auth.signOut()
          .then(() => {
            setSuccessMessage("You have been signed out.");
          })
          .catch((error) => {
           console.log(error);
          });
        setEmail("");
        setPassword("");
  };

  if (activeUser?.email)
    return (
      <Card
        bg="light"
        text="dark"
        border="primary"
        style={{
          width: "18rem",
          position: "relative",
          left: "100px",
          padding: "10px",
        }}
      >
        <Card.Header>
          <Card.Text>You are logged in as: {activeUser?.email}</Card.Text>
          <button className="btn btn-danger" onClick={logOutFirebaseUser}>
            Logout
          </button>
        </Card.Header>
      </Card>
    );
  else
    return (
      <>
        <Card
          bg="light"
          text="dark"
          border="primary"
          style={{
            width: "18rem",
            position: "relative",
            left: "100px",
            padding: "10px",
          }}
        >
          <Card.Header>Login</Card.Header>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                Email :
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password :
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {errorMessage && (
              <div className="mt-2 alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mt-2 alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
          </form>
        </Card>
      </>
    );
};
export default Login;

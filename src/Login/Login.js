import {
  faFacebookF,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./Login.css";
import { handleGoogleSignIn, initializeLoginFramework } from "./LoginManager";

const Login = () => {
  const [newUser, setNewUser] = useState("");
  const handleSignup = () => {
    setNewUser("container right-panel-active");
  };
  const handleSignIn = () => {
    setNewUser("");
  };

  // Handle Google SignIn

  const GoogleSignIn = () => {
    initializeLoginFramework();
    handleGoogleSignIn();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Login
      </Button>
      <Modal size="lg" show={show} onHide={handleClose}> */}
      <div className={newUser} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <li>
                <FontAwesomeIcon className="social" icon={faGoogle} />
              </li>
              <li>
                <FontAwesomeIcon className="social" icon={faFacebookF} />
              </li>
              <li>
                <FontAwesomeIcon className="social" icon={faGithub} />
              </li>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <li>
                <FontAwesomeIcon
                  onClick={GoogleSignIn}
                  className="social"
                  icon={faGoogle}
                />
              </li>
              <li>
                <FontAwesomeIcon className="social" icon={faFacebookF} />
              </li>
              <li>
                <FontAwesomeIcon className="social" icon={faGithub} />
              </li>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button className="ghost">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button onClick={handleSignIn} className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button onClick={handleSignup} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </Modal> */}
    </>
  );
};

export default Login;

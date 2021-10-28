import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebase.config";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  FacebookAuthProvider,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);
// console.log(app)

const Login2 = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const GoogleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const SignInWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userLogin = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(userLogin);
        console.log(user.email);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const SignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        const signOut = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        };
        setUser(signOut);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignInWithFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        console.log(user)

      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
  };

  const handleChange = (event) => {
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      isFormValid = /^(?=.*\d)(?=.*[a-z]).{6,}$/.test(event.target.value);
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserInfo(user.name);
        })
        .catch((error) => {
          const errorCode = error.code;
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error =
            errorCode || "This email address already in use another account";
          setUser(newUserInfo);
        });
    }

    const updateUserInfo = (name) => {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      })
        .then(() => {
          console.log("profile updated successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log(userCredential.user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error =
            errorCode || "This email address already in use another account";
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  return (
    <div>
      {user.isSignIn ? (
        <button onClick={SignOut}>Sign Out</button>
      ) : (
        <button onClick={SignInWithGoogle}>Sign in with Google</button>
      )}

      <button onClick={SignInWithFacebook}>Sign in with Facebook</button>

      {user.isSignIn && (
        <div>
          <p>name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <form action="" onSubmit={handleSubmit}>
        <input
          type="checkbox"
          name="newUser"
          onChange={() => setNewUser(!newUser)}
        />
        <label htmlFor="newUser">Sign up for newUser</label>
        <br />
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleChange}
            placeholder="Enter your Name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          placeholder="Enter your email address"
          onBlur={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onBlur={handleChange}
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "loged in"} successfully
        </p>
      )}
    </div>
  );
};

export default Login2;

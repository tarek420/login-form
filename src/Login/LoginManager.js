import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase/firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const initializeLoginFramework = () => {
   initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });
};

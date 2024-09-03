import { auth, signInWithEmailAndPassword } from "./auth/auth.js";
document.addEventListener("DOMContentLoaded", () => {});

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const signInButton = document.querySelector("#signInButton");

const userSignIn = async () => {
  const signInEmail = userEmail.value;
  const signInPassword = userPassword.value;

  console.log(`email: ${signInEmail}\npassword: ${signInPassword}`);

  if (signInEmail == "" || signInPassword == "") {
    return;
  }

  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      if (!user) {
        return;
      }
      window.location.href = "/dashboard";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
};

signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  userSignIn();
});

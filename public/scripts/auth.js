// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx-DNGRg57W5UVG9GPvhoSCAEIa3sW_KI",
  authDomain: "notesapp-558d5.firebaseapp.com",
  databaseURL: "https://notesapp-558d5-default-rtdb.firebaseio.com",
  projectId: "notesapp-558d5",
  storageBucket: "notesapp-558d5.appspot.com",
  messagingSenderId: "920344618019",
  appId: "1:920344618019:web:de2f5ee9fd8d125a04bd96",
  measurementId: "G-QL4GK84VP9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// db init
const db = getDatabase();
const auth = getAuth();

window.goToLogin = function () {
  window.location.href = "../pages/signIn.html";
};

window.gotoSignUp = function () {
  window.location.href = "pages/signUp.html";
};

window.signUp = function () {
  var userName = document.getElementById("userName");
  var email = document.getElementById("userEmail");
  var password = document.getElementById("userPassword");

  var obj = {
    userName: userName.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (response) {
      console.log("User Created Successfully ===========>", response);
      alert("You have been registered");
      window.location.href = "signIn.html";
      obj.id = response.user.uid;
      var reference = ref(db, "users/" + obj.id + "/");
      set(reference, obj);
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
  userName.value = "";
  email.value = "";
  password.value = "";
};

window.signIn = function () {
  var userName = document.getElementById("userName");
  var email = document.getElementById("userEmail");
  var password = document.getElementById("userPassword");

  var obj = {
    userName: userName.value,
    email: email.value,
    password: password.value,
  };

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // ...
      alert(`The user ${obj.userName} has been logged In successfully`);
      window.location.href = "notes.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage, errorCode);
    });
  userName.value = "";
  email.value = "";
  password.value = "";
};

window.logout = function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Signed Out Successfully!");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // An error happened.
      alert(error);
    });
};

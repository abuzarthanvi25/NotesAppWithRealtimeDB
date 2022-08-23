var inp = document.getElementById("input");
var data = document.getElementById("dataParent");
var notesData;

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
// import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
// import { auth } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
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
//  reference

window.addTask = function () {
  if (inp.value !== "") {
    var dateOfToday = new Date();
    var obj = {
      text: inp.value,
      time: dateOfToday.getHours() + ":" + dateOfToday.getMinutes(),
    };
    var reference = ref(db, "notes/");
    obj.id = push(reference).key;
    var newRef = push(reference);
    set(newRef, obj);
    inp.value = "";
    getAllNotes();
  } else {
    alert("Tasks Cannot Be Empty");
  }
};

function getAllNotes() {
  var reference = ref(db, "notes/");
  onValue(reference, function (dataFromDB) {
    // console.log(dataFromDB.val())
    notesData = Object.values(dataFromDB.val());
    data.innerHTML = "";
    for (var i = 0; i < notesData.length; i++) {
      data.innerHTML += `
    <li class='bg-primary text-white rounded d-flex justify-content-between'>
      <div class = ''>
        <p class='p-2 ps-3 fs-3'>${notesData[i].text}</p>
        <span class = 'p-2 fs-5'>${notesData[i].time}</span>
      </div>
    </li>
    </br>
    `;
    }
  });
}
getAllNotes();

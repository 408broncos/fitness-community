// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
// import { getDatabase } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfniEVnqBZ3VsU3GGahslig4DGJzxdmS4",
    authDomain: "fitness-community-bbfba.firebaseapp.com",
    projectId: "fitness-community-bbfba",
    storageBucket: "fitness-community-bbfba.appspot.com",
    messagingSenderId: "511898627716",
    appId: "1:511898627716:web:1d92042d5e9ab14d635cd1",
    measurementId: "G-HBWMM2ZTMJ",
    // databaseURL: "https://fitness-community-bbfba-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signup = document.getElementById("sign-up");
const login = document.getElementById("login")


// Handle the login/sign-up screen forms.
function signupLoginHandler(event) {
    event.preventDefault();
    let element = event.target;
    console.log(element);
    let email = element[0].children[1].value;
    let password = element[0].children[2].value;

    if (element.id == "sign-up") {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Sign Up Success!")
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Sign Up Error!");
                console.log(errorCode, errorMessage);
                // ..
            });
    } else if (element.id == "login") {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Login Success!")
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Login Error!");
                console.log(errorCode, errorMessage);
            });

    }

};

signup.addEventListener("submit", signupLoginHandler);
login.addEventListener("submit", signupLoginHandler);
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";


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
    databaseURL: "https://fitness-community-bbfba-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const signup = document.getElementById("sign-up");
const login = document.getElementById("login");
const errorMessageSection = document.getElementById("error-message");

console.log(signup);
console.log(login);


function appendErrorMessage(message) {
    errorMessageSection.innerHTML = "";
    let div = document.createElement("div");
    div.setAttribute("class", "ma5 pa3 bg-white");
    div.innerHTML = "<h2>Oops! Something went wrong...</h2><p>" + message + "</p>";
    errorMessageSection.appendChild(div);
}

function toggleSignIn() {
    document.getElementById("signed-in-content").classList.toggle("dn");
    document.getElementById("signed-out-content").classList.toggle("dn");
}

// Handle the login/sign-up screen forms.
function loginHandler(event) {
    event.preventDefault();
    let element = event.target;
    let email = element.children[1].children[0].value;
    let password = element.children[1].children[1].value;
    console.log(email);
    console.log(password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Login Success!")
            console.log(user);
            // ...
            toggleSignIn();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Login Error!");
            console.log(errorCode, errorMessage);
            appendErrorMessage(errorMessage);
        });
}

function signupHandler(event) {
    event.preventDefault();
    let element = event.target;
    let name = document.getElementById("sign-up-name").value;
    let email = document.getElementById("sign-up-email").value;
    let password = document.getElementById("sign-up-password").value;
    console.log(name);
    console.log(email);
    console.log(password);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Sign up successful
            const user = userCredential.user;
            console.log("Sign Up Success!");
            updateProfile(user, {
                displayName: name
            }).then(function () {
                console.log(user)
                // ...
                toggleSignIn()
            });



        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Sign Up Error!");
            console.log(errorCode, errorMessage);
            // ..
            appendErrorMessage(errorMessage);
        });

}

login.addEventListener("submit", loginHandler);
signup.addEventListener("submit", signupHandler);
document.getElementById("toggle-signin").addEventListener("click", toggleSignIn);
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
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



createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Success!")
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error!");
        console.log(error);
        // ..
    });

// const analytics = getAnalytics(app);
// // Initialize Realtime Database and get a reference to the service
// const database = getDatabase(app);
// Initialize Firebase Authentication and get a reference to the service


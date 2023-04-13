// Firebase stuff
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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

const signup = document.getElementById("sign-up");
const login = document.getElementById("login");
const errorMessageSection = document.getElementById("error-message");

let userDisplayName;
let uid;

function appendErrorMessage(message) {
    errorMessageSection.innerHTML = "";
    let div = document.createElement("div");
    div.setAttribute("class", "ma5 pa3 bg-white");
    div.innerHTML = "<h2>Oops! Something went wrong...</h2><p>" + message + "</p>";
    errorMessageSection.appendChild(div);
}

function simulateRedirect() {
    document.getElementById("user-display-name").textContent = "Welcome, " + userDisplayName + "!";
    document.getElementById("user-display-name").classList.toggle("dn");
    document.getElementById("signed-in-content").classList.toggle("dn");
    document.getElementById("signed-out-content").classList.toggle("dn");
    init();
}

// Handle the login/sign-up screen forms.
function loginHandler(event) {
    event.preventDefault();
    let element = event.target;
    let email = element.children[1].children[0].value;
    let password = element.children[1].children[1].value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("Login Success!")
            console.log(user);
            userDisplayName = user.displayName;
            uid = user.uid;

            // ...
            simulateRedirect();
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
                console.log(user.displayName);
                userDisplayName = user.displayName;
                uid = user.uid;
                simulateRedirect()
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
document.getElementById("toggle-signin").addEventListener("click", simulateRedirect);


// API variables
const iqAir = "1c89bd54-fc84-44cd-adb6-a840d493e162";
const iqAirImage = "https://www.airvisual.com/images/";
const exerciseAPIBaseURL = "https://api.api-ninjas.com/v1/exercises";
const exerciseAPIHeaders = { 'X-API-Key': 'jnUj6AM2P58MuWuD7jCFjg==thxrq1qz9Au6FFzl' };

// DOM elements
const workoutSection = document.getElementById("workout");
const workbookSection = document.getElementById("workbook");
const addExerciseSection = document.getElementById("add-exercise");
const addExerciseForm = document.getElementById("add-exercise-form");
const addExerciseNameField = document.querySelector("input[name='exercise-name']");
const addExerciseDescriptionField = document.querySelector('textarea[name="exercise-desc"]');
const addExerciseRepsField = document.querySelector('input[name="exercise-reps"]');
const exerciseDetails = document.getElementById("exercise-details");
const newIdeasSection = document.getElementById("new-ideas");
const newIdeasButtonArea = document.getElementById("button-area");
const findExerciseForm = document.getElementById("find-exercise-form");
const scheduleDays = document.getElementById("schedule");
const aqiForm = document.getElementById("aqi-form");
const aqiCity = document.getElementById("aqi-city");
const aqiState = document.getElementById("aqi-state");
const aqiCountry = document.getElementById("aqi-country");

console.log(aqiForm);

// Global Storage Variables
let activeDay = dayjs().day();
let suggestionList;
let savedWorkouts;
let weeklyWorkoutArray;

function initializeWeeklyWorkoutArray() {
    if (uid) {
        savedWorkouts = localStorage.getItem(uid);
    } else {
        savedWorkouts = localStorage.getItem("anonymous");
    }

    if (savedWorkouts) {
        weeklyWorkoutArray = JSON.parse(savedWorkouts);
    } else {
        weeklyWorkoutArray = [
            [], [], [], [], [], [], []
        ];
    }
}

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const exerciseOptions = {
    type: [
        "cardio",
        "olympic_weightlifting",
        "plyometrics",
        "powerlifting",
        "strength",
        "stretching",
        "strongman"
    ],
    muscle: [
        'abdominals',
        'abductors',
        'adductors',
        'biceps',
        'calves',
        'chest',
        'forearms',
        'glutes',
        'hamstrings',
        'lats',
        'lower_back',
        'middle_back',
        'neck',
        'quadriceps',
        'traps',
        'triceps',
    ],
    difficulty: [
        "beginner",
        "intermediate",
        "expert"
    ]
}

function saveWorkout() {
    let key = "anonymous";
    if (uid) {
        key = uid;
    }
    localStorage.setItem(key, JSON.stringify(weeklyWorkoutArray));
}

function constructWorkoutSection() {
    let workoutHeader = document.createElement("h2");
    workoutHeader.textContent = daysOfTheWeek[activeDay] + " Workout";
    let dailyWorkoutArray = weeklyWorkoutArray[activeDay];
    let workoutItems = document.createElement("div");
    workoutItems.setAttribute("class", "w-100 flex flex-column");
    workoutItems.setAttribute("id", "workout-items-list");
    for (let i = 0; i < dailyWorkoutArray.length; i++) {
        let exerciseDiv = document.createElement("div");
        exerciseDiv.setAttribute("class", "listed-exercise w-100 flex justify-between bg-white pa3 ph4 mv3 outline br2");
        exerciseDiv.setAttribute("data-position", i);
        let exerciseNumber = i + 1;
        exerciseDiv.innerHTML = "<span class='exercise-number'>" +
            exerciseNumber + "</span> <span class='exercise-name'>" +
            dailyWorkoutArray[i].name + "</span><span class='exercise-reps'>Reps: " +
            dailyWorkoutArray[i].reps + "</span>";
        let removeExerciseButton = document.createElement("button");
        removeExerciseButton.setAttribute("class", "remove-exercise white b btn");
        removeExerciseButton.setAttribute("data-position", i);
        removeExerciseButton.textContent = "X";
        exerciseDiv.appendChild(removeExerciseButton);
        workoutItems.appendChild(exerciseDiv);
    }

    let clearWorkoutDayBtn = document.createElement("button");
    clearWorkoutDayBtn.setAttribute("class", "pa3 btn");
    clearWorkoutDayBtn.setAttribute("id", "clear-whole-day");
    clearWorkoutDayBtn.textContent = "Clear All";

    workoutSection.innerHTML = "";
    workoutSection.appendChild(workoutHeader);
    workoutSection.appendChild(workoutItems);
    workoutSection.appendChild(clearWorkoutDayBtn);

    let workoutItemsList = document.getElementById("workout-items-list");
    let clearWholeDayElement = document.getElementById("clear-whole-day");
    workoutItemsList.addEventListener("click", function (event) {
        if (event.target.tagName == "BUTTON") {
            let position = event.target.dataset.position;
            removeExerciseFromSchedule(position);
        }
    })
    clearWholeDayElement.addEventListener("click", clearDaySchedule);

}

function addExerciseToSchedule(name, reps, desc) {
    let exerciseObject = {
        name: name,
        reps: reps,
        desc: desc,
    };
    weeklyWorkoutArray[activeDay].push(exerciseObject);
    saveWorkout();
    constructWorkoutSection();
}

function removeExerciseFromSchedule(index) {
    weeklyWorkoutArray[activeDay].splice(index, 1);
    saveWorkout();
    constructWorkoutSection();
}

function clearDaySchedule() {
    weeklyWorkoutArray[activeDay] = [];
    saveWorkout();
    constructWorkoutSection();
}

function updateAQI(aqius, icon) {
    let aqidiv = document.createElement("div");
    aqidiv.setAttribute("id", "aqi-display-block");
    aqidiv.setAttribute("class", "flex items-center bg-white br3 ph2 pv1 mt3")
    let aqispan = document.createElement("span");
    aqispan.textContent = "AQI: " + aqius;
    aqispan.setAttribute("class", "mr2");
    let iconurl = iqAirImage + icon + ".png";
    let iconimg = document.createElement("img");
    iconimg.setAttribute("src", iconurl);
    iconimg.setAttribute("class", "mw2");
    let currentday = dayjs().day();
    let currentdayid = "day-" + currentday;
    let currentdaybox = document.getElementById(currentdayid);
    aqidiv.appendChild(aqispan);
    aqidiv.appendChild(iconimg);
    currentdaybox.appendChild(aqidiv);

}

function getIQAirData(city, state, country) {
    let url = "https://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=" + country + "&key=" + iqAir;
    fetch(url).then(function (response) {
        if (response.ok) {
            return response.json()
        }
        throw new Error("Something went wrong.");
    }).then(function (data) {
        let aqius = data.data.current.pollution.aqius
        let icon = data.data.current.weather.ic
        let existingAQIDiv = document.getElementById("aqi-display-block");
        if (existingAQIDiv) {
            existingAQIDiv.remove();
        }
        updateAQI(aqius, icon)
    }).catch(function (error) {
        console.log(error);
    })
}

function aqiFormHandler(event) {
    event.preventDefault();
    let city = aqiCity.value;
    let state = aqiState.value;
    let country = aqiCountry.value;
    getIQAirData(city, state, country);
}

function searchForExercises(event) {
    event.preventDefault();
    newIdeasButtonArea.innerHTML = "";
    let searchURL = "";
    searchURL += exerciseAPIBaseURL;

    let form = event.target;
    for (let i = 0; i < form.length - 1; i++) {
        if (form[i].value) {
            searchURL += "?" + form[i].name + "=" + form[i].value;
        }
    };

    fetch(searchURL, {
        headers: {
            'X-API-Key': 'jnUj6AM2P58MuWuD7jCFjg==thxrq1qz9Au6FFzl',
        }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        for (let i = 0; i < data.length; i++) {
            let button = document.createElement("button");
            button.textContent = data[i].name;
            button.setAttribute("class", "btn ma1");
            button.setAttribute("data-position", i);
            newIdeasButtonArea.appendChild(button);
        }
        suggestionList = data;
    });
}

function popupNewExerciseDetails(event) {
    let element = event.target;
    if (element.tagName == "BUTTON") {
        let modal = new jBox('Modal', {
            width: 600,
            height: 600,
            responsiveWidth: true,
            responsiveHeight: true,
        });
        let exerciseObject = suggestionList[element.dataset.position];
        console.log(exerciseObject);
        let name = "<h2>" + exerciseObject.name + "</h2>";
        let difficulty = "<p class='b'>Difficulty: <span class='ttc'>" + exerciseObject.difficulty + "</span></p>";
        let equipment = "<p>Equipment: <span class='ttc'>" + exerciseObject.equipment + "</span></p>";
        let muscle = "<p>Muscle Group: <span class='ttc'>" + exerciseObject.muscle + "</span></p>";
        let type = "<p>Exercise Type: <span class='ttc'>" + exerciseObject.type + "</span></p>";
        let instructions = "<p><span class='b underline'>Instructions</span><br>" + exerciseObject.instructions + "</p>";
        let repsLabel = "<label for='modal-reps'>Number of Reps</label>"
        let repsInput = document.createElement("input");
        repsInput.setAttribute("type", "number");
        repsInput.setAttribute("name", "modal-reps");

        let buttonDiv = document.createElement("div");
        buttonDiv.setAttribute("class", "pa3");
        let addToWorkoutBtn = document.createElement("button")
        addToWorkoutBtn.setAttribute("class", "btn add-to-workout-modal");
        addToWorkoutBtn.textContent = "Add to Workout";
        buttonDiv.appendChild(addToWorkoutBtn);
        let contentAssembly = difficulty + equipment + muscle + type + instructions + repsLabel + repsInput.outerHTML + buttonDiv.outerHTML;
        modal.setTitle(name).setContent(contentAssembly);
        modal.open();

        let listenerButtons = document.querySelectorAll(".add-to-workout-modal");
        console.log(listenerButtons);

        for (let i = 0; i < listenerButtons.length; i++) {
            listenerButtons[i].addEventListener("click", function (event) {
                event.preventDefault();
                console.log("Listener works");
                let parentNodeList = listenerButtons[i].parentElement.parentElement.childNodes;
                let repsInputEl = parentNodeList[6];
                let reps = repsInputEl.value;
                addExerciseToSchedule(exerciseObject.name, reps, exerciseObject.instructions);
                modal.close();
            })
        }
    }
}

function popupListedExercise(event) {
    let element = event.target;
    if (element.classList.contains("listed-exercise")) {
        let modal = new jBox('Modal', {
            width: 600,
            height: 600,
            responsiveWidth: true,
            responsiveHeight: true,
        });
        let exerciseObject = weeklyWorkoutArray[activeDay][element.dataset.position];
        let name = exerciseObject.name;
        let description = exerciseObject.desc;
        modal.setTitle(name).setContent(description);
        modal.open();
    }
}

function changeActiveDay(event) {
    let element = event.target;
    activeDay = element.dataset.day;
    colorActiveDay();
    constructWorkoutSection();
}

function colorActiveDay() {
    let day = activeDay;
    let dayString = "day-" + day;
    for (let i = 0; i < scheduleDays.children.length; i++) {
        if (scheduleDays.children[i].getAttribute("id") == dayString) {
            scheduleDays.children[i].classList.add("current-day");
        } else {
            scheduleDays.children[i].classList.remove("current-day");
        }
    }
}

function addExerciseHandler(event) {
    event.preventDefault();
    let name = addExerciseNameField.value;
    let reps = addExerciseRepsField.value;
    let desc = addExerciseDescriptionField.value;
    addExerciseToSchedule(name, reps, desc);
}

function init() {
    initializeWeeklyWorkoutArray();
    activeDay = dayjs().day();
    colorActiveDay();
    constructWorkoutSection();
    findExerciseForm.addEventListener("submit", searchForExercises);
    addExerciseForm.addEventListener("submit", addExerciseHandler)
    newIdeasButtonArea.addEventListener("click", popupNewExerciseDetails);
    scheduleDays.addEventListener("click", changeActiveDay);
    workoutSection.addEventListener("click", popupListedExercise);
    aqiForm.addEventListener("submit", aqiFormHandler);
}

// init();


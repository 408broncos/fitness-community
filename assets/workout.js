


const exerciseAPIBaseURL = "https://api.api-ninjas.com/v1/exercises";
const exerciseAPIHeaders = { 'X-API-Key': 'jnUj6AM2P58MuWuD7jCFjg==thxrq1qz9Au6FFzl' };

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
const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let activeDay;
let suggestionList;
let savedWorkouts = localStorage.getItem("workouts");
let weeklyWorkoutArray;
if (savedWorkouts) {
    weeklyWorkoutArray = JSON.parse(savedWorkouts);
} else {
    weeklyWorkoutArray = [
        [], [], [], [], [], [], []
    ];
}
console.log(weeklyWorkoutArray);


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

function constructWorkoutSection() {
    let workoutHeader = document.createElement("h2");
    workoutHeader.textContent = daysOfTheWeek[activeDay] + " Workout";
    let dailyWorkoutArray = weeklyWorkoutArray[activeDay];
    let workoutOl = document.createElement("ol");
    for (let i = 0; i < dailyWorkoutArray.length; i++) {
        let exerciseLi = document.createElement("li");
        exerciseLi.innerHTML = "<h3>" + dailyWorkoutArray[i].name + "</h3><p>Reps: " + dailyWorkoutArray[i].reps + "</p>";
        workoutOl.appendChild(exerciseLi);
    }
    workoutSection.innerHTML = "";
    workoutSection.appendChild(workoutHeader);
    workoutSection.appendChild(workoutOl);
}

//form submit section
var formEl = $('add-exercise');
var nameEl = $('input[name="exercise-name"]');
var descripEl = $('textarea[name="exercise-desc"]');
var repEl = $('input[type="number"]');
var workoutSectionEl = $('#workout');
// var exerciseCount = 1;

function addExerciseToSchedule(name, reps, desc) {
    let exerciseObject = {
        name: name,
        reps: reps,
        desc: desc,
    };
    weeklyWorkoutArray[activeDay].push(exerciseObject);
    console.log(weeklyWorkoutArray);
}

function handleFormSubmit(event) {
    event.preventDefault();

    console.log(nameEl, nameEl.val());
    console.log(descripEl.val());
    console.log(repEl.val());

    var exerciseName = nameEl.val();
    var exerciseDesc = descripEl.val();
    var exerciseReps = repEl.val();
    var checkedEl = $('input:checked');

    $.each(checkedEl, function (i, elm) {
        console.log("elm");
        console.log(elm);
        console.log(elm.value);
        console.log($(elm));
        selected.push($(elm).val());
    });

    var exerciseHTML = '<div class="exercise-item">' +
        '<h3>Exercise ' + exerciseCount + ': ' + exerciseName + '</h3>' +
        '<p>Description: ' + exerciseDesc + '</p>' +
        '<p>Reps: ' + exerciseReps + '</p>' +
        '</div>';

    workoutSectionEl.append(exerciseHTML);
    exerciseCount++;

    $('input[type="text"]').val('');
    $('input[type="number"]').val('');
}

formEl.on('click', handleFormSubmit);


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

function popupDetails(event) {
    let element = event.target;
    console.log(element);
    let modal = new jBox('Modal', {
        width: 600,
        height: 600,
        responsiveWidth: true,
        responsiveHeight: true,

    });
    let exerciseObject = suggestionList[element.dataset.position];
    console.log(exerciseObject);
    let name = exerciseObject.name;
    let instructions = exerciseObject.instructions;
    let addToWorkoutBtn = "<button class='btn' id='add-to-workout-modal'>Add to Workout</button>";

    modal.setTitle(name).setContent(instructions);

    modal.open();
}

function changeActiveDay(event) {
    let element = event.target;
    console.log(element);
    activeDay = element.dataset.day;
    colorActiveDay();
    console.log(activeDay);
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
    console.log(addExerciseNameField);
    let name = addExerciseNameField.value;
    let reps = addExerciseRepsField.value;
    let desc = addExerciseDescriptionField.value;
    addExerciseToSchedule(name, reps, desc);
    constructWorkoutSection();
}

function init() {
    activeDay = dayjs().day();
    colorActiveDay();
    constructWorkoutSection();
    findExerciseForm.addEventListener("submit", searchForExercises);
    addExerciseForm.addEventListener("submit", addExerciseHandler)
    newIdeasButtonArea.addEventListener("click", popupDetails);
    scheduleDays.addEventListener("click", changeActiveDay);
}

init();

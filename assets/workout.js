


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
const removeExerciseButton = document.createElement("button");
removeExerciseButton.setAttribute("class", "remove-exercise bg-dark-red white b");
removeExerciseButton.textContent = "X";
const clearWorkoutDayBtn = document.createElement("button");
clearWorkoutDayBtn.setAttribute("class", "absolute bottom-2 right-0 left-0 pa3 btn");
clearWorkoutDayBtn.textContent = "Clear All";

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

function saveWorkout() {
    localStorage.setItem("workouts", JSON.stringify(weeklyWorkoutArray));
}

function constructWorkoutSection() {
    let workoutHeader = document.createElement("h2");
    workoutHeader.textContent = daysOfTheWeek[activeDay] + " Workout";
    let dailyWorkoutArray = weeklyWorkoutArray[activeDay];
    let workoutItems = document.createElement("div");
    workoutItems.setAttribute("class", "w-100 flex flex-column");
    for (let i = 0; i < dailyWorkoutArray.length; i++) {
        let exerciseDiv = document.createElement("div");
        exerciseDiv.setAttribute("class", "listed-exercise w-100 flex justify-between bg-white pa3 ph4 mv3 outline br2");
        exerciseDiv.setAttribute("data-position", i);
        let exerciseNumber = i + 1;
        exerciseDiv.innerHTML = "<span class='exercise-number'>" +
            exerciseNumber + "</span> <span class='exercise-name'>" +
            dailyWorkoutArray[i].name + "</span><span class='exercise-reps'>Reps: " +
            dailyWorkoutArray[i].reps + "</span>";
        exerciseDiv.appendChild(removeExerciseButton);
        workoutItems.appendChild(exerciseDiv);
    }
    workoutSection.innerHTML = "";
    workoutSection.appendChild(workoutHeader);
    workoutSection.appendChild(workoutItems);
    workoutSection.appendChild(clearWorkoutDayBtn);
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

//form submit section
var formEl = $('add-exercise');
var nameEl = $('input[name="exercise-name"]');
var descripEl = $('textarea[name="exercise-desc"]');
var repEl = $('input[type="number"]');
var workoutSectionEl = $('#workout');
// var exerciseCount = 1;

// function handleFormSubmit(event) {
//     event.preventDefault();

//     console.log(nameEl, nameEl.val());
//     console.log(descripEl.val());
//     console.log(repEl.val());

//     var exerciseName = nameEl.val();
//     var exerciseDesc = descripEl.val();
//     var exerciseReps = repEl.val();
//     var checkedEl = $('input:checked');

//     $.each(checkedEl, function (i, elm) {
//         console.log("elm");
//         console.log(elm);
//         console.log(elm.value);
//         console.log($(elm));
//         selected.push($(elm).val());
//     });

//     var exerciseHTML = '<div class="exercise-item">' +
//         '<h3>Exercise ' + exerciseCount + ': ' + exerciseName + '</h3>' +
//         '<p>Description: ' + exerciseDesc + '</p>' +
//         '<p>Reps: ' + exerciseReps + '</p>' +
//         '</div>';

//     workoutSectionEl.append(exerciseHTML);
//     exerciseCount++;

//     $('input[type="text"]').val('');
//     $('input[type="number"]').val('');
// }

// formEl.on('click', handleFormSubmit);

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
        addToWorkoutBtn.setAttribute("class", "btn");
        addToWorkoutBtn.setAttribute("id", "add-to-workout-modal");
        addToWorkoutBtn.textContent = "Add to Workout";
        buttonDiv.appendChild(addToWorkoutBtn);
        let contentAssembly = difficulty + equipment + muscle + type + instructions + repsLabel + repsInput.outerHTML + buttonDiv.outerHTML;
        modal.setTitle(name).setContent(contentAssembly);
        modal.open();

        let listenerButton = document.getElementById("add-to-workout-modal");
        let repsInputEl = document.querySelector("input[name='modal-reps']");

        listenerButton.addEventListener("click", function (event) {
            event.preventDefault();
            console.log(event);
            console.log("Listener works");
            let reps = repsInputEl.value;
            addExerciseToSchedule(exerciseObject.name, reps, exerciseObject.instructions);
            modal.close();

        })
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
}

function init() {
    activeDay = dayjs().day();
    colorActiveDay();
    constructWorkoutSection();
    findExerciseForm.addEventListener("submit", searchForExercises);
    addExerciseForm.addEventListener("submit", addExerciseHandler)
    newIdeasButtonArea.addEventListener("click", popupNewExerciseDetails);
    scheduleDays.addEventListener("click", changeActiveDay);
    workoutSection.addEventListener("click", popupListedExercise)
}

init();

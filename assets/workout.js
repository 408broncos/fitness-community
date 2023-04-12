


const exerciseAPIBaseURL = "https://api.api-ninjas.com/v1/exercises";
const exerciseAPIHeaders = { 'X-API-Key': 'jnUj6AM2P58MuWuD7jCFjg==thxrq1qz9Au6FFzl' };

const workoutSection = document.getElementById("workout");
const workbookSection = document.getElementById("workbook");
const addExerciseSection = document.getElementById("add-exercise");
const exerciseDetails = document.getElementById("exercise-details");
const newIdeasSection = document.getElementById("new-ideas");
const newIdeasButtonArea = document.getElementById("button-area");
const findExerciseForm = document.getElementById("find-exercise-form");
// findExerciseForm.setAttribute("class", "col s6");

let workoutList = [];
let suggestionList;

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
    let modal = new jBox('Modal');
    let exerciseObject = suggestionList[element.dataset.position];
    console.log(exerciseObject);
    let name = exerciseObject.name;
    let instructions = exerciseObject.instructions;

    modal.setTitle(name).setContent(instructions);

    modal.open();
}


findExerciseForm.addEventListener("submit", searchForExercises);
newIdeasButtonArea.addEventListener("click", popupDetails);


// $(document).ready(function () {
//     var myModal = new jBox('Modal', {
//         attach: '.exercise-suggestion',
//         title: 'Hurray!',
//         content: 'This is my modal window'
//     });
// })




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

function createFindExerciseForm() {
    let fieldset = document.createElement("fieldset");
    let fieldRow = document.createElement("div");
    fieldRow.setAttribute("class", "row");
    let fieldColName = document.createElement("div");
    fieldColName.setAttribute("class", "fl w-25 pa1")

    let name = document.createElement("input");
    name.type = "text";
    name.id = "exercise-name";
    name.name = "name";
    let nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.textContent = "Filter by exercise name";

    fieldColName.appendChild(nameLabel)
    fieldColName.appendChild(name);
    fieldRow.appendChild(fieldColName);

    // Get the object keys into an array
    let keys = Object.keys(exerciseOptions);

    // Iterate over that array, creating Select fields with an id of that object
    for (let i = 0; i < keys.length; i++) {
        let fieldCol = document.createElement("div");
        fieldCol.setAttribute("class", "input-field col s3");

        let label = document.createElement("label");
        label.setAttribute("for", keys[i]);
        label.textContent = "Filter by " + keys[i];
        let select = document.createElement("select");
        select.setAttribute("id", keys[i]);
        select.setAttribute("name", keys[i]);
        // select.setAttribute("class", "pure-input");

        // Get the options array for the current key
        let options = exerciseOptions[keys[i]];
        let optionDesc = document.createElement("option");
        optionDesc.textContent = "Select a " + keys[i] + "...";
        optionDesc.setAttribute("value", "");
        optionDesc.setAttribute("selected", "selected");
        select.appendChild(optionDesc);
        // Iterate over that array and create Option elements
        for (let j = 0; j < options.length; j++) {
            let optionEl = document.createElement("option");
            optionEl.setAttribute("value", options[j]);
            optionEl.textContent = options[j];
            select.appendChild(optionEl);
        }
        fieldCol.appendChild(select);
        fieldCol.appendChild(label);
        fieldRow.appendChild(fieldCol);
    }

    let fieldColSubmit = document.createElement("div");
    fieldColSubmit.setAttribute("class", "col s12 right-align");

    let submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Search";
    submit.setAttribute("class", "btn");

    fieldColSubmit.appendChild(submit);
    fieldset.appendChild(fieldRow);
    fieldset.appendChild(fieldColSubmit);
    findExerciseForm.appendChild(fieldset);

    newIdeasSection.appendChild(findExerciseForm);
}

function searchForExercises(event) {
    event.preventDefault();
    console.log(event);
    let searchURL = "";
    searchURL += exerciseAPIBaseURL;

    let form = event.target;
    for (let i = 0; i < form.length - 1; i++) {
        if (form[i].value) {
            console.log(form[i].name);
            searchURL += "?" + form[i].name + "=" + form[i].value;
        }
    };
    console.log(searchURL);

    fetch(searchURL, {
        headers: {
            'X-API-Key': 'jnUj6AM2P58MuWuD7jCFjg==thxrq1qz9Au6FFzl',
        }
    }).then(function (response) {
        console.log(response);
        return response.json()
    }).then(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let button = document.createElement("button");
            button.textContent = data[i].name;
            button.setAttribute("class", "btn");
            newIdeasButtonArea.appendChild(button);
        }

        suggestionList = data;





    });


}

// createFindExerciseForm();

findExerciseForm.addEventListener("submit", searchForExercises);
const exerciseAPIBaseURL = "https://api.api-ninjas.com/v1/exercises";
const exerciseAPIHeaders = { 'X-API-Key': 'jnUj6AM2P58MuWuD7jCFjg==thxrq1qz9Au6FFzl' };

const workoutSection = document.getElementById("workout");
const workbookSection = document.getElementById("workbook");
const addExerciseBtn = document.createElement("button");
const findExerciseForm = document.createElement("form");
findExerciseForm.setAttribute("class", "pure-form pure-form-stacked");

let workoutList = [];

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
    fieldRow.setAttribute("class", "pure-g");
    let fieldColName = document.createElement("div");
    fieldColName.setAttribute("class", "pure-u-md-1-4")

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
        fieldCol.setAttribute("class", "pure-u-md-1-4");

        let label = document.createElement("label");
        label.setAttribute("for", keys[i]);
        label.textContent = "Filter by " + keys[i];
        let select = document.createElement("select");
        select.setAttribute("id", keys[i]);
        select.setAttribute("name", keys[i]);
        select.setAttribute("class", "pure-input");

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
        fieldCol.appendChild(label);
        fieldCol.appendChild(select);
        fieldRow.appendChild(fieldCol);
    }

    let fieldColSubmit = document.createElement("div");
    fieldColSubmit.setAttribute("class", "pure-u-1");

    let submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Search";
    submit.setAttribute("class", "pure-button");

    fieldColSubmit.appendChild(submit);
    fieldRow.appendChild(fieldColSubmit);
    findExerciseForm.appendChild(fieldRow);

    workbookSection.appendChild(findExerciseForm);
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

}

createFindExerciseForm();

findExerciseForm.addEventListener("submit", searchForExercises);
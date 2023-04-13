
//form submit section
var formEl = $('#add-exercise');
var nameEl = $('input[name="exercise-name"]');
var descripEl = $('textarea[name="exercise-desc"]');
var repEl = $('input[type="number"]');
var workoutSectionEl = $('#workout');
var exerciseCount = 1;

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

formEl.on('submit', handleFormSubmit);

let schedule = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: []
};

function addContent(day) {
  let content = prompt('Enter content for ' + day + ':');
  schedule[day].push(content);
  let cell = document.getElementById(day);
  cell.innerHTML = schedule[day].join('<br>');
}




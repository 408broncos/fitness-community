// // get current day of the week
// const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
// const currentDay = days[new Date().getDay()];
// var schedule = document.querySelector("#schedule");
// console.log(schedule.children)

// function colorCode() {
//   let day = dayjs().day();
//   let dayString = "day-" + day;
//   console.log(schedule.length)
//   for (let i = 0; i < schedule.children.length; i++) {
//     if (schedule.children[i].getAttribute("id") == dayString) {
//       schedule.children[i].setAttribute("class", "border-box current-day");
//     }
//   }
// }

// var array = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

// function eventFunction(event) {
//   console.log(event.target.id + " has been clicked.");
// }

// // add event listeners to each day
// for (var i = 0; i < array.length; i++) {
//   document.getElementById(array[i]).addEventListener('click', eventFunction);
// }

// colorCode();
// // create border boxes for the week
// const borderBoxes = [
//   { day: 'Sunday' },
//   { day: 'Monday' },
//   { day: 'Tuesday' },
//   { day: 'Wednesday' },
//   { day: 'Thursday' },
//   { day: 'Friday' },
//   { day: 'Saturday' }
// ];

// // filter border boxes for current day
// const currentDayBox = borderBoxes.find(box => box.day === currentDay);

// // create HTML for border boxes
// const borderBoxHTML = borderBoxes.map(box => {
//   const classes = ['border-box'];
//   if (box.day === currentDay) {
//     classes.push('current-day');
//   }
//   return `<div class="${classes.join(' ')}">${box.day}</div>`;
// }).join('');

// // display border boxes on page
// document.getElementsByClassName('border-boxes').innerHTML = borderBoxHTML;

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




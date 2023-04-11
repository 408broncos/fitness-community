// get current day of the week
const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const currentDay = days[new Date().getDay()];
var schedule = document.querySelector("#schedule");
console.log(schedule.children)

function colorCode() {
    let day = dayjs().day();
    let dayString = "day-" + day;
    console.log(schedule.length)
    for (let i = 0; i < schedule.children.length; i++) {
        if (schedule.children[i].getAttribute("id")== dayString) {
            schedule.children[i].setAttribute("class", "border-box current-day");
        }
    }
}
colorCode();
// create border boxes for the week
const borderBoxes = [
  { day: 'Sunday' },
  { day: 'Monday' },
  { day: 'Tuesday' },
  { day: 'Wednesday' },
  { day: 'Thursday' },
  { day: 'Friday' },
  { day: 'Saturday' }
];

// filter border boxes for current day
const currentDayBox = borderBoxes.find(box => box.day === currentDay);

// create HTML for border boxes
const borderBoxHTML = borderBoxes.map(box => {
  const classes = ['border-box'];
  if (box.day === currentDay) {
    classes.push('current-day');
  }
  return `<div class="${classes.join(' ')}">${box.day}</div>`;
}).join('');

// display border boxes on page
document.getElementsByClassName('border-boxes').innerHTML = borderBoxHTML;

const milisecondsSpan = document.querySelector("#miliseconds");
const secondsSpan = document.querySelector("#seconds");
const minutesSpan = document.querySelector("#minutes");
const hoursSpan = document.querySelector("#hours");
const myBtn = document.querySelector("#playPause")

let miliSecondsValue = 0;
let secondsValue = 0;
let minutesValue = 0;
let hoursValue = 0;

let currentChronometer;

let playBtn = true;

function playPause(){
    if(playBtn === true){
        playBtn = false
        startChronometer()
        myBtn.className = "fa-solid fa-pause"
    }else{
        playBtn = true
        stopChronometer()
        myBtn.className = "fa-solid fa-play"
    }
}

function startChronometer() {
  currentChronometer = setInterval(function () {
    miliSecondsValue += 1;
    if (miliSecondsValue === 100) {
      miliSecondsValue = 0;
      secondsValue += 1;
      secondsSpan.textContent = formatValue(secondsValue);
    } else if (secondsValue === 60) {
      secondsValue = 0;
      minutesValue += 1;
      secondsSpan.textContent = "00";
      minutesSpan.textContent = formatValue(minutesValue);
    } else if (minutesValue === 60) {
      minutesValue = 0;
      hoursValue += 1;
      minutesSpan.textContent = "00";
      hoursSpan.textContent = formatValue(hoursValue);
    }
    milisecondsSpan.textContent = formatValue(miliSecondsValue);
  }, 10);
}

function formatValue(value) {
  return ("0" + value).slice(-2);
}

function stopChronometer() {
  clearInterval(currentChronometer);
}

function resetChronometer() {
  miliSecondsValue = 0;
  secondsValue = 0;
  minutesValue = 0;
  hoursValue = 0;

  milisecondsSpan.textContent = "00";
  secondsSpan.textContent = "00";
  minutesSpan.textContent = "00";
  hoursSpan.textContent = "00";

  stopChronometer();
}

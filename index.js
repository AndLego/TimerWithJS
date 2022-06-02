let milisecondsSpan = document.querySelector("#miliseconds");
let secondsSpan = document.querySelector("#seconds");
let minutesSpan = document.querySelector("#minutes");
let hoursSpan = document.querySelector("#hours");
const playBtn = document.querySelector("#chron-playPause");
const timerButton = document.querySelector("#timer-button");
const hero = document.querySelector("#principal");

let miliSecondsValue = 0;
let secondsValue = 0;
let minutesValue = 0;
let hoursValue = 0;

let currentInterval;

let chronPlayBtn = true;

function playPause() {
  if (chronPlayBtn === true) {
    chronPlayBtn = false;
    startChronometer();
    playBtn.className = "fa-solid fa-pause";
  } else {
    chronPlayBtn = true;
    stopChronometer();
    playBtn.className = "fa-solid fa-play";
  }
}

function startChronometer() {
  currentInterval = setInterval(function () {
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
  clearInterval(currentInterval);
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

  chronPlayBtn = true;
  playBtn.className = "fa-solid fa-play";

  stopChronometer();
}

function executeChronometer() {
  hero.innerHTML = `
    <h1 class="hero--title">Chronometer</h1>
          <div class="hero--time">
            <p id="time">
              <span id="hours">00</span>: <span id="minutes">00</span>:
              <span id="seconds">00</span>,
              <span id="miliseconds">00</span>
            </p>
            <p class="measure">
              <span class="measure--hour">h</span>
              <span class="measure--minute">min</span>
              <span class="measure--second">seg</span>
            </p>
          </div>
          <div class="hero--buttons">
            <button
              onclick="playPause()"
              class="button hero--button playBtn"
              type="button"
            >
              <i id="playPause" class="fa-solid fa-play"></i>
            </button>
            <button
              onclick="resetChronometer()"
              class="button hero--button"
              type="button"
            >
              <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
    `;
  milisecondsSpan = document.querySelector("#miliseconds");
  secondsSpan = document.querySelector("#seconds");
  minutesSpan = document.querySelector("#minutes");
  hoursSpan = document.querySelector("#hours");
}

// TIMER FUNCTIONS --------------------------------------------------------------------------------

const timerBtns = document.getElementById("#timerBtn");
let timerSeconds;
let timerMinutes;
let currentButton;

function setTimer() {
  event.preventDefault();

  timerSeconds = parseInt(event.target.seconds.value);
  timerMinutes = parseInt(event.target.minutes.value);

  secondsSpan.textContent = formatValue(timerSeconds);
  minutesSpan.textContent = formatValue(timerMinutes);
}

// function unlockButtons() {
//   console.log(timerBtns.timerBtns);
// }

function startTimer() {
  currentButton = event.currentTarget;
  console.log(currentButton)
  currentButton.disabled = true;

  secondsValue = timerSeconds;
  minutesValue = timerMinutes;

  currentInterval = setInterval(() => {
    secondsValue -= 1;
    if (secondsValue === -1) {
      secondsValue = 59;
      minutesValue -= 1;
    }
    if (minutesValue === 0 && secondsValue === 0) {
      const container = document.querySelector(".hero--time");
      const title = document.createElement("h2");
      title.textContent = "Riiiing";
      container.appendChild(title);

      clearInterval(currentInterval);
    }
    minutesSpan.textContent = formatValue(minutesValue);
    secondsSpan.textContent = formatValue(secondsValue);
  }, 1000);
}

function stopTimer() {
  if(currentButton){
    currentButton.disabled = false;
  }

  clearInterval(currentInterval);
}

function executeTimer() {
  hero.innerHTML = `
    <h1 class="hero--title">Timer</h1>
          <div class="hero--time">
            <p id="time">
              <span id="hours">00</span>: <span id="minutes">00</span>:
              <span id="seconds">00</span>,
              <span id="miliseconds">00</span>         
            </p>
            <p class="measure">
              <span class="measure--hour">h</span>
              <span class="measure--minute">min</span>
              <span class="measure--second">seg</span>
            </p>
          </div>
          <div class="hero--buttons">
            <form onsubmit="setTimer()" class="timerForm">
              <input value="0" type="number" placeholder="mins" id="minutesInput" name="minutes" > 
              <input value="0" type="number" placeholder="secs" id="secondsInput" name="seconds" > 
              <button           
                class="button hero--button gears-button"
                type="submit">
                <i class="fa-solid fa-gears"></i>
              </button>
             </form>
              
            <button
                onclick="startTimer()"
          
                class="button hero--button timerBtn"
                type="button">
                <i class="fa-solid fa-play"></i>
             </button>

            <button
              onclick="stopTimer()"
          
              class="button hero--button timerBtn"
              type="button">
              <i class="fa-solid fa-pause"></i>
            </button>
            
            <button
              onclick="resetChronometer()"
              class="button hero--button"
              type="button">
              <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
    `;
  secondsSpan = document.querySelector("#seconds");
  minutesSpan = document.querySelector("#minutes");
}

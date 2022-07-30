let seconds = document.querySelector("#seconds");
let minutes = document.querySelector("#minutes");
let hours = document.querySelector("#hours");

let hh = document.getElementById("hh");
let mm = document.getElementById("mm");
let ss = document.getElementById("ss");

let hr_dot = document.querySelector(".hr_dot");
let min_dot = document.querySelector(".min_dot");
let sec_dot = document.querySelector(".sec_dot");

let playBtn = document.querySelector(".playBtn");
let timerButton = document.querySelector("#timer-button");
const hero = document.querySelector(".hero");

let chronNav = document.getElementById("chronometer-button");
let timerNav = document.getElementById("timer-button");
let pomodoroNav = document.getElementById("pomodoro-button");

// CHRONOMETER

let secondsValue = 0;
let minutesValue = 0;
let hoursValue = 0;

let currentInterval;

let chronPlayBtn = true;

function playPause() {
  if (chronPlayBtn === true) {
    startChronometer();
    chronPlayBtn = false;
    playBtn.textContent = "Pause";
  } else {
    stopChronometer();
    chronPlayBtn = true;
    playBtn.textContent = "Play";
  }
}

function startChronometer() {
  currentInterval = setInterval(function () {
    secondsValue += 1;
    timerEffectDash();

    if (secondsValue === 60) {
      secondsValue = 0;
      minutesValue += 1;
      seconds.textContent = "00";
      minutes.textContent = formatValue(minutesValue);
    } else if (minutesValue === 60) {
      minutesValue = 0;
      hoursValue += 1;
      minutes.textContent = "00";
      hours.textContent = formatValue(hoursValue);
    }
    seconds.textContent = formatValue(secondsValue);
  }, 1000);
}

function formatValue(value) {
  return ("0" + value).slice(-2);
}

function stopChronometer() {
  clearInterval(currentInterval);
}

function resetChronometer() {
  secondsValue = 0;
  minutesValue = 0;
  hoursValue = 0;

  seconds.textContent = "00";
  minutes.textContent = "00";
  hours.textContent = "00";

  timerEffectDash();

  chronPlayBtn = true;
  playBtn.textContent = "Start";

  stopChronometer();
}

function executeChronometer() {
  hero.innerHTML = `
  <h1 class="hero--title">Chronometer</h1>

  <section class="circle-container">
    <div class="circle" style="--clr: #ff2972">
      <div class="dots hr_dot"></div>
      <svg>
        <circle cx="48" cy="48" r="48"></circle>
        <circle cx="48" cy="48" r="48" id="hh"></circle>
      </svg>
      <div class="hours-container">
        <div id="hours">00</div>
        <br /><span>Hours</span>
      </div>
    </div>
    <div class="circle" style="--clr: #fee800">
      <div class="dots min_dot"></div>

      <svg>
        <circle cx="48" cy="48" r="48"></circle>
        <circle cx="48" cy="48" r="48" id="mm"></circle>
      </svg>
      <div class="minutes-container">
        <div id="minutes">00</div>
        <br /><span>Minutes</span>
      </div>
    </div>
    <div class="circle" style="--clr: #04fc43">
      <div class="dots sec_dot"></div>

      <svg>
        <circle cx="48" cy="48" r="48"></circle>
        <circle cx="48" cy="48" r="48" id="ss"></circle>
      </svg>
      <div class="seconds-container">
        <div id="seconds">00</div>
        <br /><span>Seconds</span>
      </div>
    </div>
  </section>

  <div class="hero--buttons">
    <button
      onclick="playPause()"
      class="button hero--button playBtn"
      type="button"
    >
      Start
    </button>
    <button
      onclick="resetChronometer()"
      class="button hero--button"
      type="button"
    >
      Stop
    </button>
  </div>
    `;

  chronNav.classList.add("btn-active");
  timerNav.classList.remove("btn-active");
  pomodoroNav.classList.remove("btn-active");

  seconds = document.querySelector("#seconds");
  minutes = document.querySelector("#minutes");
  hours = document.querySelector("#hours");

  hh = document.getElementById("hh");
  mm = document.getElementById("mm");
  ss = document.getElementById("ss");

  hr_dot = document.querySelector(".hr_dot");
  min_dot = document.querySelector(".min_dot");
  sec_dot = document.querySelector(".sec_dot");

  playBtn = document.querySelector(".playBtn");

  resetChronometer();
}

// TIMER FUNCTIONS --------------------------------------------------------------------------------

let timerSeconds;
let timerMinutes;
let currentButton;

function checkValue(sender) {
  let min = sender.min;
  let max = sender.max;

  let value = parseInt(sender.value);
  if (value > max) {
    sender.value = max;
  } else if (value < min) {
    sender.value = min;
  }
}

function setTimer() {
  event.preventDefault();

  const container = document.querySelector(".title-timer");
  container.textContent = "Timer";

  timerSeconds = parseInt(event.target.seconds.value);
  timerMinutes = parseInt(event.target.minutes.value);

  seconds.textContent = formatValue(timerSeconds);
  minutes.textContent = formatValue(timerMinutes);

  if (timerSeconds == 0 && timerMinutes == 0) {
    lockButtons();
  } else {
    unlockButtons();
  }
  secondsValue = timerSeconds;
  minutesValue = timerMinutes;
  startingTimerPomodoro();
}

function unlockButtons() {
  const startBtn = document.querySelector(".startBtn");
  startBtn.removeAttribute("disabled");
  const stopBtn = document.querySelector(".stopBtn");
  stopBtn.removeAttribute("disabled");
}

function lockButtons() {
  const stopBtn = document.querySelector(".stopBtn");
  const startBtn = document.querySelector(".startBtn");
  stopBtn.setAttribute("disabled", "disabled");
  startBtn.setAttribute("disabled", "disabled");
}

function startTimer() {
  currentButton = event.currentTarget;
  currentButton.disabled = true;

  secondsValue = timerSeconds;
  minutesValue = timerMinutes;

  currentInterval = setInterval(() => {
    secondsValue -= 1;
    timerSeconds = secondsValue;

    timerEffectDashTimerPomodoro();

    if (secondsValue === -1) {
      secondsValue = 59;
      minutesValue -= 1;
      timerMinutes = minutesValue;
    }
    if (minutesValue === 0 && secondsValue === 0) {
      const container = document.querySelector(".title-timer");
      container.textContent = "Riiiing";
      lockButtons();

      clearInterval(currentInterval);
    }
    minutes.textContent = formatValue(minutesValue);
    seconds.textContent = formatValue(secondsValue);
  }, 1000);

  const stopBtn = document.querySelector(".stopBtn");
  stopBtn.removeAttribute("disabled");
}

function stopTimer() {
  if (currentButton) {
    currentButton.disabled = false;
    const stopBtn = document.querySelector(".stopBtn");
    stopBtn.setAttribute("disabled", "disabled");
  }

  clearInterval(currentInterval);
}

function resetTimer() {
  stopTimer();
  executeTimer();
}

function executeTimer() {
  hero.innerHTML = `
         <h1 class="hero--title title-timer">Timer</h1>

         <section class="circle-container">
            <div class="circle" style="--clr: #fee800">
              <div class="dots min_dot"></div>

              <svg>
                <circle cx="48" cy="48" r="48"></circle>
                <circle cx="48" cy="48" r="48" id="mm"></circle>
              </svg>
              <div class="minutes-container">
                <div id="minutes">00</div>
                <br /><span>Minutes</span>
              </div>
            </div>
            <div class="circle" style="--clr: #04fc43">
              <div class="dots sec_dot"></div>

              <svg>
                <circle cx="48" cy="48" r="48"></circle>
                <circle cx="48" cy="48" r="48" id="ss"></circle>
              </svg>
              <div class="seconds-container">
                <div id="seconds">00</div>
                <br /><span>Seconds</span>
              </div>
            </div>
         </section>

          <form onsubmit="setTimer()" class="timerForm">           
                  <input value="0" type="number" min="0" max="59" oninput="checkValue(this)" placeholder="0" id="minutesInput" name="minutes" > 
                  <label for="minutesInput" class="minutes--input">Minutes</label>
                   <input value="0" type="number" min="0" max="59" oninput="checkValue(this)" placeholder="0" id="secondsInput" name="seconds" > 
                  <label for="secondsInput" class="seconds--input">Seconds</label>
              <button           
                class="button hero--button timerBtn"
                type="submit">
                Set
              </button>
          </form>

          <div class="hero--buttons">  
            <button
                onclick="startTimer()"
                disabled="disabled"
                class="button hero--button timerBtn startBtn"
                type="button">
                <i class="fa-solid fa-play"></i>
             </button>

            <button
              onclick="stopTimer()"
              disabled="disabled"
              class="button hero--button timerBtn stopBtn"
              type="button">
              <i class="fa-solid fa-pause"></i>
            </button>
            
            <button
              onclick="resetTimer()"
              class="button hero--button timerBtn"
              type="button">
              <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
    `;
  chronNav.classList.remove("btn-active");
  timerNav.classList.add("btn-active");
  pomodoroNav.classList.remove("btn-active");

  seconds = document.querySelector("#seconds");
  minutes = document.querySelector("#minutes");

  hh = document.getElementById("hh");
  mm = document.getElementById("mm");
  ss = document.getElementById("ss");

  hr_dot = document.querySelector(".hr_dot");
  min_dot = document.querySelector(".min_dot");
  sec_dot = document.querySelector(".sec_dot");

  startingTimerPomodoro();
  stopPomodoro();
  clearInterval(currentInterval);
}

/////POMODORO CODE ---------------------------------------------------------------

let sessionValue;
let breakValue;

function substract() {
  if (sessionValue > 1) {
    sessionValue -= 1;
    sessionTag.innerHTML = sessionValue;
  }
}

function add() {
  if (sessionValue < 59) {
    sessionValue += 1;
    sessionTag.innerHTML = sessionValue;
  }
}

function substractBreak() {
  if (breakValue > 1) {
    breakValue -= 1;
    breakTag.innerHTML = breakValue;
  }
}

function addBreak() {
  if (breakValue < 59) {
    breakValue += 1;
    breakTag.innerHTML = breakValue;
  }
}

let pomodoroPlayBtn = true;
let pomodoro = true;

function playPausePomodoro() {
  let pomPlayBtn = document.querySelector(".pomPlayBtn");

  if (pomodoroPlayBtn === true) {
    pomodoro ? startPomodoro() : startBreak();
    pomodoroPlayBtn = false;
    pomPlayBtn.textContent = "Pause";
  } else {
    stopPomodoro();
    pomodoroPlayBtn = true;
    pomPlayBtn.textContent = "Play";
  }
}

function startPomodoro() {
  pomodoro = true;

  const container = document.querySelector(".title-timer");
  container.textContent = "Session";

  minutesValue = sessionValue;

  currentInterval = setInterval(() => {
    secondsValue -= 1;
    timerEffectDashTimerPomodoro();

    if (secondsValue === -1) {
      secondsValue = 59;
      minutesValue -= 1;
      sessionValue = minutesValue;
    }
    if (minutesValue === 0 && secondsValue === 0) {
      const container = document.querySelector(".title-timer");
      container.textContent = "Break";
      breakValue = parseInt(document.querySelector("#breakTime").innerHTML);
      clearInterval(currentInterval);
      startBreak();
    }
    minutes.textContent = formatValue(minutesValue);
    seconds.textContent = formatValue(secondsValue);
  }, 10);
}

function startBreak() {
  pomodoro = false;

  minutesValue = breakValue;

  currentInterval = setInterval(() => {
    secondsValue -= 1;
    timerEffectDashTimerPomodoro();
    if (secondsValue === -1) {
      secondsValue = 59;
      minutesValue -= 1;
      breakValue = minutesValue;
    }
    if (minutesValue === 0 && secondsValue === 0) {
      const container = document.querySelector(".title-timer");
      container.textContent = "Session";
      sessionValue = parseInt(document.querySelector("#sessionTime").innerHTML);
      clearInterval(currentInterval);
      startPomodoro();
    }
    minutes.textContent = formatValue(minutesValue);
    seconds.textContent = formatValue(secondsValue);
  }, 10);
}

function stopPomodoro() {
  clearInterval(currentInterval);
}

function resetPomodoro() {
  stopPomodoro();
  executePomodoro();
}

function executePomodoro() {
  hero.innerHTML = `
  <h1 class="hero--title title-timer">Pomodoro</h1>

          <div class="pomodoroSettings">   

              <div class="session-container">          
                  <h3 class="sessionTitle">Session Length</h3> 
                  <div class="pomodoroSession">  
                      <button onclick="substract()" id="substractSession">-</button>     
                      <p id="sessionTime">25</p> 
                      <button onclick="add()" id="addSession">+</button>     
                  </div> 
              </div>
              <div class="break-container">
                  <h3 class="breakTitle">Break Length</h3> 
                  <div class="pomodoroBreak">  
                      <button onclick="substractBreak()" id="substractBreak">-</button>     
                      <p id="breakTime">5</p> 
                      <button onclick="addBreak()" id="addBreak">+</button>     
                  </div> 
              </div>

          </div>

          <section class="circle-container">
                <div class="circle" style="--clr: #fee800">
                  <div class="dots min_dot"></div>

                  <svg>
                    <circle cx="48" cy="48" r="48"></circle>
                    <circle cx="48" cy="48" r="48" id="mm"></circle>
                  </svg>
                  <div class="minutes-container">
                    <div id="minutes">00</div>
                    <br /><span>Minutes</span>
                  </div>
                </div>
                <div class="circle" style="--clr: #04fc43">
                  <div class="dots sec_dot"></div>

                  <svg>
                    <circle cx="48" cy="48" r="48"></circle>
                    <circle cx="48" cy="48" r="48" id="ss"></circle>
                  </svg>
                  <div class="seconds-container">
                    <div id="seconds">00</div>
                    <br /><span>Seconds</span>
                  </div>
                </div>
           </section>
        
          <div class="hero--buttons">  
            <button
                id="playSession"
                onclick="playPausePomodoro()"
                class="button hero--button pomPlayBtn"
                type="button">
                Play
             </button>
            
            <button
              onclick="resetPomodoro()"
              class="button hero--button"
              type="button">
              <i class="fa-solid fa-arrow-rotate-right"></i>
            </button>
          </div>
    `;
    chronNav.classList.remove("btn-active");
    timerNav.classList.remove("btn-active");
    pomodoroNav.classList.add("btn-active");

  hh = document.getElementById("hh");
  mm = document.getElementById("mm");
  ss = document.getElementById("ss");

  hr_dot = document.querySelector(".hr_dot");
  min_dot = document.querySelector(".min_dot");
  sec_dot = document.querySelector(".sec_dot");

  sessionValue = parseInt(document.querySelector("#sessionTime").innerHTML);
  sessionTag = document.querySelector("#sessionTime");
  breakValue = parseInt(document.querySelector("#breakTime").innerHTML);
  breakTag = document.querySelector("#breakTime");
  seconds = document.querySelector("#seconds");
  minutes = document.querySelector("#minutes");

  startingTimerPomodoro();
  clearInterval(currentInterval);
}

// Timer EFFECT

//Startin value

hh.style.strokeDashoffset = 300 - (300 * hoursValue) / 12;
//12 hours
mm.style.strokeDashoffset = 300 - (300 * minutesValue) / 60;
//60 minutes
ss.style.strokeDashoffset = 300 - (300 * secondsValue) / 60;
//60 seconds

const startingTimerPomodoro = () => {
  mm.style.strokeDashoffset = 300 - (300 * minutesValue) / 60;
  ss.style.strokeDashoffset = 300 - (300 * secondsValue) / 60;

  min_dot.style.transform = `rotate(${minutesValue * 6}deg)`;
  sec_dot.style.transform = `rotate(${secondsValue * 6}deg)`;
};

const timerEffectDash = () => {
  hh.style.strokeDashoffset = 300 - (300 * hoursValue) / 12;
  //12 hours
  mm.style.strokeDashoffset = 300 - (300 * minutesValue) / 60;
  //60 minutes
  ss.style.strokeDashoffset = 300 - (300 * secondsValue) / 60;
  //60 seconds

  hr_dot.style.transform = `rotate(${hoursValue * 30}deg)`;
  //360 / 12 = 30
  min_dot.style.transform = `rotate(${minutesValue * 6}deg)`;
  //360 / 60 = 6
  sec_dot.style.transform = `rotate(${secondsValue * 6}deg)`;
  //360 / 60 = 6
};

const timerEffectDashTimerPomodoro = () => {
  mm.style.strokeDashoffset = 300 - (300 * minutesValue) / 60;
  //60 minutes
  ss.style.strokeDashoffset = 300 - (300 * secondsValue) / 60;
  //60 seconds

  min_dot.style.transform = `rotate(${minutesValue * 6}deg)`;
  //360 / 60 = 6
  sec_dot.style.transform = `rotate(${secondsValue * 6}deg)`;
  //360 / 60 = 6
};

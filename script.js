// indicate variables
const timerCount = document.getElementById("timerCount");
const sessionNum = document.querySelector(".session-num");
const breakNum = document.querySelector(".break-num");
const sessionBtnMinus = document.getElementById("session-btn-minus");
const sessionBtnPlus = document.getElementById("session-btn-plus");
const breakBtnMinus = document.getElementById("break-btn-minus");
const breakBtnPlus = document.getElementById("break-btn-plus");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause-btn button");
const sessionElement = document.querySelector(".session");

// Set initial session and break lengths
let sessionLength = parseInt(sessionNum.textContent);
let breakLength = parseInt(breakNum.textContent);
let isSession = true;
let timer;
let isPaused = false;
let totalSeconds;

// Function to start the timer
function startTimer(duration) {
  totalSeconds = duration * 60;

  timer = setInterval(function () {
    if (!isPaused) {
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      timerCount.textContent = minutes + ":" + seconds;

      if (--totalSeconds < 0) {
        clearInterval(timer);
        if (isSession) {
          startBreak();
        } else {
          startSession();
        }
      }
    }
  }, 1000);
}

// Function to start the session
function startSession() {
  isSession = true;
  sessionLength = parseInt(sessionNum.textContent);
  sessionElement.textContent = "Session";
  timerCount.textContent = padWithZero(sessionLength) + ":00";
  startTimer(sessionLength);
}

// Function to start the break
function startBreak() {
  isSession = false;
  breakLength = parseInt(breakNum.textContent);
  sessionElement.textContent = "Break";
  timerCount.textContent = padWithZero(breakLength) + ":00";
  startTimer(breakLength);
}

// Function to pad number with zero if less than 10
function padWithZero(num) {
  return num < 10 ? "0" + num : num;
}

// Event listener for start button
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  if (isSession) {
    startSession();
  } else {
    startBreak();
  }
});

// Event listener for pause button
pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
});

// Event listeners for session length buttons
sessionBtnMinus.addEventListener("click", () => {
  if (sessionLength > 1) {
    sessionNum.textContent = --sessionLength;
  }
});

sessionBtnPlus.addEventListener("click", () => {
  sessionNum.textContent = ++sessionLength;
});

// Event listeners for break length buttons
breakBtnMinus.addEventListener("click", () => {
  if (breakLength > 1) {
    breakNum.textContent = --breakLength;
  }
});

breakBtnPlus.addEventListener("click", () => {
  breakNum.textContent = ++breakLength;
});

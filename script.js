let display = document.getElementById("display");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let lapsList = document.getElementById("laps");
let themeSwitch = document.getElementById("themeSwitch");

let timer = null;
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let isRunning = false;

// Update display
function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;
  display.textContent = `${h}:${m}:${s}.${ms}`;
}

// Timer function
function runTimer() {
  milliseconds += 10;
  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
    hours++;
  }
  updateDisplay();
}

// Start
startBtn.addEventListener("click", function () {
  if (!isRunning) {
    timer = setInterval(runTimer, 10);
    isRunning = true;
  }
});

// Stop
stopBtn.addEventListener("click", function () {
  clearInterval(timer);
  isRunning = false;
});

// Reset
resetBtn.addEventListener("click", function () {
  clearInterval(timer);
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  isRunning = false;
  lapsList.innerHTML = "";
});

// Lap
lapBtn.addEventListener("click", function () {
  if (isRunning) {
    let li = document.createElement("li");
    li.textContent = display.textContent;
    lapsList.appendChild(li);
  }
});

// Theme Toggle
themeSwitch.addEventListener("change", function () {
  document.body.classList.toggle("dark");
});

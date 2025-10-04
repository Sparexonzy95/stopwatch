// Get references to the HTML elements we need
let display = document.getElementById("display"); // The stopwatch display
let startBtn = document.getElementById("start"); // Start button
let stopBtn = document.getElementById("stop");   // Stop button
let resetBtn = document.getElementById("reset"); // Reset button
let lapBtn = document.getElementById("lap");     // Lap button
let lapsList = document.getElementById("laps");  // List to show lap times
let themeSwitch = document.getElementById("themeSwitch"); // Theme toggle switch

// Initialize timer variables
let timer = null; // Will hold the interval ID for starting/stopping the timer
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0]; // Stopwatch time
let isRunning = false; // Keeps track of whether the stopwatch is running

// Function to update the stopwatch display
function updateDisplay() {
  // Add leading zeros for a nice format (e.g., 01:05:09.007)
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;

  // Update the text content of the display element
  display.textContent = `${h}:${m}:${s}.${ms}`;
}

// Timer logic that runs every 10 milliseconds
function runTimer() {
  milliseconds += 10; // Increment milliseconds by 10
  if (milliseconds === 1000) { // 1000ms = 1 second
    milliseconds = 0; 
    seconds++;
  }
  if (seconds === 60) { // 60 seconds = 1 minute
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) { // 60 minutes = 1 hour
    minutes = 0;
    hours++;
  }
  updateDisplay(); // Always update the display after changing time
}

// Start button functionality
startBtn.addEventListener("click", function () {
  if (!isRunning) { // Only start if the timer is not already running
    timer = setInterval(runTimer, 10); // Run the timer every 10ms
    isRunning = true; // Mark the stopwatch as running
  }
});

// Stop button functionality
stopBtn.addEventListener("click", function () {
  clearInterval(timer); // Stop the interval
  isRunning = false;    // Mark the stopwatch as stopped
});

// Reset button functionality
resetBtn.addEventListener("click", function () {
  clearInterval(timer); // Stop the timer
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0]; // Reset all time variables
  updateDisplay(); // Update the display to show 00:00:00.000
  isRunning = false; // Mark the stopwatch as stopped
  lapsList.innerHTML = ""; // Clear all recorded lap times
});

// Lap button functionality
lapBtn.addEventListener("click", function () {
  if (isRunning) { // Only record a lap if the timer is running
    let li = document.createElement("li"); // Create a new list item
    li.textContent = display.textContent; // Set its text to the current stopwatch time
    lapsList.appendChild(li); // Add it to the laps list
  }
});

// Theme toggle functionality
themeSwitch.addEventListener("change", function () {
  document.body.classList.toggle("dark"); // Add/remove 'dark' class on body to switch theme
});

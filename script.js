// Get DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

// Stopwatch state
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

// Format time to HH:MM:SS.mmm
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;

    return (
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}.` +
        `${milliseconds.toString().padStart(3, '0')}`
    );
}

// Update the display
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10); // Update every 10ms for milliseconds
        isRunning = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

// Stop the stopwatch
stopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    display.textContent = '00:00:00.000';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    laps.innerHTML = ''; // Clear lap times
    lapCount = 0;
});

// Record lap time
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        lapCount++;
        const lapTime = formatTime(elapsedTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        laps.prepend(lapElement); // Add new lap at the top
    }
});

// Initialize button states
stopBtn.disabled = true;
lapBtn.disabled = true;
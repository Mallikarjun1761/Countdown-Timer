let timerInterval;
let timeLeft;
let isPaused = false;
const alarmSound = new Audio('alarm.mp3');

function startTimer() {
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

    timeLeft = hours * 3600 + minutes * 60 + seconds;

    if (timeLeft > 0) {
        isPaused = false;
        updateTimerDisplay();
        timerInterval = setInterval(updateTimer, 1000);
        hideStartButton();  // Hide the start button when the timer starts
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = true;
}

function resumeTimer() {
    if (isPaused) {
        timerInterval = setInterval(updateTimer, 1000);
        isPaused = false;
    }
}

function restartTimer() {
    resetTimer();
    startTimer();
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('timer').style.display = 'block';
    document.getElementById('finishedMsg').style.display = 'none';
    timeLeft = 0; // Reset timeLeft
}

function updateTimer() {
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('timer').style.display = 'none';
        document.getElementById('finishedMsg').style.display = 'block';
        alarmSound.play();  // Play the alarm sound
        showStartButton();  // Show the start button when the timer finishes
        return;
    }
    timeLeft--;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function hideStartButton() {
    document.getElementById('startButton').style.display = 'none';
}

function showStartButton() {
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('startButton').onclick = function() {
        resetTimer();
        startTimer();
    };
}

document.addEventListener('DOMContentLoaded', function () {
  const timerDisplay = document.getElementById('timer');
  const messageDisplay = document.getElementById('message');
  const startButton = document.getElementById('start-button');
  const pauseButton = document.getElementById('pause-button');

  let minutes = 1;
  let seconds = 0;
  let interval;

  function updateTimer() {
    timerDisplay.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  function showMessage(message) {
    messageDisplay.innerText = message;
  }

  function startPomodoro() {
    showMessage('');
    if (minutes === 0 && seconds === 0) {
      minutes = 1;
      seconds = 0;
    }
    interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        showMessage('¡Pomodoro terminado! Tómate un descanso.');
        clearInterval(interval);
        return;
      }
      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      updateTimer();
    }, 1000);
  }

  function pausePomodoro() {
    clearInterval(interval);
    showMessage('Pomodoro pausado');
  }

  startButton.addEventListener('click', startPomodoro);
  pauseButton.addEventListener('click', pausePomodoro);

  updateTimer();
  startPomodoro(); // Iniciar el Pomodoro automáticamente al cargar la página
})
let clockInterval;
let timerRunning = false;

function startClock() {
  if (!timerRunning) {
    clockInterval = setInterval(updateTime, 1000);
    timerRunning = true;
  }
}

function stopClock() {
  clearInterval(clockInterval);
  timerRunning = false;
}

function sendBreakMessage() {
  alert("¡Tomar un descanso de 5 minutos!");
  setTimeout(sendResumeMessage, 300000); // 300,000 milisegundos = 5 minutos
}

function sendResumeMessage() {
  alert("¡Reanudar actividad!");
}

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById('time').textContent = timeString;

  // Verifica si han pasado 25 minutos
  if (minutes === '25' && seconds === '00') {
    sendBreakMessage();
  }
}

document.getElementById('startButton').addEventListener('click', startClock);
document.getElementById('stopButton').addEventListener('click', stopClock);

// Iniciar el reloj automáticamente al cargar la página
startClock();

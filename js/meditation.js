const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startMeditation');
const stopBtn = document.getElementById('stopMeditation');

let timer = null;
let remaining = 600;

const renderTime = () => {
  const m = String(Math.floor(remaining / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
};

renderTime();

startBtn?.addEventListener('click', () => {
  if (timer) return;
  remaining = 600;
  renderTime();
  timer = setInterval(() => {
    remaining -= 1;
    renderTime();
    if (remaining <= 0) {
      clearInterval(timer);
      timer = null;
      alert('مراقبه پایان یافت.');
    }
  }, 1000);
});

stopBtn?.addEventListener('click', () => {
  clearInterval(timer);
  timer = null;
  remaining = 600;
  renderTime();
});
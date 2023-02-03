
import Notiflix from 'notiflix';
import  flatpickr  from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startBtn: document.querySelector('[data-start]'),
  elemDay: document.querySelector('[data-days]'),
  elemHours: document.querySelector('[data-hours]'),
  elemMin: document.querySelector('[data-minutes]'),
  elemSec: document.querySelector('[data-seconds]'),
  picker: document.querySelector('#datetime-picker'),
};

refs.startBtn.disabled = true;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  clickOpens: true,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    if (countdownTimer.isActive) {
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
    return userSelectedDate;
  },
};

const fp = flatpickr(refs.picker, options);

const countdownTimer = {
  start() {
    this.isActive = true;
    refs.startBtn.disabled = true;
    fp._input.disabled = true;
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userSelectedDate - currentTime;
      if (deltaTime <= 0) {
        clearInterval(timerId);
        return;
      }
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      countdownTimerFace({ days, hours, minutes, seconds });
    }, 1000);
  },
};

refs.startBtn.addEventListener('click', () => {
  countdownTimer.start();
});

function countdownTimerFace({ days, hours, minutes, seconds }) {
  refs.elemDay.textContent = `${days}`;
  refs.elemHours.textContent = `${hours}`;
  refs.elemMin.textContent = `${minutes}`;
  refs.elemSec.textContent = `${seconds}`;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
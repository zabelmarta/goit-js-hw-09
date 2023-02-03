

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  delayStep: document.querySelector('input[name="step"]'),
  promiseAmount: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button[type="submit"]'),
};

const promiseData = {};

refs.form.addEventListener('input', formData);
refs.form.addEventListener('submit', onFormSubmit);

function formData(e) {
  promiseData[e.target.name] = e.target.value;
}

function onFormSubmit(e) {
  e.preventDefault();
  if (checkInput(promiseData)) {
    let { delay, step, amount } = promiseData;
    [delay, step, amount] = [delay, step, amount].map(Number);
    let currentDelay;
    let currentPosition;

    for (let i = 0; i < amount; i += 1) {
      currentDelay = delay + step * i;
      currentPosition = i + 1;
      createPromise(currentDelay, currentPosition)
        .then(({ delay, position }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ delay, position }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
    e.target.reset();
  } else {
    Notify.warning('Value should not be less than 0❗');
  }
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }
function createPromise(delay, position) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ delay, position });
      } else {
        reject({ delay, position });
      }
    }, delay);
  });
}

function checkInput(inputData) {
  return Object.values(inputData).every(elem => elem >= 0);
}
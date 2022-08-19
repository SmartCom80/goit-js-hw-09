/*
Створюємо функцію, яка прикожному сабміті форми, створює завдану кількість промісів.

Параметри та кількість промісів, завдається в відповідних полях форми.

Використовуємо бібліотеку Notiflix, для відображення спливаючих повідомлень, з інформацією про стан роботи створеного промісу.*/

//Змінні
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const formData = new FormData();

let position = 0;
let amount = 0;
let delay = 0;
let step = 0;

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

// Функції

//  Колбек-функція для отримання данних з форми
function onFormInput(event) {
  const evt = event.target;
  //   console.log('evt.name :>> ', evt.name);
  //   console.log('evt.value :>> ', evt.value);
  formData.set(evt.name, evt.value);
  return formData;
}

// Колбек-функція для виклику промісів в циклі
function onFormSubmit(event) {
  event.preventDefault();
  amount = Number(formData.get('amount'));
  delay = Number(formData.get('delay'));
  step = Number(formData.get('step'));

  for (let i = 0; i < amount; i += 1) {
    position += 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  position = 0;
  return;
}

// Функція-конструктор промісу
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

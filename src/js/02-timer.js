/* Логіка роботи
Викликаємо функцію, яка ініціалізує об'єкт календаря за допомогою бібліотеки flatpikr

Вибираємо момент часу, з якого почнетьсі відлік таймеру. якщо момент часу менше або дорівнює поточному, викликаємо вспливаюче попередження користувачу, що дата повинна бути вибрана коректною, з майбутнього. Кнопка Start неактивна.
Якщо, дата вибрана коректно, кнопка Start стає активною. 

Та після її натискання видаємо схвалювальне віконце, в якому оголошуємо, що таймер запрацював і відлік часу почався. Дані типи сповіщень реалізовані за допомогою бібліотеки notiflx

Відлік часу, відбувається з інтервалом в 1 секунду, та відображається на сторінці сайту.

Функції.

1. convertMs() - виконує відлік часу від вибраного значення в календарі та повертає результат у зовнішній код.

2.	addLeadingZero() - виконує додавання нуля, якщо в числі менше 2 знаків. Функція має використовувати метод padStart().

3. notifyPopUp() - виводить на екран інформаційні повідомлення та розблоковує кнопку Start таймеру.

4. onTimer() - реалізовує таймер зі зворотнім відліком

5. onShowTimer() - реалізовує вивід значень комірок таймера
*/

import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerArray = {};
const startBtn = document.querySelector('[data-start]');
const refs = {
  day: document.querySelector('[data-days]'),
  hour: document.querySelector('[data-hours]'),
  minute: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
};
const TIMER_INTERVAL = 1000;
// Кнопка Start деактивована за замовчуванням
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  onTimer(calendar.targetTime);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //  console.log(selectedDates[0]);
    const targetTime = selectedDates[0] - options.defaultDate;
    this.targetTime = targetTime;
    notifyPopUp(targetTime);
  },
};
let calendar = flatpickr('#datetime-picker', options);

// Функція виводить значення комірок таймера
function onShowTimer(timerArray) {
  const { days, hours, minutes, seconds } = timerArray;
  refs.day.textContent = addLeadingZero(days);
  refs.hour.textContent = addLeadingZero(hours);
  refs.minute.textContent = addLeadingZero(minutes);
  refs.second.textContent = addLeadingZero(seconds);
}

//	Функція реалізовує таймер зі зворотним відліком до вказаної дати
function onTimer(ms) {
  //   console.log('ms :>> ', ms);
  //   console.log('TIMER_INTERVAL :>> ', TIMER_INTERVAL);
  startBtn.disabled = true;
  const timerId = setInterval(() => {
    if (ms < TIMER_INTERVAL) {
      clearInterval(timerId);
      Notify.success('All right. Counter is correct finished');
      console.log('Stop_interval :>> ', 'Stop interval');
    }

    timerArray = convertMs(ms);
    onShowTimer(timerArray);
    ms -= TIMER_INTERVAL;
  }, TIMER_INTERVAL);
}

// Функція конвертації значення з мілісекунд в людино-зручний формат
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const secondMs = 1000;
  const minuteMs = secondMs * 60;
  const hourMs = minuteMs * 60;
  const dayMs = hourMs * 24;

  // Remaining days
  const days = Math.floor(ms / dayMs);
  // Remaining hours
  const hours = Math.floor((ms % dayMs) / hourMs);
  // Remaining minutes
  const minutes = Math.floor(((ms % dayMs) % hourMs) / minuteMs);
  // Remaining seconds
  const seconds = Math.floor((((ms % dayMs) % hourMs) % minuteMs) / secondMs);

  return { days, hours, minutes, seconds };
}

// Функція додавання нуля до значень елементів таймеру
function addLeadingZero(value) {
  if (value.toString().length < 2) {
    return value.toString().padStart(2, 0);
  }
  return value;
}

// Функція виклику інформаційних повідомлень.
function notifyPopUp(value) {
  if (value > 0) {
    Notify.success('All right. I start the countdown timer');
    startBtn.disabled = false;
    return;
  }
  startBtn.disabled = true;
  Notify.failure('Please, choose a date in the future');
}

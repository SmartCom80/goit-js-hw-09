/*  Логіка виконання:
 1. 	Викликаємо функцію onListenerBTn прослуховування подій на кнопках Start / Stop. Stop за замовчуванням неактивна.
 2.  	Якщо викликано Start, то викликаємо функцію зміни кольору onColor Switcher
 3. 	Та блокуємо можливість повторного натискання кнопки Start та виклику наступного екземпляру функції onColorSwitcher, до того як завершить свою роботу попередній екземпляр.
 4.	При натисненні кнопки Stop, зупинямо дію функції colorSwitcher, та активуємо кнопку Start.

 Функції:
1.	onListenerBtn - прослуховує події на кнопках, та викликає або завершує виконання функції onColorSwitcher.
2. onColorSwitcher - реалізує зміну кольору тега body, та блокування кнопки Start.
3. getRandomHexColor - генерує кольор з допомогою методу Math.random
4. onTimer - встановлює інтервал спрацювання setInterval функціі onColorSwitcher.
5. onDefaultState - вимикає setInterval та скидає на налаштування по замовчуванню стиль body і активність кнопки Stop.

*/

// Додаємо змінні-посилання на об'єкти DOM
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

// кнопка Stop за замовчуванням неактивна
stopBtn.disabled = true;

// Запускаємо функцію прослуховування натискання на кнопки
onListenerBTn();

function onListenerBTn() {
  // Додаємо прослуховувачі на кнопки Start / Stop
  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    onTimer();
  });

  stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    onDefaultState();
  });
}

function onTimer() {
  return (timerId = setInterval(() => {
    onColorSwitcher();
  }, 1000));
}

function onColorSwitcher() {
  body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onDefaultState() {
  stopBtn.disabled = true;
  clearInterval(timerId);
  body.style.backgroundColor = null;
}

let workTime = 25 * 60;
let shortBreakTime = 5 * 60;
let timer;
let isRunning = false;
let time = workTime;
let tasks = [];

// Функция обновления таймера
function updateTimer() {
  const minutes = Math.max(0, Math.floor(time / 60));
  const seconds = Math.max(0, time % 60);
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Функция запуска таймера
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimer();
      } else {
        clearInterval(timer);
        isRunning = false;
        handleTimerCompletion();
      }
    }, 1000);
  }
}

// Функция приостановки таймера
function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

// Функция сброса таймера
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  time = workTime;
  updateTimer();
}

// Функция обработки завершения таймера
function handleTimerCompletion() {
  if (time === 0) {
    // Завершение короткого перерыва, запуск таймера работы
    time = workTime;
  } else {
    // Завершение времени работы, запуск таймера короткого перерыва
    time = shortBreakTime;
  }

  updateTimer();
  startTimer();
}

// Функция обновления состояния текущей задачи
function updateCurrentTaskState() {
  const currentTaskTitle = document.getElementById('current-task');

  if (time === workTime) {
    currentTaskTitle.textContent = 'Время работы';
  } else if (time === shortBreakTime) {
    currentTaskTitle.textContent = 'Короткий перерыв';
  }

  const timerStatus = time === workTime ? 'Время работы' : 'Короткий перерыв';
  document.getElementById('current-task').textContent = timerStatus;
}

// Функция добавления задачи
function addTask(name) {
  tasks.push({
    name: name,
    completed: false
  });

  updateTaskList();
}

// Функция удаления задачи
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskList();
}

// Функция обработки клика по задаче
function handleTaskClick(index) {
  if (index < tasks.length) {
    const task = tasks[index];
    task.completed = !task.completed;
    updateTaskList();
  }
}

// Функция обновления списка задач
function updateTaskList() {
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.name;

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskItem.addEventListener('click', () => {
      handleTaskClick(index);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// Функция отображения настроек
function showSettings() {
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('active');
}

// Функция сохранения настроек
function saveSettings() {
  const workTimeInput = document.getElementById('work-time-input');
  const shortBreakInput = document.getElementById('short-break-input');

  workTime = parseInt(workTimeInput.value) * 60;
  shortBreakTime = parseInt(shortBreakInput.value) * 60;

  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('active');

  time = workTime;
  updateTimer();
}

// Обработчик события отправки формы добавления задачи
document.querySelector('.task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.querySelector('.task-input');
  const taskName = taskInput.value.trim();
  if (taskName !== '') {
    addTask(taskName);
    taskInput.value = '';
  }
});

// Обработчик события клика по кнопке "Старт"
document.querySelector('.start-btn').addEventListener('click', startTimer);

// Обработчик события клика по кнопке "Пауза"
document.querySelector('.pause-btn').addEventListener('click', pauseTimer);

// Обработчик события клика по кнопке "Сброс"
document.querySelector('.reset-btn').addEventListener('click', resetTimer);

// Обработчик события клика по кнопке "Настройка"
document.querySelector('.settings-btn').addEventListener('click', showSettings);

// Обработчик события клика по кнопке "Сохранить" в окне настроек
document.querySelector('.save-btn').addEventListener('click', saveSettings);

// Инициализация
updateTimer();
updateTaskList();

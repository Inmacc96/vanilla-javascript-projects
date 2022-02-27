const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");

renderTime();
renderTasks();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask); // Agrega el objeto newTask al principio del array
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
            <div class="task">
                <div class="completed">${
                  task.completed
                    ? `<span class="done">Done</span>`
                    : `<button class="start-button" data-id="${task.id}">Start</button>`
                }</div>
                <div class="title">${task.title}</div>
            </div>
        `;
  }); // Array de strings con la estrucutra html

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join(''); //Unimos todos los strings del array por un espacio vacío

  const startButtons = document.querySelectorAll(".task .start-button");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!timer) {
        const id = button.getAttribute("data-id");
        startButtonHandler(id);
        button.textContent = "In progress ...";
      }
    });
  });
}

function startButtonHandler(id) {
  time = 25* 60; // 25 min en segundos
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  taskName.textContent = tasks[taskIndex].title;

  renderTime();
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}


function timerHandler(id) {
    time--;
    renderTime();
    if (time === 0) {
      clearInterval(timer);
      markCompleted(id);
      timer = null;
      renderTasks();
    }
  }
  
  function renderTime() {
    const timeDiv = document.querySelector("#time #value");
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);
  
    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }
  
  function markCompleted(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    console.log(tasks, id, tasks[taskIndex]);
    tasks[taskIndex].completed = true;
  }
  
 
  

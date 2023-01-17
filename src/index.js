import './style.css';
// Declare Global Variables
const listContainer = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const form = document.querySelector('.todo-form');
let tasks;
// Create array from LS
if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

const displayTasks = function (storage) {
  // const arrsorted = tasks.sort((a, b) => a.index - b.index);
  const html = `
  <div class="task-wrapper">
     <div class="description-container">
      <form class="completed-form">
        <input
         class="checkbox"
         type="checkbox">
        <input 
        id=${storage.index}
         type= "text"
         class="task-text"
         changetask
         value="${storage.description}"
         readonly> 
      </form>
     </div>
     <div class="icons-task">
     <i class="fa-solid fa-ellipsis-vertical"></i>
     <i id="${storage.index}" class="fa-solid fa-trash-can"></i>
     </div>
    
    </div>`;
  listContainer.innerHTML += html;
};

/// LOCAL STORAGE
// --Add tasks to Local Storage
const addTaskToStorage = function (arr, newTaskInput) {
  // create index
  let index;
  const len = arr.length;
  if (len === 0 || len === null) {
    index = 0;
  } else {
    index = arr[len - 1].index + 1;
  }
  // create object and push it to array and LS
  const newTask = { description: newTaskInput, status: false, index };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks(newTask);
};
// --Remove task from Local Storage
const removeItemfromLs = function (id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter((e) => e.index.toString() !== id.toString());
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
// --Update Local Storage when mdoify task
const updateLs = function (newInput, id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[id - 1].description = newInput.trim();
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
/// EVENTS
// --Event to submit the new task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // take input value
  const newTaskInput = todoInput.value;
  addTaskToStorage(tasks, newTaskInput);
  JSON.parse(localStorage.getItem('task'));
  // clean input
  todoInput.value = '';
});

const getnewInput = function (input, id) {
  const newInput = input;
  input.addEventListener('keyup', () => {
    updateLs(newInput.value, id);
  });
};

const clickHandle = function (e) {
  if (e.target.classList.contains('task-text')) {
    const taskTargeted = e.target.parentElement.parentElement.parentElement;
    taskTargeted.querySelector('.fa-ellipsis-vertical').style.display = 'none';
    taskTargeted.querySelector('.fa-trash-can').style.display = 'flex';

    e.target.readOnly = false;
    const { id } = e.target;
    getnewInput(e.target, id);
  } else if (e.target.classList.contains('fa-trash-can')) {
    const { id } = e.target;
    removeItemfromLs(id);
    e.target.parentElement.parentElement.remove();
  }
};
// --Event to handle UI in task
listContainer.addEventListener('click', clickHandle);

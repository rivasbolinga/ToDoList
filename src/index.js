import './style.css';
import {
  clearfromLS,
  updateStatus,
} from './modules/ckbx.js';
import {
  updateLs,
  removeItemfromLs,
} from './modules/crud.js';

// -- Declare Global Variables --
const listContainer = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const form = document.querySelector('.todo-form');
const btnClear = document.querySelector('.btn-clear');
// -- Define local storage --
let tasks;
if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}
// -- Render tasks --
const displayTasks = function () {
  let newHtml = '';
  tasks.forEach((el) => {
    newHtml += `
    <div class="task-wrapper">
       <div class="description-container">
        <form class="completed-form">
          <input
          id="${el.index}"
           class="checkbox"
           type="checkbox">
          <input 
          id="${el.index}"
           type= "text"
           class="task-text"
           changetask
           value="${el.description}"
           readonly> 
        </form>
       </div>
       <div class="icons-task">
       <i class="fa-solid fa-ellipsis-vertical"></i>
       <i id="${el.index}" class="fa-solid fa-trash-can"></i>
       </div>
      
      </div>`;
  });
  listContainer.innerHTML = newHtml;
};

// LOCAL STORAGE
// --Add tasks to Local Storage --
const addTaskToStorage = function (arr, newTaskInput) {
  // create index
  let index;
  const len = tasks.length;
  if (len === 0 || len === null) {
    index = 0;
  } else {
    index = tasks[len - 1].index + 1;
  }
  // create object and push it to array and LS
  const newTask = { description: newTaskInput, status: false, index };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

/// EVENTS
// --Event to submit the new task --
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTaskInput = todoInput.value;
  if (newTaskInput === '' || newTaskInput === null) {
    alert('Start the day writing a task to do!');
  } else {
    addTaskToStorage(tasks, newTaskInput);
    todoInput.value = '';
    displayTasks();
  }
});
// -- Get new input from change tasks description --
const getnewInput = function (input, id) {
  const newInput = input;
  input.addEventListener('keyup', () => {
    updateLs(newInput.value, id);
  });
};
// -- Function to handle UI in the task cotianer --
const clickHandle = function (e) {
  if (e.target.classList.contains('task-text')) {
    // -- Modify task desciption --
    const taskTargeted = e.target.parentElement.parentElement.parentElement;
    taskTargeted.querySelector('.fa-ellipsis-vertical').style.display = 'none';
    taskTargeted.querySelector('.fa-trash-can').style.display = 'flex';
    e.target.readOnly = false;
    const { id } = e.target;
    getnewInput(e.target, id);
  } else if (e.target.classList.contains('fa-trash-can')) {
    // -- Delete task when press trash can --
    const { id } = e.target;
    removeItemfromLs(id);
    e.target.parentElement.parentElement.remove();
  } else if (e.target.classList.contains('checkbox')) {
    // -- Check completed --
    const { id } = e.target;
    const checkbox = e.target;
    const sibling = checkbox.closest('.task-wrapper').querySelector('.task-text');
    if (checkbox.checked) {
      sibling.classList.add('completed');
      updateStatus(id);
    } else {
      sibling.classList.remove('completed');
      updateStatus(id);
    }
  }
};
// --Event to handle UI in task --
listContainer.addEventListener('click', clickHandle);
window.addEventListener('load', displayTasks);
// -- Clear all the completed tasks --
btnClear.addEventListener('click', (e) => {
  clearfromLS();
  const button = e.target;
  const sibling = button.closest('.todo-container').querySelectorAll('.task-text');
  sibling.forEach((e) => {
    if (e.classList.contains('completed')) {
      e.parentElement.parentElement.parentElement.remove();
    }
  });
});

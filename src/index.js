import './style.css';

const listContainer = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const tasksStored = JSON.parse(localStorage.getItem('tasks'));
let tasks;

if(localStorage.getItem('tasks')=== null){
  tasks = []
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}
const displayTasks = function (storage) {
  // const arrsorted = tasks.sort((a, b) => a.index - b.index);
    const html = `
    <div class="task-wrapper">
    <form class="completed-form">
      <input
      class="checkbox"
      type="checkbox"
      >
    </form>
    <p class="task-text"> ${storage.description}</p>
  </div>`;
    listContainer.innerHTML += html;
  };

// document.addEventListener('DOMContentLoaded', displayTasks);

const form = document.querySelector('.todo-form');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const newTaskInput = todoInput.value;
  addTaskToStorage(tasks, newTaskInput);
  const storage = JSON.parse(localStorage.getItem('task'));
  //display task 
  
  //clean input 
  todoInput.value = "";
  
})



const addTaskToStorage = function(arr,newTaskInput) {
  //create index
  let index;
  const len = arr.length;
  if(len === 0 || len === null){
    index = 0
  } else {
    index = arr[len -1].index+1;
  }
  //create objext
  const newTask = {description:newTaskInput, status:false, index};
  tasks.push(newTask);
  localStorage.setItem('task', JSON.stringify(tasks));
  displayTasks(newTask);
}
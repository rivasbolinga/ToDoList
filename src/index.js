import './style.css';

const listContainer = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const tasksStored = JSON.parse(localStorage.getItem('tasks'));
let tasks;

if(localStorage.getItem('task')=== null){
  tasks = []
} else {
  tasks = JSON.parse(localStorage.getItem('tasks'))
}
// const displayTasks = function () {
//   // const arrsorted = tasks.sort((a, b) => a.index - b.index);
//   for (let i = 0; i < tasks.length; i += 1) {
//     const html = `
//     <div class="task-wrapper">
//     <form class="completed-form">
//       <input
//       class="checkbox"
//       type="checkbox"
//       >
//     </form>
//     <p class="task-text"> ${tasks[i].description}</p>
//   </div>`;
//     listContainer.innerHTML += html;
// //   }
// // };

// document.addEventListener('DOMContentLoaded', displayTasks);

const form = document.querySelector('.todo-form');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const newTaskInput = todoInput.value;
  addTaskToStorage(newTaskInput);
  //display task 
  //clean input 
  todoInput.value = "";
  JSON.parse(localStorage.getItem('task'));
})



const addTaskToStorage = function(newTaskInput) {
  //create index
  let index;
  const len = tasks.length;
  if(len === 0 || len === null){
    index = 0
  } else {
    index = len + 1;
  }
  //create objext
  const newTask = {description:newTaskInput, status:false, index};
  tasks.push(newTask);
  localStorage.setItem('task', JSON.stringify(tasks));
}
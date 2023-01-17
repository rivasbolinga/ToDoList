import { update } from 'lodash';
import './style.css';

const listContainer = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input');
const tasksStored = JSON.parse(localStorage.getItem('tasks'));
const taskContainer = document.querySelectorAll('.task-wrapper');
const taskText = document.querySelectorAll('.task-text');
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
     <div class="description-container">
      <form class="completed-form">
        <input
         class="checkbox"
         type="checkbox">
        <input 
         type= "text"
         class="task-text"
         changetask
         value="${storage.description}"
         readonly> 
      </form>
     </div>
     <div class="icons-task">
     <i class="fa-solid fa-ellipsis-vertical"></i>
     <i class="fa-solid fa-trash-can"></i>
     </div>
    
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


///LOCAL STORAGE

//--Add tasks to Local Storage
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
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks(newTask);
}
//--Remove task from Local Storage
const removeItem = function (id) {
  let arr = JSON.parse(localStorage.getItem('tasks'));
  arr = arr.filter((e) => e.index.toString() !== id.toString());
  for (let i = 0; i < arr.length; i += 1) {
    arr[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(arr));
}

//ForEach
listContainer.addEventListener('click', (e)=>{
if(e.target.classList.contains('task-wrapper')){
  const taskTargeted = e.target;
  taskTargeted.classList.add('modify');
  taskTargeted.querySelector('.fa-ellipsis-vertical').style.display = 'none';
  taskTargeted.querySelector('.fa-trash-can').style.display = 'flex';
  const modifyTask = taskTargeted.querySelector('.task-text');
  modifyTask.readOnly = false;
  modifyTaskF(modifyTask)
} else if(e.target.classList.contains('fa-trash-can')) {
  const { id } = e.target;
  removeItem(id)
  // tasks = tasks.filter((e) => JSON.stringify(e.id) !== id);
  // localStorage.setItem('task', JSON.stringify(tasks));
  e.target.parentElement.parentElement.remove();

}
})
  
// const updateStorage = function(value) {
//   const arr = JSON.parse(localStorage.getItem('tasks'));
//   arr[id - 1].description = value.trim();
//   localStorage.setItem('todos', JSON.stringify(arr));
// }

 const modifyTaskF = function(input) {

  const newInput = input;
  input.addEventListener('submit',(e)=> {
    e.preventDefault()
    updateItem()
  })
 }
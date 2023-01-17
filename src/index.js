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

listContainer.addEventListener('click', (e)=>{
  
  const taskTargeted = e.target;
  taskTargeted.classList.add('modify');
  taskTargeted.querySelector('.fa-ellipsis-vertical').style.display = 'none';
  taskTargeted.querySelector('.fa-trash-can').style.display = 'flex';
  if (e.target.tagName === 'INPUT') {
    e.target.readOnly = false;
  }
  
  // if(e.target.closest('task-text')){
  //   console.log('task text')
  //   taskText.readOnly = false;
  // }
  //change task
//   if(e.target.classList.contains('fa-ellipsis-vertical')) {
//     
//     e.target.readOnly = false;
//  }
  //not dots
  // yes bin
})
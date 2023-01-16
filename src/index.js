import './style.css';


const listContainer = document.querySelector('.todo-list');

const tasks = [
  {
    description: 'Clean house',
    completed: true,
    index: 0,
  },
  {
    description: 'Homework',
    completed: false,
    index: 1,
  },
  {
    description: 'Shopping',
    completed: true,
    index: 2,
  },
];
const displayTasks = function () {
  for (let i = 0; i < tasks.length; i += 1) {
    const html = `
    <div class="task-wrapper">
    <form class="completed-form">
      <input
      class="checkbox"
      type="checkbox"
      >
    </form>
    <p class="task-text"> ${tasks[i].description}</p>
  </div>`;
    listContainer.innerHTML += html;
  }
};

document.addEventListener('DOMContentLoaded', displayTasks);
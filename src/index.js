import './style.css';

const listContainer = document.querySelector('.todo-list');

const tasks = [
  {
    description: 'Clean house',
    completed: true,
    index: 3,
  },
  {
    description: 'Homework',
    completed: false,
    index: 1,
  },
  {
    description: 'Shopping',
    completed: true,
    index: 0,
  },
];
const displayTasks = function () {
  const arrsorted= tasks.sort((a, b) => a.index - b.index)
  for (let i = 0; i < arrsorted.length; i += 1) {
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
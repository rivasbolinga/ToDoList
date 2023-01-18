// -- Update Status Local Storage when checked complete --
const updateStatus = function (id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].index.toString() === id.toString()) {
      if (tasks[i].status === false) {
        tasks[i].status = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } else {
        tasks[i].status = false;
      }
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
};
// -- Clear all completed tasks from LS --
const clearfromLS = function () {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter((e) => e.status === false);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export {
  updateStatus,
  clearfromLS,
};
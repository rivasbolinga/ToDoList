// -- Remove task from Local Storage --
const removeItemfromLs = function (id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter((e) => e.index.toString() !== id.toString());
  tasks.sort((a, b) => a.index - b.index);
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// -- Update Local Storage when mdoify task description --
const updateLs = function (newInput, id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].index.toString() === id.toString()) {
      tasks[i].description = newInput;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export {
  updateLs,
  removeItemfromLs,
};
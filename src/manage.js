const addTask = (tasks, input) => {
  if (input.value.trim() === '') return;

  tasks.push({
    description: input.value,
    completed: false,
    index: tasks.length,
  });

  input.value = '';
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const updateTask = (tasks, task) => {
  tasks[task.index - 1] = task;

  document.querySelectorAll('li').forEach((elem) => elem.classList.remove('active'));

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTask = (tasks, index) => {
  tasks = tasks.filter((task) => task.index !== index);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export { addTask, updateTask, removeTask };

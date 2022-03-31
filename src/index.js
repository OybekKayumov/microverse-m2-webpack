import 'material-icons/iconfont/material-icons.css';
import './style.css';

import Tasks from './manager';
import renderTasks from './renderTasks';

// const listTasks = document.querySelector('.list-tasks');
const addBtn = document.querySelector('#add');
const input = document.querySelector('.input');
const clearAll = document.querySelector('.clear-all');

const tasks = new Tasks();

renderTasks(tasks);

const addTask = () => {
  tasks.add({
    description: input.value.trim(),
  });

  input.value = '';
  renderTasks(tasks);
};

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

clearAll.addEventListener('click', () => {
  tasks.completedClear();
  renderTasks(tasks);
});

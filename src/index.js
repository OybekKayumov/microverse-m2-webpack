import 'material-icons/iconfont/material-icons.css';
import './style.css';

import { addTask, updateTask, removeTask } from './manage';

const listTasks = document.querySelector('.list-tasks');
const addBtn = document.querySelector('#add');
const input = document.querySelector('.input');

let tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.setItem('tasks'))
  : [];

const renderTasks = () => {
  listTasks.innerHTML = '';

  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task) => {
      listTasks.innerHTML += `
          <li id="task-${task.index}">
            <div class="content">
              <input type="checkbox" class="check" ${task.completed ? 'checked' : ''} />
              <input type="text" class="input" value='${task.description}' readonly />            
            </div>
            <div class='actions'>
              <span class="drag material-icons">more_vert</span>
              <span class="delete material-icons">delete_outline</span>
            </div>
          </li>
      `;
    });
};

renderTasks();

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask(tasks, input);
    renderTasks();
  }
});

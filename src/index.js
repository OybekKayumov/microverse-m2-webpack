import 'material-icons/iconfont/material-icons.css';
import './style.css';

import { addTask, updateTask, removeTask } from './manage';

const listTasks = document.querySelector('.list-tasks');
const addBtn = document.querySelector('#add');
const input = document.querySelector('.input');

let tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
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
  
  document.querySelectorAll('li .input').forEach((inp) => {
    inp.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const id = Number(inp.parentNode.parentNode.id.split('-')[1]);
        const obj = tasks.find((task) => task.index === id);
        obj.description = inp.value.trim();
        updateTask(tasks, obj);
        inp.readOnly = true;
      }
    });
  });

  document.querySelectorAll('.delete').forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const id = Number(delBtn.parentNode.parentNode.id.split('-')[1]);

      removeTask(tasks, id);
      tasks = JSON.parse(localStorage.getItem('tasks'));
      delBtn.parentNode.parentNode.remove();
    });
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

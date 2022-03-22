import 'material-icons/iconfont/material-icons.css';
import './style.css';

const listTasks = document.querySelector('.list-tasks');

const tasks = [
  {
    index: 0,
    description: 'Task 1',
    completed: true,
  },
  {
    index: 3,
    description: 'Task 4',
    completed: false,
  },
  {
    index: 2,
    description: 'Task 3',
    completed: true,
  },
  {
    index: 1,
    description: 'Task 2',
    completed: false,
  },
];

const renderTasks = () => {
  listTasks.innerHTML = '';

  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task) => {
      listTasks.innerHTML += `
          <li>
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

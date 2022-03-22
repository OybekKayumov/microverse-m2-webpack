// import _ from 'lodash';
import 'material-icons/iconfont/material-icons.css';
import './style.css';

// function component() {
//   const element = document.createElement('div');

//   // Lodash, currently included via a script, is required for this line to work
//   // eslint-disable-next-line no-undef
//   // Lodash, now imported by this script
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//   element.classList.add('hello');

//   return element;
// }

// document.body.appendChild(component());

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

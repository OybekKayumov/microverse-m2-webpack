/** * @jest-environment jsdom */
import Tasks from './manager.js';
import LocalStorage from './local-storage-mock.js';
import renderTasks from './renderTasks.js';

document.body.innerHTML = `
  <main>
    <div class="head">
      <h2>Today's To Do</h2>
      <span class="material-icons">autorenew</span>
    </div>
    <div class="table">
      <form class="add-task">
        <input
          class="input"
          id="input"
          type="text"
          placeholder="Add to your list"
          required
        />
        <button type="submit" id="add">
          <span class="material-icons">keyboard_return</span>
        </button>
      </form>
      <ul class="list-tasks"></ul>
    </div>
    <div class="clear-all">Clear all completed</div>
  </main>
`;

global.localStorage = new LocalStorage();

const tasks = new Tasks();

it('works empty test', () => {
});

describe('test add', () => {
  it('add the first task', () => {
    tasks.add({ description: 'Task 1' });
    expect(tasks.list.length).toBe(1);
  });
  it('add and check task description', () => {
    tasks.add({ description: 'Task 2' });
    expect(tasks.list[1].description).toBe('Task 2');
  });
});

describe('test delete', () => {
  const delIndex = 1;

  it('test first element is deleted', () => {
    tasks.removeTask(delIndex);
    expect(tasks.list.length).toBe(1);
  });
});

describe('test edit task', () => {
  const tasks = new Tasks();
  tasks.add({ description: 'Task 1' });
  const currTask = tasks.list[0];
  currTask.description = 'description edited';
  tasks.edit(currTask);

  it('test list edited with new description', () => {
    expect(tasks.list[0].description).toBe('description edited');
  });
});

describe('test completed tasks', () => {
  const tasks = new Tasks();
  tasks.add({ description: 'new task' });
  const currTask = tasks.list[0];
  currTask.completed = true;
  tasks.edit(currTask);

  it('test task completed is true', () => {
    expect(tasks.list[0].completed).toBeTruthy();
  });
});

describe('test clear all completed', () => {
  const tasks = new Tasks();

  const firstTask = tasks.list[0];
  firstTask.completed = true;
  tasks.edit(firstTask);

  const secondTask = tasks.list[1];
  secondTask.completed = true;
  tasks.edit(secondTask);

  it('test the list is empty', () => {
    tasks.completedClear();
    expect(tasks.list.length).toBe(0);
  });
});

describe('test local storage', () => {
  const tasks = new Tasks();

  it('check localStorage is empty after clear', () => {
    localStorage.clear();
    expect(localStorage.getItem('tasks')).toBeNull();
  });

  it('check localStorage is not empty after adding', () => {
    tasks.add({ description: 'Task 1' });
    expect(localStorage.getItem('tasks')).not.toBeNull();
  });
});

describe('test DOM manipulation functions', () => {
  localStorage.clear();
  const tasks = new Tasks();

  it('see one li in the list after adding', () => {
    tasks.add({ description: 'Task 1' });
    renderTasks(tasks);

    expect(document.querySelectorAll('li').length).toBe(1);
  });

  it('task description change on the page after update', () => {
    const currTask = tasks.list[0];
    currTask.description = 'Task 2';
    tasks.edit(currTask);
    renderTasks(tasks);

    expect(document.querySelector('li .input').value).toBe('Task 2');
  });

  it('the complete true after click checkbox', () => {
    document.querySelector('li .check').click();

    expect(tasks.list[0].completed).toBeTruthy();
  });

  it('the li count should be one after remove the second task', () => {
    tasks.add({ description: 'last task' });
    renderTasks(tasks);

    document.querySelectorAll('li .delete')[1].click();

    expect(document.querySelectorAll('li').length).toBe(1);
  });

  it('because the only task left is complete, the list should be empty after clearing all completed', () => {
    tasks.completedClear();
    renderTasks(tasks);

    expect(document.querySelectorAll('li').length).toBe(0);
  });
});

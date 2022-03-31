import Tasks from './manager.js';
import LocalStorage from './local-storage-mock.js';

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

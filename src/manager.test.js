// import Tasks from './manager.js';
// import LocalStorage from './local-storage-mock.js';

const Tasks = require('./manager');
const LocalStorage = require('./local-storage-mock');

global.localStorage = new LocalStorage();

const tasks = new Tasks();

// test 1
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

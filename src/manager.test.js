// import Tasks from './manager.js';
// import LocalStorage from './local-storage-mock.js';

const Tasks = require('./manager');
const LocalStorage = require('./local-storage-mock');

global.localStorage = new LocalStorage();

const tasks = new Tasks();

// test 1
it('works empty test', () => {
});

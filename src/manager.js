export default class Tasks {
  constructor() {
    this.list = localStorage.getItem('tasks')
      ? JSON.parse(localStorage.getItem('tasks'))
      : [];
  }

  add(task) {
    task.index = this.list.length + 1;
    task.completed = false;
    this.list.push(task);

    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  delete(index) {
    this.list = this.list.filter((task) => task.index !== index);
    this.list = this.list.map((task) => {
      if (task.index > index) {
        task.index -= 1;
      }
      return task;
    });

    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  edit(task) {
    this.list[task.index - 1] = task;
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  sort(oldInd, newInd) {
    this.list[oldInd - 1].index = newInd;
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  completedClear() {
    this.list = this.list.sort((a, b) => a.index - b.index);
    this.list = this.list.map((task, i) => {
      task.index = i + 1;
      return task;
    });

    localStorage.setItem('tasks', JSON.stringify(this.list));
  }
}

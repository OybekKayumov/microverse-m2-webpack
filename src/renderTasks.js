const renderTasks = (tasks) => {
  const listTasks = document.querySelector('.list-tasks');
  listTasks.innerHTML = '';

  tasks.list
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

  const lists = document.querySelectorAll('li');
  lists.forEach((list) => {
    list.addEventListener('click', (e) => {
      const elem = e.target;
      if (elem.classList.contains('drag') || elem.classList.contains('check')) {
        return;
      }

      lists.forEach((elem) => elem.classList.remove('active'));

      list.classList.add('active');

      const inp = list.querySelector('.input');
      inp.readOnly = false;
      inp.focus();
      inp.setSelectionRange(inp.value.length, inp.value.length);
    });
  });

  document.querySelectorAll('li .input').forEach((inp) => {
    inp.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const id = Number(inp.parentNode.parentNode.id.split('-')[1]);
        const obj = tasks.list.find((task) => task.index === id);
        obj.description = inp.value.trim();
        tasks.edit(obj);
        inp.parentNode.parentNode.classList.remove('active');
        inp.readOnly = true;
      }
    });
  });

  document.querySelectorAll('li .check').forEach((inp) => {
    inp.addEventListener('change', () => {
      const id = Number(inp.parentNode.parentNode.id.split('-')[1]);
      const obj = tasks.list.find((task) => task.index === id);
      obj.completed = inp.checked;
      tasks.edit(obj);
    });
  });

  document.querySelectorAll('.delete').forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const id = Number(delBtn.parentNode.parentNode.id.split('-')[1]);

      tasks.removeTask(id);
      delBtn.parentNode.parentNode.remove();
    });
  });
};

export default renderTasks;
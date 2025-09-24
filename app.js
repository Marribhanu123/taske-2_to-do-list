// ---- DOM references ----
const taskInput = document.getElementById('taskInput');
const addBtn    = document.getElementById('addBtn');
const taskList  = document.getElementById('taskList');

// ---- state ----
let tasks = []; // simple in-memory array

// ---- event wiring ----
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});
// delegation: one listener for the whole <ul>
taskList.addEventListener('click', handleListClick);

// ---- functions ----
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, done: false });
  taskInput.value = '';
  render();
}

function handleListClick(e) {
  const id = Number(e.target.closest('li')?.dataset.id);
  if (!id) return;

  if (e.target.classList.contains('toggle')) {
    toggleTask(id);
  } else if (e.target.classList.contains('delete')) {
    deleteTask(id);
  }
}

function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function render() {
  taskList.innerHTML = tasks.map(t => `
    <li data-id="${t.id}" class="${t.done ? 'completed' : ''}">
      <span>${t.text}</span>
      <div>
        <button class="toggle">${t.done ? 'Undo' : 'Done'}</button>
        <button class="delete">Del</button>
      </div>
    </li>`).join('');
}
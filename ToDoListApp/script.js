const inputData = document.querySelector('input');
const button = document.querySelector('button');
const taskSection = document.querySelector('.taskSection');
const liSpan = document.querySelector('li span');

button.addEventListener('click', () => {
  if (inputData.value) {
    addTask(inputData.value);
    taskSection.style.display = 'block';
    inputData.value = '';
    inputData.placeholder = 'Add your task';
  } else {
    alert('Please enter a task');
  }

  saveTasks();
});

function addTask(task) {
  const taskList = document.querySelector('.taskList');
  const newTask = document.createElement('li');
  newTask.innerHTML = task;
  const span = document.createElement('span');
  span.innerHTML = '\u00d7';
  newTask.appendChild(span);
  taskList.appendChild(newTask);
}

//  Check if a list item is clicked
taskSection.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }

  if (event.target.tagName === 'SPAN') {
    event.target.parentElement.remove();
  }

  saveTasks();
});

function saveTasks() {
  const taskListUl = document.querySelector('.taskList');
  localStorage.setItem('taskList', taskListUl.innerHTML);
}

function loadTasks() {
  const taskListUl = document.querySelector('.taskList');
  taskListUl.innerHTML = localStorage.getItem('taskList');
  taskSection.style.display = taskListUl.innerHTML ? 'block' : 'none';
}

loadTasks();

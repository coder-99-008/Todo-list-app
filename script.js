const add_input = document.getElementById('todo-input');
const add_btn = document.getElementById('add-btn');
const todo_list = document.getElementById('todo-list');

window.addEventListener('load', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(taskText => addTask(taskText));
})

add_btn.addEventListener('click', () => {
    if (add_input.value === '') return;

    addTask(add_input.value);
    saveTask(add_input.value);
    add_input.value = '';
})

function addTask (value){
    let task = document.createElement('li');
    task.textContent = value;

    let del_btn = document.createElement('button');
    del_btn.className = 'delete-btn';
    del_btn.textContent = 'Delete';

    del_btn.addEventListener('click', e => {
        e.target.parentElement.remove();
        removeTask(value);
    })

    task.appendChild(del_btn);
    todo_list.appendChild(task);
}

function saveTask(taskText){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(t => t !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
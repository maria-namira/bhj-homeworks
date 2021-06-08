const form = document.getElementById('tasks__form'),
    input = document.getElementById('task__input'),
    tasksList = document.getElementById('tasks__list');
let localArr = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value !== '') {
        addTask(input.value);
        input.value = '';
    } else {
        alert('Введите название задачи!');
    }
});

// вывод значений из localStorage
if (localStorage.length > 0) {
    localArr = JSON.parse(localStorage.getItem('tasks'));
    for (item of localArr) {
        addTask(item, false);
    }
}

function addTask(taskText, inputLocal = true) {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `<div class="task__title">${taskText}</div>`;

    // сохранение значений в localStorage
    if (inputLocal) {
        localArr.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(localArr));
    }

    // крестик для удаления
    const taskRemove = document.createElement('a');
    taskRemove.href = '#';
    taskRemove.className = 'task__remove';
    taskRemove.innerHTML = '&times;';
    taskRemove.addEventListener('click', () => {
        task.remove();

        // пересобираем оставшиеся tasks для localStorage
        localArr = Array.from(document.querySelectorAll('.task__title'), item => item.innerText);
        localStorage.setItem('tasks', JSON.stringify(localArr));
    });
    task.appendChild(taskRemove);

    tasksList.appendChild(task);
}
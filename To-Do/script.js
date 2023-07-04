// JavaScript code
const form = document.querySelector('form');
const input = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    const todoText = input.value.trim();

    if (todoText !== '') {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        todoItem.appendChild(checkbox);

        const todoTextElement = document.createElement('span');
        todoTextElement.innerText = todoText;
        todoItem.appendChild(todoTextElement);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.classList.add('edit-btn');
        todoItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-btn');
        todoItem.appendChild(deleteButton);

        const timestampElement = document.createElement('span');
        timestampElement.classList.add('timestamp');
        timestampElement.innerText = getTimestamp();
        todoItem.appendChild(timestampElement);

        todoList.appendChild(todoItem);

        input.value = ''; // Clear input field
    }
});

filterOption.addEventListener('change', function () {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (filterOption.value) {
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'incomplete':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            default:
                todo.style.display = 'flex';
                break;
        }
    });
});

todoList.addEventListener('click', function (e) {
    const item = e.target;

    if (item.tagName === 'INPUT') {
        const todoItem = item.parentElement;
        todoItem.classList.toggle('completed');
        updateTimestamp(todoItem);
    } else if (item.classList.contains('edit-btn')) {
        const todoItem = item.parentElement;
        const todoTextElement = todoItem.querySelector('span');
        const currentText = todoTextElement.innerText;

        const updatedText = prompt('Enter updated text:', currentText);
        if (updatedText !== null && updatedText.trim() !== '') {
            todoTextElement.innerText = updatedText.trim();
            updateTimestamp(todoItem);
        }
    } else if (item.classList.contains('delete-btn')) {
        const todoItem = item.parentElement;
        todoList.removeChild(todoItem);
    }
});

function getTimestamp() {
    const date = new Date();
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleString('en-US', options);
}

function updateTimestamp(todoItem) {
    const timestampElement = todoItem.querySelector('.timestamp');
    timestampElement.innerText = getTimestamp();
}
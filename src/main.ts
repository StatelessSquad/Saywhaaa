import { TodoList } from './model/todoModel';

const todoList = new TodoList();

function render() {
  const app = document.getElementById('app')!;
  const todos = todoList.getTodos();

  app.innerHTML = `
    <h1>Saywhaaa Todo List</h1>
    <form id="todo-form">
      <input
        type="text"
        id="todo-input"
        placeholder="What needs to be done?"
        autocomplete="off"
      />
      <button type="submit">Add</button>
    </form>
    <ul id="todo-list" class="todo-list">
      ${todos
        .map(
          (todo) => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
          <input
            type="checkbox"
            ${todo.completed ? 'checked' : ''}
          />
          <span class="todo-text">${todo.text}</span>
          <button>Delete</button>
        </li>
      `
        )
        .join('')}
    </ul>
  `;

  // Attach event listeners using event delegation
  const form = document.getElementById('todo-form') as HTMLFormElement;
  const input = document.getElementById('todo-input') as HTMLInputElement;
  const todoListEl = document.getElementById('todo-list') as HTMLUListElement;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    if (text) {
      todoList.addTodo(text);
      input.value = '';
      render();
    }
  });

  todoListEl.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const li = target.closest('.todo-item');
    if (!li) return;
    const id = Number(li.dataset.id);
    if (target.matches('input[type="checkbox"]')) {
      todoList.toggleTodo(id);
      render();
    } else if (target.matches('button')) {
      todoList.deleteTodo(id);
      render();
    }
  });
}

// Initialize the app when the DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', render);
} else {
  render();
}

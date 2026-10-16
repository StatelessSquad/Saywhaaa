type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export class TodoList {
  private todos: Todo[] = [];
  private nextId = 1;
  private readonly storageKey: string;

  constructor(storageKey: string = 'saywhaaa-todos') {
    this.storageKey = storageKey;
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.todos = parsed.todos;
        this.nextId = parsed.nextId;
      } catch (e) {
        console.error('Failed to parse todo storage', e);
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        todos: this.todos,
        nextId: this.nextId,
      })
    );
  }

  addTodo(text: string) {
    const trimmed = text.trim();
    if (trimmed) {
      this.todos.push({
        id: this.nextId++,
        text: trimmed,
        completed: false,
      });
      this.saveToStorage();
    }
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveToStorage();
  }

  getTodos(): Todo[] {
    return [...this.todos];
  }
}

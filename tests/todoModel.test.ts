import { TodoList } from '../src/model/todoModel'

describe('TodoList', () => {
  let todoList: TodoList
  const testStorageKey = 'test-todos'

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    todoList = new TodoList(testStorageKey)
  })

  it('should start with an empty list', () => {
    expect(todoList.getTodos()).toHaveLength(0)
  })

  it('should add a todo', () => {
    todoList.addTodo('Test todo')
    const todos = todoList.getTodos()
    expect(todos).toHaveLength(1)
    expect(todos[0].text).toBe('Test todo')
    expect(todos[0].completed).toBe(false)
  })

  it('should toggle a todo', () => {
    todoList.addTodo('Test todo')
    todoList.toggleTodo(1)
    const todos = todoList.getTodos()
    expect(todos[0].completed).toBe(true)
    todoList.toggleTodo(1)
    expect(todos[0].completed).toBe(false)
  })

  it('should delete a todo', () => {
    todoList.addTodo('Test todo 1')
    todoList.addTodo('Test todo 2')
    todoList.deleteTodo(1)
    const todos = todoList.getTodos()
    expect(todos).toHaveLength(1)
    expect(todos[0].text).toBe('Test todo 2')
  })

  it('should persist to localStorage', () => {
    todoList.addTodo('Persistent todo')
    // Create a new instance with the same storage key
    const todoList2 = new TodoList(testStorageKey)
    expect(todoList2.getTodos()).toHaveLength(1)
    expect(todoList2.getTodos()[0].text).toBe('Persistent todo')
  })
})

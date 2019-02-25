import uuidv4 from 'uuid/v4'
import {renderTodos} from './views'

// Setup the empty todos array
let todos = []

// loadTodos
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try{
        todos = todosJSON ? JSON.parse(todosJSON) : []
        
    }
    catch(e){
        todos = []
    }
}

// saveTodos
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
const getTodos = () => todos

// createTodo
const createTodo = (text) => {
    if (text.length > 0){
        let newItem = {
            id: uuidv4(),
            text: text,
            complete: false
        }
        todos.push(newItem)
        saveTodos()
        renderTodos()
        
    }
}

// removeTodo
const removeTodo =  (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    saveTodos()
}

// toggleTodo
const toggleTodo =  (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
        todo.complete = !todo.complete
    }
    saveTodos()
}


loadTodos()
export{loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo}

// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import {renderTodos} from './views'
import {createTodo} from './todos'
import {setFilters} from './filters'
// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

// Set up form submission handler
document.querySelector('#add').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.getItem.value.trim()
    createTodo(text)
    e.target.getItem.value = ''
})

// Bonus: Add a watcher for local storage
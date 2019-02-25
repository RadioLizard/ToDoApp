import {getTodos, toggleTodo, removeTodo, saveTodos, loadTodos} from './todos'
import {getFilters} from './filters'

// renderTodos
const renderTodos =  () => {
    const todos = getTodos()
    const filters = getFilters()
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.complete
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.complete)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDom(incompleteTodos))

    if(filteredTodos.length > 0){
    filteredTodos.forEach( (todo) => {
        document.querySelector('#todos').appendChild(generateTodoDom(todo))
    })
} else{
    const messageEl = document.createElement('p')
    messageEl.classList.add('empty-message')
    messageEl.textContent = 'You have nothing left to do today. Why not add something?'
    document.querySelector('#todos').appendChild(messageEl)
    }
    saveTodos()
}

// generateTodoDom
const generateTodoDom =  (todo) => {
    const todoLabel= document.createElement('label')
    const todoContainer = document.createElement("div")
    const todoCheck = document.createElement('input')
    const todoContent = document.createElement('span')
    const todoDelButton = document.createElement('button')

    todoCheck.setAttribute('type', 'checkbox')
    todoCheck.checked = todo.complete
    todoContainer.appendChild(todoCheck)
    todoCheck.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })

    todoContent.textContent = todo.text
    todoContainer.appendChild(todoContent)

       //setup container
       todoLabel.classList.add("list-item")
       todoContainer.classList.add("list-item__container")
       todoLabel.appendChild(todoContainer)

    todoDelButton.textContent = 'Remove'
    todoDelButton.classList.add('button', 'button--text')
    todoLabel.appendChild(todoDelButton)

    todoDelButton.addEventListener('click',  (e) => {
        removeTodo(todo.id)
        renderTodos() 
    })

 
    return todoLabel
}


// generateSummaryDOM
const generateSummaryDom = (incompleteTodos) => {
    let statusReport = document.createElement('h3')
    statusReport.classList.add("list-title")
    if(incompleteTodos.length === 1){
        statusReport.textContent = `You have 1 thing left to do today.`
    }else{
        statusReport.textContent = `(You have ${incompleteTodos.length} things left to do today.)`}
    
    return statusReport
}

export {renderTodos, generateTodoDom, generateSummaryDom}
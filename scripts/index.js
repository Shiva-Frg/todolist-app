const todo = checkData()
const searchTodo = {
    undo: false
}

renderTodo(todo, searchTodo)

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
    todo.push({
        id: uuidv4(),
        title: e.target.elements.todoTitle.value,
        doWork: false
    })

    saveTodo(todo)
    renderTodo(todo, searchTodo)

    e.target.elements.todoTitle.value = ''
})

document.querySelector('#undone').addEventListener('change', (e) => {
    searchTodo.undo = e.target.checked
    renderTodo(todo, searchTodo)
})
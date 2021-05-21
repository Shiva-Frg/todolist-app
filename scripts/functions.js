const checkData = () => {
  const todoJson = localStorage.getItem('todo')
  try {
    return todoJson !== null ? JSON.parse(todoJson) : []
  } catch (error) {
    return []
  }
}

const saveTodo = (todo) => {
  localStorage.setItem('todo', JSON.stringify(todo))
}

const toggleDo = (id) => {
  const todoFind = todo.find((item) => {
    return item.id === id
  })
  if (todoFind !== undefined) {
    todoFind.doWork = !todoFind.doWork
  }
}

const todoRemove = (id) => {
  const todoIndex = todo.findIndex((item) => {
    return item.id === id
  })
  if (todoIndex > -1) {
    todo.splice(todoIndex, 1)
  }
}

const renderTodo = (todo, searchTodo) => {
  const filtering = todo.filter((item) => {
    if (searchTodo.undo) {
      return item.doWork === false
    } else {
      return true
    }
  })

  document.querySelector('#todoList').innerHTML = ''

  filtering.forEach((item) => {
    document.querySelector('#todoList').appendChild(todoDiv(item))
  })
}

const todoDiv = (todoItem) => {
  const todoEl = document.createElement('div')
  const todoCheck = document.createElement('input')
  const todoTitle = document.createElement('span')
  const removeTodo = document.createElement('button')

  todoEl.className = 'todo-container'

  todoCheck.setAttribute('type', 'checkbox')
  todoCheck.checked = todoItem.doWork
  todoEl.appendChild(todoCheck)
  todoCheck.addEventListener('change', () => {
    toggleDo(todoItem.id)
    saveTodo(todo)
    renderTodo(todo, searchTodo)
  })

  todoTitle.textContent = todoItem.title
  todoEl.appendChild(todoTitle)

  removeTodo.textContent = 'remove'
  removeTodo.className = 'todo-button'
  todoEl.appendChild(removeTodo)
  removeTodo.addEventListener('click', () => {
    todoRemove(todoItem.id)
    saveTodo(todo)
    renderTodo(todo, searchTodo)
  })

  return todoEl
}

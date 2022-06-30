console.log("Hello World")

const inputTodo = document.getElementsByClassName('inputTodo')[0];
const addBtn = document.getElementsByClassName('addBtn')[0];
const todoList = document.getElementsByClassName('todoList')[0];

// TODO追加処理
const addTodos = (todo) => {
  if(todo){
    console.log(todo)
    const listElement = document.createElement('li');
    const listItem = todoList.appendChild(listElement);
    listItem.innerHTML = todo;

    const doneBtn = document.createElement('span');
    doneBtn.className = 'doneBtn';
    doneBtn.innerHTML = 'Done';
    listElement.appendChild(doneBtn)

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerHTML = 'Delete';
    listElement.appendChild(deleteBtn)
  }
};
addBtn.addEventListener('click', e => {
  e.preventDefault();
  const todo = inputTodo.value;
  addTodos(todo);
  inputTodo.value = '';
});

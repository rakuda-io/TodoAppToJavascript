console.log("Hello World")

const inputTodo = document.getElementsByClassName('inputTodo')[0];
const addBtn = document.getElementsByClassName('addBtn')[0];
const todoList = document.getElementsByClassName('todoList')[0];
const totalCount = document.getElementsByClassName('totalCount')[0];
const doneCount = document.getElementsByClassName('doneCount')[0];

// TODO追加
addBtn.addEventListener('click', e => {
  e.preventDefault();
  let todo = inputTodo.value;
  addTodo(todo);
  inputTodo.value = '';
});

const addTodo = (todo) => {
  if(todo){
    let listElement = document.createElement('li');
    let listItem = todoList.appendChild(listElement);
    listItem.innerHTML = todo;
    let ul = listElement.parentNode;
    totalCount.innerHTML = ul.childElementCount;
    console.log(`[Add] ${todo}`);

    const doneBtn = document.createElement('span');
    doneBtn.className = 'doneBtn';
    doneBtn.innerHTML = 'Done';
    listElement.appendChild(doneBtn);

    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.innerHTML = 'Delete';
    listElement.appendChild(deleteBtn);

    // TODO完了
    doneBtn.addEventListener('click', e => {
      e.preventDefault();
      let list = e.target.parentNode;
      list.classList.toggle('finished');
      doneCount.innerHTML = document.getElementsByClassName('finished').length;
    });

    // TODO削除
    deleteBtn.addEventListener('click', e => {
      e.preventDefault();
      deleteTodo(deleteBtn);
      ul = document.getElementsByClassName('todoList')[0];
      totalCount.innerHTML = ul.childElementCount;
      doneCount.innerHTML = document.getElementsByClassName('finished').length;
      console.log(`[Delete] ${todo}`);
    });
    const deleteTodo = (deleteBtn) => {
      let selected = deleteBtn.closest('li');
      todoList.removeChild(selected);
    };
  };
};


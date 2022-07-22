console.log("Hello World");

const inputTodo = document.getElementsByClassName('inputTodo')[0];
const addBtn = document.getElementsByClassName('addBtn')[0];
const todoList = document.getElementsByClassName('todoList')[0];
const totalCount = document.getElementsByClassName('totalCount')[0];
const doneCount = document.getElementsByClassName('doneCount')[0];
let data = [];
let id = 0;

// ページ読み込み時の処理
window.addEventListener('DOMContentLoaded', e => {
  e.preventDefault();
  data.forEach(todo => {
    displayTodo(todo.title);
  });
});

// TODOのリスト表示する関数
const displayTodo = (todo) => {
  // DOM生成
  let listElement = document.createElement('li');
  let listItem = todoList.appendChild(listElement);
  listItem.innerHTML = todo;
  let ul = listElement.parentNode;
  totalCount.innerHTML = ul.childElementCount;

  const doneBtn = document.createElement('span');
  doneBtn.className = 'doneBtn';
  doneBtn.innerHTML = 'Done';
  listElement.appendChild(doneBtn);

  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.setAttribute('id', `${id}`);
  id += 1;
  listElement.appendChild(deleteBtn);

  // DoneBtnを監視
  doneBtn.addEventListener('click', e => {
    e.preventDefault();
    let list = e.target.parentNode;
    list.classList.toggle('finished');
    // カウント数を更新
    doneCount.innerHTML = document.getElementsByClassName('finished').length;
  });

  // DeleteBtnを監視
  deleteBtn.addEventListener('click', e => {
    e.preventDefault();
    deleteTodo(deleteBtn);
    // カウント数を更新
    ul = document.getElementsByClassName('todoList')[0];
    totalCount.innerHTML = ul.childElementCount;
    doneCount.innerHTML = document.getElementsByClassName('finished').length;
  });

  // TODOを削除する関数
  const deleteTodo = (deleteBtn) => {
    // data配列から削除
    data = data.filter(i => i.id.toString() !== deleteBtn.getAttribute('id'));
    console.log(`[Deleted] ${todo}`);
    console.log(data);
    // DOMを削除
    let deletedTodo = deleteBtn.closest('li');
    todoList.removeChild(deletedTodo);
  };
};

// TODO追加
addBtn.addEventListener('click', e => {
  e.preventDefault();
  let input = inputTodo.value;
  if(input && !(data.some(d => d.title === input))){
    addTodo(input);
    displayTodo(data.slice(-1)[0].title);
  } else {
    console.log('[error] 同じ名前は登録出来ません')
  }
  inputTodo.value = '';
});

// TODOを追加する関数
const addTodo = (todo) => {
  data.push({id: id, title: todo});
  console.log(data);
};

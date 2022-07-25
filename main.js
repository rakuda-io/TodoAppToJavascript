const inputArea = document.getElementsByClassName('inputArea')[0];
const submitBtn = document.getElementsByClassName('submitBtn')[0];
const todoList = document.getElementsByClassName('todoList')[0];
const totalCount = document.getElementsByClassName('totalCount')[0];
const doneCount = document.getElementsByClassName('doneCount')[0];

// ローカルストレージ
let storage = {};
let id = 0;
storage.key = 'todoList';
// 追加
storage.add = function (item) {
  let todo = this.get();
  todo.push(item);
  localStorage.setItem(this.key, JSON.stringify(todo));
};
// 取得
storage.get = function() {
  let todos = localStorage.getItem(this.key);
  if (todos == null) {
    return [];
  } else {
    return JSON.parse(todos);
  };
};
// dataオブジェクトを作成
let data = storage.get();
// storage上の最後のdataの次のIDをセット
if(data.length > 0) {
  id = data.slice(-1)[0].id + 1;
};

// 初回読み込み時の処理
window.addEventListener('DOMContentLoaded', event => {
  event.preventDefault();
  orderByStatus();
  data.forEach(todo => {
    displayTodo(todo.title);
  });
  console.log("Hello World");
});

// TODOのリストのDOM生成
const displayTodo = (todo) => {
  // data配列から該当データを取得
  let matchedData = data.find(v => v.title == todo);

  // DOM生成
  let listElement = document.createElement('li');
  let listItem = todoList.appendChild(listElement);
  listItem.innerHTML = todo;

  const doneBtn = document.createElement('span');
  doneBtn.className = 'doneBtn';
  doneBtn.innerHTML = 'Done';
  doneBtn.setAttribute('id', `${matchedData.id}`);
  listElement.className = matchedData.status;
  listElement.appendChild(doneBtn);

  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.setAttribute('id', `${matchedData.id}`);
  listElement.appendChild(deleteBtn);

  addFuction(submitBtn);
  doneFuction(doneBtn);
  deleteFunction(deleteBtn);
  updateCounter();
};

// TODO追加機能
const addFuction = (submitBtn) => {
  // submitBtnを監視
  submitBtn.addEventListener('click', event => {
    event.preventDefault();
    let inputValue = inputArea.value;
    // バリデーション
    if(inputValue && !(data.some(v => v.title === inputValue))){
      // ストレージに新しいTODOを追加して再描画
      storage.add({id: id, title: inputValue, status: 'wip'});
      id += 1;
      data = storage.get();
      orderByStatus();
      rebuildTodoList();
      console.log(`[Added] ${inputValue}`);
      console.log(data);
    } else {
      console.log('[Error] 同じ名前は登録出来ません')
    }
    // 入力欄をリセット
    inputArea.value = '';
  });
};

// TODO完了機能
const doneFuction = (doneBtn) => {
  // DoneBtnを監視
  doneBtn.addEventListener('click', event => {
    event.preventDefault();
    let list = event.target.parentNode;
    // liタグのクラスを切り替え
    list.classList.toggle('done');
    list.classList.toggle('wip');
    // ローカルストレージのステータスも切り替え
    toggleStatus(doneBtn);
    // 並べ替えを適用して再描画
    rebuildTodoList();
    updateCounter();
    console.log(data);
  });
};

// TODO削除機能
const deleteFunction = (deleteBtn) => {
  // DeleteBtnを監視
  deleteBtn.addEventListener('click', event => {
    event.preventDefault();
    deleteTodo(deleteBtn);
    updateCounter();
    console.log(data);
  });

};

// TODOリストのDOMを再構築する関数
const rebuildTodoList = () => {
  // DOMを初期化
  while( todoList.firstChild ){
    todoList.removeChild( todoList.firstChild );
  };
  orderByStatus();
  data.forEach(todo => {
    displayTodo(todo.title);
  });
};

// Statusで並べ替えする関数
const orderByStatus = () => { 
  data.sort((a,b) => a.id - b.id && a.status.length-b.status.length);
};

// カウント数を更新する関数
const updateCounter = () => {
  totalCount.innerHTML = data.length;
  doneCount.innerHTML = data.filter(value => value.status == 'done').length;
};

// TODOの完了ステータスを切り替える関数
const toggleStatus = (doneBtn) => {
  data = storage.get() 
  let matchedData = data.find(v => v.id == doneBtn.getAttribute('id'));
  if(matchedData.status == 'wip') {
    matchedData.status = 'done';
    console.log(`[Changed to DONE] ${matchedData.title}`);
  } else {
    matchedData.status = 'wip';
    console.log(`[Changed to WIP] ${matchedData.title}`);
  }
  localStorage.setItem('todoList', JSON.stringify(data));
  data = storage.get();
};

// TODOを削除する関数
const deleteTodo = (deleteBtn) => {
  data = storage.get() 
  console.log(`[Deleted] ${(data.find(v => v.id == deleteBtn.getAttribute('id'))).title}`);
  // DOMを削除
  let deleteDom = deleteBtn.closest('li');
  todoList.removeChild(deleteDom);
  // data配列から削除
  data = data.filter(v => v.id.toString() !== deleteBtn.getAttribute('id'));
  localStorage.setItem('todoList', JSON.stringify(data));
  data = storage.get() 
};


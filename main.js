const inputArea = document.getElementsByClassName('inputArea')[0];
const submitBtn = document.getElementsByClassName('submitBtn')[0];
const todoList = document.getElementsByClassName('todoList')[0];
const totalCount = document.getElementsByClassName('totalCount')[0];
const doneCount = document.getElementsByClassName('doneCount')[0];
let data = [{id: 0, title: 'Javascriptの勉強', status: 'wip'}, {id: 1, title: '子供の寝かしつけ', status: 'done'}];
let id = 2;

// ページ読み込み時の処理
window.addEventListener('DOMContentLoaded', event => {
  event.preventDefault();
  data.forEach(todo => {
    buildTodo(todo.title);
  });
  console.log("Hello World");
});

// TODOのリスト表示
const buildTodo = (todo) => {
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

  doneFuction(doneBtn);
  deleteFunction(deleteBtn);
  updateCounter();
};

// TODO追加機能
submitBtn.addEventListener('click', event => {
  event.preventDefault();
  let inputValue = inputArea.value;
  // バリデーション
  if(inputValue && !(data.some(v => v.title === inputValue))){
    // data配列に追加
    addData(inputValue);
    orderByStatus();
    rebuildTodoList();
  } else {
    console.log('[Error] 同じ名前は登録出来ません')
  }
  // 入力欄を空に
  inputArea.value = '';
});

// TODO完了機能
const doneFuction = (doneBtn) => {
  // DoneBtnを監視
  doneBtn.addEventListener('click', event => {
    event.preventDefault();
    let list = e.target.parentNode;
    list.classList.toggle('done');
    list.classList.toggle('wip');
    toggleStatus(doneBtn);
  });

  // ステータスを切り替え
  const toggleStatus = (doneBtn) => {
    let matchedData = data.find(v => v.id == doneBtn.getAttribute('id'));

    if(doneBtn.parentNode.className == 'done') {
      matchedData.status = 'done';
      console.log(`[Changed to DONE] ${matchedData.title}`);
    } else {
      matchedData.status = 'wip';
      console.log(`[Changed to WIP] ${matchedData.title}`);
    };

    // Statusに応じて並べ替えしてリストを再描画
    orderByStatus();
    rebuildTodoList();
    updateCounter();
    console.log(data);
  };
};

// TODO削除機能
const deleteFunction = (deleteBtn) => {
  // DeleteBtnを監視
  deleteBtn.addEventListener('click', event => {
    event.preventDefault();
    deleteTodo(deleteBtn);
    updateCounter();
  });

  // TODOを削除する関数
  const deleteTodo = (deleteBtn) => {
    console.log(`[Deleted] ${(data.find(v => v.id == deleteBtn.getAttribute('id'))).title}`);
    // DOMを削除
    let deleteDom = deleteBtn.closest('li');
    todoList.removeChild(deleteDom);
    // data配列から削除
    data = data.filter(v => v.id.toString() !== deleteBtn.getAttribute('id'));
    console.log(data);
  };
};

// dataに新しいTODOを追加する関数
const addData = (inputValue) => {
  data.push({id: id, title: inputValue, status: 'wip'});
  id += 1;
  console.log(`[Added] ${inputValue}`);
  console.log(data);
};

// TODOリストのDOMを再構築する関数
const rebuildTodoList = () => {
  // リストを初期化
  while( todoList.firstChild ){
    todoList.removeChild( todoList.firstChild );
  };
  // リストを再描画
  data.forEach(todo => {
    buildTodo(todo.title);
  });
};

// Statusで並べ替えする関数
const orderByStatus = () => {
  data.sort((a,b) => a.id - b.id);
  data.sort((a,b) => a.status.length-b.status.length);
};

// カウント数を更新する関数
const updateCounter = () => {
  totalCount.innerHTML = data.length;
  doneCount.innerHTML = data.filter(value => value.status == 'done').length;
};

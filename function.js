// 要素を取得
const inputArea = document.getElementsByClassName('inputArea')[0];
const submitBtn = document.getElementsByClassName('submitBtn')[0];
const todoList = document.getElementsByClassName('todoList')[0];
const totalCount = document.getElementsByClassName('totalCount')[0];
const doneCount = document.getElementsByClassName('doneCount')[0];

// TODO追加機能
const addFuction = (submitBtn) => {
  // submitBtnクリックで発火
  submitBtn.addEventListener('click', event => {
    event.preventDefault();
    let inputValue = inputArea.value;

    // バリデーション
    if(inputValue && !(data.some(v => v.title === inputValue))) {
      // TODOを追加
      storage.add({id: id, title: inputValue, status: 'wip'});

      // 並べ替えして再描画
      orderByStatus();
      rebuildTodoList();

      console.log(`[Added] ${inputValue}`);
      console.log(data);
    } else {
      console.log('[Error] 同じ名前は登録出来ません');
    };

    // 入力欄をリセット
    inputArea.value = '';
  });
};

// TODO完了機能
const doneFuction = (doneBtn) => {
  // DoneBtnクリックで発火
  doneBtn.addEventListener('click', event => {
    event.preventDefault();

    // 親のliタグを取得
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
  // DeleteBtnクリックで発火
  deleteBtn.addEventListener('click', event => {
    event.preventDefault();

    deleteTodo(deleteBtn);
    updateCounter();
    console.log(data);
  });
};


/***** 関数 *****/

// TODOリストDOMの再構築関数
const rebuildTodoList = () => {
  // DOMを初期化
  while(todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  };

  // 並べ替えを適用したDOMの再構築
  orderByStatus();
  data.forEach(todo => {
    displayTodo(todo.title);
  });
};

// カウント更新関数
const updateCounter = () => {
  totalCount.innerHTML = data.length;
  doneCount.innerHTML = data.filter(value => value.status == 'done').length;
};

// ソート関数
const orderByStatus = () => {
  data.sort((a,b) => a.id - b.id);
  data.sort((a,b) => a.status.length-b.status.length);
};

// TODO完了切り替え関数
const toggleStatus = (doneBtn) => {
  // 該当データを取得
  let matchedData = data.find(v => v.id == doneBtn.getAttribute('id'));

  if(matchedData.status == 'wip') {
    matchedData.status = 'done';
    console.log(`[Changed to DONE] ${matchedData.title}`);
  } else {
    matchedData.status = 'wip';
    console.log(`[Changed to WIP] ${matchedData.title}`);
  };
  localStorage.setItem('todoList', JSON.stringify(data));
};

// TODO削除関数
const deleteTodo = (deleteBtn) => {
  data = storage.get();
  console.log(`[Deleted] ${(data.find(v => v.id == deleteBtn.getAttribute('id'))).title}`);

  // DOMを削除
  let deleteDom = deleteBtn.closest('li');
  todoList.removeChild(deleteDom);

  // ローカルストレージから削除
  data = data.filter(v => v.id.toString() !== deleteBtn.getAttribute('id'));
  localStorage.setItem('todoList', JSON.stringify(data));
};

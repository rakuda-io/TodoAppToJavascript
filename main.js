// 初回読み込み時の処理
window.addEventListener('DOMContentLoaded', event => {
  event.preventDefault();

  // ローカルストレージからデータを取得して表示
  orderByStatus();
  data.forEach(todo => {
    displayTodo(todo.title);
  });

  console.log(data);
  console.log("Hello World");

  // TODO追加機能の呼び出し
  addFuction(submitBtn);
});

// TODOリストのDOM生成
const displayTodo = (todo) => {
  // dataオブジェクトからTODOを取得
  let matchedData = data.find(v => v.title == todo);

  // liタグ生成
  let listElement = document.createElement('li');
  let listItem = todoList.appendChild(listElement);
  listItem.innerHTML = todo;

  // Doneボタン生成
  const doneBtn = document.createElement('span');
  doneBtn.className = 'doneBtn';
  doneBtn.innerHTML = 'Done';
  doneBtn.setAttribute('id', `${matchedData.id}`);
  listElement.className = matchedData.status;
  listElement.appendChild(doneBtn);

  // Deleteボタン生成
  const deleteBtn = document.createElement('span');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.setAttribute('id', `${matchedData.id}`);
  listElement.appendChild(deleteBtn);

  // 各機能の呼び出し
  doneFuction(doneBtn);
  deleteFunction(deleteBtn);
  updateCounter();
};

let storage = {};
storage.key = 'todoList';

// ローカルストレージに追加する関数
storage.add = function(todo) {
  let list = this.get();
  list.push(todo);
  localStorage.setItem(this.key, JSON.stringify(list));
  id += 1;
  // 最新データにdataオブジェクトを更新
  data = storage.get();
};

// ローカルストレージを取得する関数
storage.get = function() {
  let list = localStorage.getItem(this.key);
  if (list == null) {
    return [];
  } else {
    return JSON.parse(list);
  };
};

// ローカルストレージからオブジェクトを作成
let data = storage.get();

// IDの初期値
let id = 0;
// 既にデータがあったら最後のデータの次のIDをセット
if(data.length > 0) {
  id = data.slice(-1)[0].id + 1;
};

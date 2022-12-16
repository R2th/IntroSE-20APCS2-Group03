Bài này mình xin được viết vài đoạn code nho nhỏ về xài Firebase với Redux Saga. Món này chả có gì đặc biệt cả chỉ là do trước mình làm cái chatApp với firebase + reduxThunk thì đơn giản tà tà. Nhưng khi làm với Redux-Saga thì có vài điểm nó không support dễ dàng như Thunk

Đầu tiên là config các thứ liên quan đến connect firebase
Install FIrebase
```
npm i firebase
```

```
import * as firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

export { firebase };

```

Các thông tin liên qua đến conenect thì bạn hãy lấy trong phần Web Steup của firebase nhé [firebaseConsoleLink](https://console.firebase.google.com/)
Phần tạo project trên firebase thì anh em tự xem nhé. Mình ko note trong bài này

Tiếp theo là apply Redux-Saga Effect vào để gọi các API CRUD bình thường của em firebase như thế nào.
Chúng ta sẽ dùng các effect của saga đó là put, fork, call và take thêm vào đó là eventChanel - nó sẽ tạo một kênh riêng cho xử lí các sự kiện sinh ra từ source hơn là sự kiện từ Redux Store ( nôm na đây là thằng chuyên cho việc lắng nghe và handle sự kiện sinh ra từ code) để lắng nghe khi các request như Create hay Update dữ liệu trên firebase có lỗi thì ta sẽ lắng nghe bằng em này.
```
const newOpts = (name = 'data') => {
  const opts = {};
  const chan = eventChannel((emit) => {
    opts.handler = (obj) => {
      emit({ [name]: obj });
    };
    return () => { };
  });

  chan.handler = opts.handler;
  return chan;
};
```
Đây là đối tượng lắng nghe eventChanel mà mình nói đến.
Tiếp theo là các phương thức get, gellAll, create và update như sau

```
export function* get(path, key) {
  const ref = firebase.database().ref(`${path}/${key}`);
  const data = yield call([ref, ref.once], 'value');
  return data.val();
}
```
Example
```
const posts = yield call(get, 'posts', '1234');
```

```
export function* getAll(path) {
  const ref = firebase.database().ref(path);
  const data = yield call([ref, ref.once], 'value');
  return data.val();
}
```
Example
```
const posts = yield call(getAll, 'posts');
```

```
export function* create(path, fn) {
  const key = yield call(newKey, path);
  const payload = yield call(fn, key);
  const opts = newOpts('error');
  const ref = firebase.database().ref();
  const [_, { error }] = yield [
    call([ref, ref.update], payload, opts.handler),
    take(opts),
  ];
  return error;
}


export function* update(path, key, payload) {
  if (typeof payload === 'function') {
    payload = yield call(payload);
  }
  const opts = newOpts('error');
  const ref = firebase.database().ref(`${path}/${key}`);
  const [_, { error }] = yield [
    call([ref, ref.update], payload, opts.handler),
    take(opts),
  ];
  return error;
}
```
Example
```
yield call(update, 'posts', '1234', { 'Second Post', 'My seond post details', +new Date });
```
Tương tự các chức năng delete hay update all bạn tự improve thêm tí code nhé. Hoặc cuối bài mình share link github anh em có thể vào comment ạ (bow)
Tiếp theo mà một phương thức mà mình nghĩ là cần thiết hơn cho thực tế một số anh em hay mắc tẹo nhỏ- GetPaging: cái này app thực dùng rất nhiều vì list dữ liệu lớn thì không thể không paging hoặc loadmore được đúng không nào. Nhất là mấy em chat-App
```
export function* getPaging(path, orderKey, lastValue, size) {
  let ref = firebase.database().ref(path)
    .orderByChild(orderKey)
    .limitToLast(size + 1);
  if (lastValue !== null) {
    ref = ref.endAt(lastValue, orderKey);
  }
  const data = yield call([ref, ref.once], 'value');
  return data.val();
}
```
Ở đây bạn chỉ cần tập trung một số key chính là :
- lastValue : vì firebase lưu các record dưới dạng key - data và các key được gen dạng GUID vì thế với mỗi lần get paging tiếp theo thì chúng ta cần đẩy last Key lên để nó biết lấy đoạn record từ phần nào đến phần nào
- orderKey: đây là hướng mà chúng ta sẽ select từ trên xuống dưới hoặc dưới lên trên
![](https://images.viblo.asia/5cc5cd95-da3e-4bc3-ba86-3818b1901394.png)
Đầu tiên đây là chia sẻ phần cơ bản để sử dụng firebase.
Tiếp theo phần sau mình sẽ chia phần làm sau để lắng nghe các sự kiện realtime về gửi nhận, xoá hay edit message từ phía client.
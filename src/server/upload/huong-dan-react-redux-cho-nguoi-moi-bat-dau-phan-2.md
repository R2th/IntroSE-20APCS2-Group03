### Lời mở đầu

Chào các bạn, lại là mình đây :D ở bài viết trước  **[Hướng dẫn React Redux cho người mới bắt đầu - Phần 1](https://viblo.asia/p/huong-dan-react-redux-cho-nguoi-moi-bat-dau-phan-1-bWrZny3wKxw)**  mình đã giới thiệu đến các khái niệm cơ bản của **Redux** cũng như các ưu điểm mà thư viện này có. Trong bài viết lần này mình sẽ tiếp tục giúp các bạn hiểu hơn về cách hoạt động của **Redux** thông qua các ví dụ đơn giản. Bắt đầu thôi nào!!!

### Refactoring reducer
Trong bài viết trước tôi có đặt ra một câu hỏi **làm thế nào để một reducers có thể biết được khi nào sẽ generate ra state tiếp theo?** Chìa khóa ở đây chính là **Redux store**. Khi một action được gửi đi, store sẽ chuyển tiếp một thông báo (action object) cho **reducer**.

Tại thời điểm này **reducer** sẽ xem thuộc ính (type) của action này. Sau đó tùy thuộc vào vào action type, reducer sẽ generate ra state tiếp theo. Cuối cùng hợp nhất action payload vào state mới.

Trước đó tôi đã tạo 1 reducer mà không làm gì cả. Bây giờ chúng ta hãy sửa lại nó. Mở **src/js/Reducers/index .js** :

```js
// src/js/reducers/index.js

import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    state.articles.push(action.payload);
  }
  return state;
}

export default rootReducer;
```

Với đoạn code này chúng ta có thể thấy một dòng code `state.articles.push(action.payload);` nó sẽ push action payload vào initial state. Điều này có thể sẽ là một sai lầm trong ứng dụng của bạn vì nó đang phá vớ một trong các nguyên tắc chính của Redux đó là tính bất biến.

`Array.prototype.push` là một impure function, nó sẽ sửa đổi mảng ban đầu, và qua đó thay đổi luôn initial state của ứng dụng của bạn.

Bây giờ chúng ta cần sửa lại đoạn code trên làm sao để initial state không bị thay đổi. 
```js
import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}

export default rootReducer;
```
Như các bạn thấy tôi có thể trả về một đối tượng JavaScript mới với `Object.assign` và sử dụng `Array.prototype.concat` thay vì `Array.prototype.push`

Bây giờ initial state đã được giữ nguyên và trạng thái kết quả chỉ là một bản sao của trạng thái ban đầu. Hãy ghi nhớ 2 điểm chính để tránh xung đột trong Redux:
*  sử dụng concat, slice hoặc spread operator cho các mảng.
*  sử dụng `Object.assign` hoặc object spread của các đối tượng


### Redux store methods
Có thể các bạn chưa biết Redux là một thư viện khá nhỏ với dung lượng chỉ có 2KB và nó có 3 methods quan trọng nhất là:
* **getState**  để lấy state hiện tại của ứng dụng
* **dispatch**  để gửi đi các action
* **subscribe** để nhận biết được sự thay đổi của state

Bây giờ chúng ta cùng làm một ví dụ để xem cách hoạt động với các method trên nhé. Đầu tiên hãy tạo một file mới như sau, **src/js/index.js**, sau đó thêm đoạn code này vào file.

```js
import store from "../js/store/index";
import { addArticle } from "../js/actions/index";

window.store = store;
window.addArticle = addArticle;
```
Bây giờ hãy khởi động server bằng lệnh 
```
npm start
```

Truy cập http: // localhost: 3000 / và mở bảng điều khiển với F12, bật tab console. Bắt đầu bằng cách đọc trạng thái hiện tại : 

```
store.getState();
// output: {articles: Array(0)}
```

Ta thấy là không có articles nào cả. Và thực tế là tôi vẫn chưa cập nhật state ban đầu, bây giờ hãy thử xem cách state được update với subscribe method.

Subscribe method sẽ được kích hoạt khi một action được thực hiện. Ta có ví dụ sau.
```
store.subscribe(() => console.log('Look ma, Redux!!'));
```
Với lệnh này mỗi khi state thay đổi thì `Look ma, Redux!!` sẽ được gọi ra.

Để thay đổi state trong redux, ta cần gửi 1 action. Để gửi 1 action chúng tôi sẽ gọi lại phương thức gửi. 

```js
store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) );
```
Ngay sau khi chạy dòng code trên thì state đã được thay đổi, cùng có nghĩa là bạn sẽ thấy `Look ma, Redux !!` xuất hiện trên console. Để xác minh lại thử lệnh sau:
```js
store.getState();
// output: {articles: Array(1)}
```
###  Connecting React with Redux
Sau khi làm quen một chút với Redux thì chúng ta thấy nó cũng không quá phức tạp đúng không? Chúng ta đã học cách truy cập state hiện tại với getSate, cách gửi 1 action với dispatch và cách lắng nghe sự thay đổi của state với subscribe. 

Tuy nhiên, chúng ta chưa biết cách ghép nối React và Redux với nhau. Tôi đã tự hỏi mình: tôi có nên gọi getState từ React không? Làm cách nào để gửi một hành động từ một thành phần React?

**Redux là một framework agnostic** bạn có thể sử dụng nó với Javascript ,Angular hoặc với React.  Đối với React bạn có thể sử dụng thư viện react-redux để kết nối chúng.

Bạn sẽ sử dụng kết nối với hai hoặc ba đối số tùy thuộc vào trường hợp sử dụng:
* chức năng mapStateToProps (bạn cũng có thể đặt tên cho nó là "select")
* chức năng mapDispatchToProps

**mapStateToProps** làm đúng như tên gọi của nó: nó kết nối một phần của Redux state với các props của một React component . Bằng cách đó, một React component được kết nối sẽ có quyền truy cập vào phần chính xác của store mà nó cần .

**mapDispatchToProps** làm điều gì đó tương tự, nhưng đối với các action.
**mapDispatchToProps** kết nối các hành động Redux với các props React.  Bằng cách này, một React component được kết nối sẽ có thể gửi messages  đến store.

Trong phần tiếp theo, chúng tôi sẽ xây dựng một ứng dụng đơn giản bao gồm ba thành phần:
* App component
* List component cho việc hiển thị các bài báo
* Form component để thêm các bài báo mới

### App component và Redux store
Trước khi bắt đầu, hãy cài đặt react-redux với:

```
npm i react-redux --save-dev
```
Tôi đã nói rằng **mapStateToProps** kết nối một phần của Redux state với các props của một React component . Bạn có thể tự hỏi: điều này đã đủ để kết nối Redux với React chưa? Câu trả lời là chưa :v . Chúng ta vẫn cần thêm một vài thứ nữa từ react-redux .

Mở **src/index.js** , xóa hết mọi thứ và cập nhật file với mã sau:

```js
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```
Như bạn thấy Provider là một thể bao gồm toàn bộ ứng dụng  React  và làm cho nó nhận biết được toàn bộ cửa hàng của Redux.

Bây giờ hãy tạo App component. Nó không có gì đặc biệt: Ứng dụng phải nhập một danh sách sách và tự hiển thị. Tạo một thư mục để chứa các components:
```
mkdir -p src/js/components
```

và một tệp mới có tên src / js / components / App.js :

```
// src/js/components/App.js
import React from "react";
import List from "./List";

const App = () => (
  <div>
    <h2>Articles</h2>
      <List />
  </div>
);

export default App;
```

Lưu và đóng tệp, sau đó chuyển sang tạo Danh sách.

### Danh sách component và Redux state
Chúng ta chưa làm gì đặc biệt cho đến thời điểm này. Nhưng component mới này sẽ tương tác với Redux store.

Nói một cách ngắn gọn thì chìa khóa để liên kết một React component với Redux là kết nối nó với nhau. Vậy cách kết nối chúng sẽ như thế nào ??

Tạo một file mới có tên src / js / components / List.js .
```js
// src/js/components/List.js

import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { articles: state.articles };
};

const ConnectedList = ({ articles }) => (
  <ul>
    {articles.map(el => (
      <li key={el.id}>{el.title}</li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
```


List component là các bài viết trong mảng articles mà chúng ta đã thấy ở trong Redux state. Nó được lấy ra từ reducer.
```
const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}
```

Luôn nhớ rằng: state trong redux đến từ reducer

Cuối cùng các component được xuất dưới dạng List. List là kết quả của việc kết nối các component ConnectedList với Redux store.

Đến đây có thể nhiều bạn sẽ thấy hơi khó hiểu, nhưng đừng lo để hiểu được cách kết nối hoạt động sẽ mất một khoảng thời gian, và bạn sẽ hiểu rõ về nó hơn khi thực hành các ví dụ ở phần sau nữa :D

### Kết luận
Vậy là trong phần 2 này mình đã đưa ra một số các lưu ý các bạn cần tránh khi làm việc với Redux cũng như giới thiệu tới các bạn về cách kết nối giữa Redux với React, trong phần tiếp theo mình sẽ tiếp tục đi sâu hơn về cách kết nối  Redux với React với cách phương thức khác nữa. Cảm ơn đã đọc bài viết của mình!!!

### Nguồn tham khảo

* https://www.valentinog.com/blog/redux/#react-redux-tutorial-getting-to-know-redux-reducers
* https://medium.com/@vmnguyen1204/redux-v%C3%A0-redux-trong-reactjs-56bec2810eb3
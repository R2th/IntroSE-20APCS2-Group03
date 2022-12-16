# 1. Lời mở đầu
Redux là 1 thư viện Javascript để quản lý state của ứng dụng, thường được sử dụng với javascript framework như React. Cơ chế hoạt động của nó được tóm gọn trong 1 sơ đồ đơn giản:

!["Simple react flow"](https://images.viblo.asia/3eca7a19-82be-4c9f-8bfc-cbeac838106b.png)

...Ủa không đơn giản hả?

Đúng rồi, mình cũng vậy. "Action, reducer, dispatch"??? mình chưa bao giờ hiểu những thuật ngữ này cho tới khi thật sự dùng nó trong dự án. Đó là lý do mình viết bài này, một hướng dẫn React Redux cho người mới băt đầu, xuất phát từ việc nghiên cứu vấn đề mà nó giải quyết, rồi mới đến cách implementation. Mình tin rằng chỉ cần 15 phút đọc kỹ bài viết, bạn sẽ hiểu được cái sơ đồ ở trên, và tốt hơn là có thể sử dụng Redux ngay trong project của bạn.

![](https://images.viblo.asia/0e0de1f7-dc67-47cc-aa14-5655df3c4aa1.jpg)

*(Bài viết mặc định người đọc đã có kiến thức cơ bản về React, state, props nên nếu bạn chưa biết thì nhớ tìm hiểu trước khi bắt đầu nhé)*

# 2. Vấn đề và giải pháp

## 2.1. Vấn đề

Tưởng tượng bạn đang viết một ứng dụng quản lý phim có tính năng đăng nhập và xem danh sách các phim. Các component được tổ chức như sau:

- **MoviesList**: Hiển thị danh sách các phim, bao gồm 1 list các component **Movie**
- **Movie**: là 1 item trong **MoviesList**, hiển thị thông tin một phim
- **Login**: chức năng đăng nhập

![](https://images.viblo.asia/679ad383-1671-4e04-8c78-aad2aefbfc5e.png)

Ta có **data** là danh sách thông tin các phim, khi đó data được chuyển đổi qua lại giữa các component trong ứng dụng như thế nào? Theo kiến thức cơ bản đã được học, ta có thể để data là state trong *MoviesList*, rồi truyền data xuống component *Movie* dưới dạng **props**:

![](https://images.viblo.asia/69b0b583-3404-4044-a8d6-ddbc6381f78b.png)

Cách này ổn cho đến khi ta thêm 1 component mới, ví dụ như **Search**, để search các phim, và nó cũng sử dụng data. Vì là 1 component riêng, ta **không** thể truyền data từ component MovieList sang bằng props được:

![](https://images.viblo.asia/d1f77afc-f562-4cda-b1df-411426584498.png)

Lúc này ta buộc phải đưa *data* lên component ở trên nữa là **App** mới có thể truyền *data* xuống **Search** component. Dễ thấy theo mô hình này, khi ứng dụng mở rộng thêm các loại data khác, tất cả sẽ được đưa vào App và các hàm xử lý data cũng phải định nghĩa ở App, khiến App component trở nên khổng lồ với vô vàn trách nhiệm. Bad design!

![](https://images.viblo.asia/c882ce70-bf8a-41b8-9d81-cfddc6787509.png)

## 2.2. Giải pháp

Với Redux, ta đưa tất cả data, các state vào 1 nơi gọi là **store**, khi component nào cần dùng hoặc thay đổi *data*, nó sẽ lấy hoặc cập nhật *data* ở **store**. Các *data* trong các component là thống nhất với nhau vì **store** là toàn cục trong toàn bộ App.

![](https://images.viblo.asia/02f50f41-dc72-4398-bc98-14dc6a93d64b.png)

Ý tưởng chính là như vậy, tiếp theo ta cùng tìm hiểu về cấu trúc và cách sử dụng Redux được mô tả trong một ví dụ đơn giản: **ứng dụng tăng/giảm 1 biến đếm counter.**

# 3. Sử dụng Redux

## 3.1. Setup môi trường

Đầu tiên để sử dụng Redux trong project React, ta bật terminal trong thư mục project, cài đặt 2 thư viện **redux** và **react-redux**:

```bash
npm install redux react-redux
```

## 3.2. Cách hoạt động của Redux

Các thành phần của Redux bao gồm:

- **Store:** Store đơn giản là 1 object chứa tất cả state toàn cục của ứng dụng. Nhưng thay vì lưu các state, nó lưu các **reducer**, sẽ được nói sau.
- **Các Action:** Khi ta định nghĩa các action, ta khai báo các tên của hành động trong ứng dụng. Lấy ví dụ ta có 1 state là counter và cần 2 phương thức để tăng và giảm giá trị của counter. Lúc này ta định nghĩa 2 action có tên là '**INCREMENT**' và '**DECREMENT**' và chỉ vậy thôi, việc xử lý thay đổi state của counter sẽ nhường cho **reducer**.
- **Các Reducer:** 1 reducer tương đương với 1 state nhưng kèm theo các mô tả state sẽ thay đổi như thế nào khi các action khác nhau được gọi. Trong ví dụ ta có reducer là **counter**, nó lưu state của **counter** và kiểm tra action vừa được gọi là INCREMENT hay DECREMENT và trả về state mới là state+1 hay state-1 tương ứng.
- **Các Dispatch:** Khi cần dùng 1 action ở component, ta gọi action đó đơn giản bằng cách sử dụng phương thức **dispatch**. VD: dispatch(increment()), dispatch(decrement()).

Sơ đồ minh họa:

![](https://images.viblo.asia/b4613fe5-e97f-4628-bd18-4215c0164018.png)

Giờ xem code nữa là hiểu luôn nè. Tạo **action** là dễ nhất nên ta sẽ tạo action:

```jsx
// ACTIONS
const increment = () => {
  return {
    type: "INCREMENT",
  };
};
const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
```

Tiếp theo là tạo counter **reducer**. Nó nhận vào 2 tham số là state và action, trả về state mới tùy theo action được gọi. Ta mặc định state ban đầu của counter là 0, code như sau:

```jsx
// REDUCER
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
  }
};
```

Có counter reducer rồi, ta bỏ nó vào **store**. Redux hỗ trợ phương thức **createStore** nhận vào reducer và trả về **store**:

```jsx
// STORE
import { createStore } from "redux";
let store = createStore(counter);
```

Khi cần dùng action, ta gọi **dispatch** từ store và truyền vào action.

```jsx
// DISPATCH
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
// counter state result: -1
```

Vậy là xong, bỏ hết code vào ***index.js*** để bạn có cái nhìn tổng quát:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import App from "./App";

// ACTIONS
const increment = () => {
  return {
    type: "INCREMENT",
  };
};
const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

// REDUCER
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
  }
};

// STORE
import { createStore } from "redux";
let store = createStore(counter);

// DISPATCH
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());
// counter state result: -1

ReactDOM.render(<App />, document.getElementById("root"));
```

## 3.3. Tổ chức Redux trong project

Có nhiều cách để tổ chức project sử dụng redux, với người mới bắt đầu, mình sẽ lưu tất cả action và reducer trong 2 thư mục riêng:

![](https://images.viblo.asia/1fb97c43-5de5-42bc-9f43-fefe666b6169.png)

***actions/counter.js***   
Đầu tiên ta định nghĩa tất cả counter action. Để ý mình vừa thêm parameter **number** cho các action để có thể tăng/giảm một giá trị theo ý muốn. Các action lúc này ngoài tên của nó ra (type), nó còn mang theo *data* là number (*data* đi kèm này thường được gọi là *payload*).

```jsx
export const increment = (number) => {
  return {
    type: "INCREMENT",
    payload: number,
  };
};
export const decrement = (number) => {
  return {
    type: "DECREMENT",
    payload: number,
  };
};
```
***reducers/counter.js***   
Tiếp theo định nghĩa counter reducer. Thay vì cộng trừ 1, ta sẽ cộng trừ *payload* đi kèm với *action* như đã nói ở trên. Đơn giản mà đúng không? Nhớ thêm **case default** để trả về chính state đó khi không có *action* tương ứng nhé.

```jsx
export const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;
    case "DECREMENT":
      return state - action.payload;
    default:
      return state;
  }
};

export default counterReducer;
```

***reducers/index.js***   
Thông thường, ứng dụng sẽ có nhiều reducer nên bạn phải **gộp tất cả reducer** lại để bỏ vào trong *store*. Mình sử dụng hàm ***combineReducer*** của redux để hợp nhất tất cả reducer thành 1 reducer là **allReducers**.

```jsx
import { combineReducers } from "redux";

import counter from "./counter";

const allReducers = combineReducers({
  counter,
  // add more reducers here
});
```

***index.js***   
Ta sử dụng hàm ***createStore*** để tạo **store** chứa *allReducers*. Tiếp theo ta gói *<App/>* bên trong 1 component hỗ trợ của react-redux là ***Provider***, nhờ đó tất cả component trong *<App/>* có thể truy cập được store.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import allReducers from "./reducers";

const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

***App.js***   
Cùng test kết quả bằng cách hiện giá trị counter cùng 2 nút tăng giảm, mỗi lần ấn vào counter tăng/giảm 5 đơn vị, ta sẽ:

- Sử dụng ***useSelector*** của react-redux để lấy state **counter** từ store.
- Sử dụng ***useDispatch*** để trả về function **dispatch**, truyền *increment* và *decrement* vào **dispatch** để gọi 2 action này.

```jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./actions/counter";

function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Counter {counter}</h1>
      <button onClick={() => dispatch(increment(5))}>Increment</button>
      <button onClick={() => dispatch(decrement(5))}>Decrement</button>
    </div>
  );
}

export default App;
```

Rồi bây giờ nhìn lại bức hình hồi nãy nhé:

!["Simple react flow"](https://images.viblo.asia/3eca7a19-82be-4c9f-8bfc-cbeac838106b.png)

# 4. Tổng kết
> **"People often choose Redux before they need it"** - Dan Abramov, *You Might Not Need Redux*

Bạn nên dùng Redux vì:

- Project càng lớn, giá trị redux càng nhiều, nhất là khi app có nhiều shared state và việc xử lý state phức tạp, được handle ở nhiều nơi. Redux là lựa chọn tốt nhất để quản lý state trong project lớn nếu bạn sử dụng React.
- Phân chia rõ ràng giữa shared state (các state toàn cục, app data) và UI state (thường nằm cục bộ trong 1 component).
- Để đi xin việc, chém gió với đồng nghiệp bằng những thuật ngữ siêu ảo: reducer, dispatch, thunk.

Bạn không nên dùng Redux vì:
- Code rất nhiều để làm được rất ít chức năng
- Nếu bạn chỉ cần xử lý state phức tạp: Sử dụng useReducer hook
- Nếu bạn chỉ cần xử lý state global: React Context
- Việc dò tìm action để dispatch (linear search, O(n)) sẽ ảnh hưởng đến performance so với cách tương tác với state trực tiếp

Tóm lại, Redux có nhiều hữu ích đi kèm 1 số side effects, như một loại thuốc, hãy đọc kỹ HDSD trước khi dùng. 

Nhân tiện, nói về side effects, với Redux ta không dùng side effects trực tiếp trong việc xử lý state, mà phải dùng middlewares như redux thunk, redux saga. Mọi người có thể tìm hiểu thêm về chủ đề này trong doc của redux: https://redux.js.org/tutorials/fundamentals/part-6-async-logic

Peace.

# 5. Nguồn tham khảo

- Redux - A Predictable State Container for JS Apps - [https://redux.js.org/](https://redux.js.org/)
- React Redux - Official React bindings for Redux - [https://react-redux.js.org/](https://react-redux.js.org/)
- Dev Ed - Redux For Beginners - [https://www.youtube.com/watch?v=CVpUuw9XSjY](https://www.youtube.com/watch?v=CVpUuw9XSjY)
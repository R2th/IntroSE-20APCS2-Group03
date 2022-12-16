Trong bài viết trước mình đã giới thiệu với mọi người về Redux và ý nghĩa của nó trong việc kết hợp với Reactjs. Và trong bài viết này mình sẽ chia sẻ với các bạn cách sử dụng Redux kết hợp với Reactjs dễ hiểu nhất có thể.


-----

## Kết nối React với Redux

Thực sự thì Redux nó cũng khá phức tạp. Nếu bạn đã học qua Redux thì bạn có thể đã biết các truy cập vào current state bằng `getState`, cũng có thể biết dispatch một action với `dispatch` và lắng nghe những thay đổi state  với `subscribe`.

Nhưng làm sao để kết hợp React và Redux với nhau?

Mình đã tự hỏi rằng: Mình có nên gọi `setState` trong một React component không? Làm thế nào để mình dispatch một action từ một React component? v..v..

Redux tự nó là một framework agnostic (framework mà có thể tương tác với nhiều hệ thống khác nhau). Bạn có thể dùng nó với vanilla Javascript hoặc Angular hoặc với React. Có các bindings để kết hợp Redux với các framework/library mà bạn yêu thích.

Với React, chúng ta có [`react-redux`](https://www.npmjs.com/package/react-redux).

Trước khi tiếp tục, hãy cài react-redux bằng lệnh sau:

```
npm i react-redux --save-dev
```

Để giải thích cách React và Redux kết hợp với nhau, chúng ta sẽ xây dựng một ứng dụng siêu đơn giản. Ứng dụng này được làm từ các components sau:

* App component
* List component để hiển thị danh sách các bài viết
* Form component để tạo mới các bài viết

## React-redux là gì?

`react-redux` là một liên kết (binding) Redux cho React. Nó là một library nhỏ để kết nối Redux và React một cách hiệu quả.

Method quan trọng nhất mà bạn sẽ làm việc cùng đó là `connect`.

Sẽ không có gì đáng ngạc nhiên ở đây vì method này đơn giản là giúp kết nối một React component với Redux store.

Bạn sẽ sử dụng `connect` với 2 hoặc 3 arguments tùy vào trường hợp sử dụng. Những hàm cơ bản cần biết là:

* `mapStateToProps` function: **kết nối một phần của Redux state** tới `props` của một React component, bằng cách đó nên một React component đã kết nối sẽ được truy cập chính xác vào phần của store mà nó cần.
* `mapDispatchToProps` function: hàm này cũng tương tự nhưng dùng cho `actions`. **Nó kết nối Redux action đến React props**. React component đã kết nối sẽ có thể dispatch các `actions`.

## App component và Redux store

Chúng ta đã thấy rằng `mapStateToProps` kết nối một phần Redux state với các props của React component. Bạn có thể tự hỏi: điều này có đủ để kết nối Redux với React không? - Không, nó không.

Để bắt đầu **kết nối Redux với React, chúng ta sẽ sử dụng `Provider`.**

`Provider` là một component bậc cao (high order component) đến từ `react-redux`.
Sử dụng các thuật ngữ layman, Provider đóng gói ứng dụng React của bạn và làm cho nó biết về toàn bộ store của Redux.

Tại sao vậy? Chúng ta thấy rằng trong Redux store quản lý mọi thứ. React phải nói chuyện với store để truy cập state và gửi các actions.

Nào, bây giờ hãy mở `src/js/index.js`, xóa sạch mọi thứ và update file bằng đoạn code sau (nếu bạn dùng create-react-app thì hãy sửa `src/index.js`):

```
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./components/App.jsx";
// if you're in create-react-app import the files as:
// import store from "./js/store/index";
// import App from "./js/components/App.jsx";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  // The target element might be either root or app,
  // depending on your development environment
  // document.getElementById("app")
  document.getElementById("root")
);
```

Bây giờ, hãy tạo App component vì chúng ta yêu cầu nó. Nó không có gì đặc biệt: App nên import một List component và hiển thị chính nó.

Tạo một directory để chứa các components:

```
mkdir -p src/js/components
```
và một file mới với tên `App.jsx` bên trong `src/js/components`:
```
// src/js/components/App.jsx
import React from "react";
import List from "./List";

const App = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
    <h2>Articles</h2>
      <List />
    </div>
  </div>
);

export default App;
```

Hãy nhìn lại đoạn code trên một chút và chúng ta có thể refactor lại như sau:

```
import React from "react";
import List from "./List";

const App = () => (
  <List />
);
export default App;
```

sau đó chúng ta chuyển sang tạo **List**.

## List component và Redux state

Cho đến bây giờ, chúng ta đã không làm gì đặc biệt cả.
Nhưng component mới của chúng ta, List, sẽ tương tác với Redux store.

Một tóm tắt ngắn gọn: chìa khóa để kết nối một React component với Redux là `connect`.

`connect` cần ít nhất 1 argument.

Chúng ta muốn List có được danh sách các bài viết, đó là vấn đề **kết nối `state.articles` với component**. Vậy làm thế nào? Đã có **`mapStateToProps`**.

Tạo một file mới với tên `List.jsx` bên trong `src/js/components`. Nó trông giống như bên dưới đây:

```
// src/js/components/List.jsx
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { articles: state.articles };
};

const ConnectedList = ({ articles }) => (
  <ul className="list-group list-group-flush">
    {articles.map(el => (
      <li className="list-group-item" key={el.id}>
        {el.title}
      </li>
    ))}
  </ul>
);

const List = connect(mapStateToProps)(ConnectedList);

export default List;
```

List component nhận prop các bài viết là bản sao của mảng bài viết mà chúng ta đã thấy ở Redux state. Nó đến từ `reducer`:

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

**Hãy luôn nhớ: state trong redux đến từ các `reducers`**. Bây giờ, sử dụng prop bên trong JSX để tạo một danh sách các bài viết:

```
{articles.map(el => (
  <li className="list-group-item" key={el.id}>
    {el.title}
  </li>
))}
```

**React tip:**  Hãy tạo thói quen validate props với `PropTypes` hoặc tốt hơn, sử dụng `TypeScript`

Cuối cùng, component được xuất dưới dạng List. List là kết quả của việc kết nối stateless component `ConnectedList` với Redux store.

Vẫn còn bối rối? Mình cũng vậy. Hiểu cách `connect` hoạt động sẽ mất một thời gian. Đừng sợ, con đường để học Redux được lát bằng những khoảnh khắc của LOL. =)).

Mình khuyên các bạn nên nghỉ ngơi 1 chút để khám phá cả `connect` và `mapStateToProps`.

Một khi bạn tự tin về chúng, hãy đến với phần tiếp theo!

## Form component và Redux actions

Form component mà chúng ta sẽ tạo phức tạp hơn một chút so với List. Nó là một form để thêm các items mới vào ứng dụng của chúng ta.

Thêm nữa nó là một **stateful component**.
> A stateful component in React is a component carrying its own local state.

Một stateful component? Hiện tại, mình nói về Redux để quản lý state! Tại sao lại cho Form local state của riêng nó??

**Ngay cả khi sử dụng Redux, việc có các stateful components là hoàn toàn tốt.**

Không phải mọi phần state của ứng dụng nên đưa vào bên trong Redux.

Trong ví dụ này, mình không muốn bất kỳ component nào khác biết về local state của Form.

Form component chứa một số logic để update local state khi form được submit.

Nó cũng nhận một Redux action. Bằng cách này, nó có thể update global state bằng cách **dispatching `addArticle` action**.

Tạo một file mới với tên `Form.jsx` bên trong `src/js/components`. Nó trông giống như bên dưới đây:

```
// src/js/components/Form.jsx
import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addArticle } from "../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}

class ConnectedForm extends Component {
  constructor() {
    super();
    
    this.state = {
      title: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: "" });
  }
  
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;
```

**`mapDispatchToProps` kết nối Redux actions đến React props**. Bằng cách này một component đã kết nối có thể dispatch các actions.

Các bạn có thể thấy cách actions được gửi đi trong phương thức `handleSubmit`:

```
// ...
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id }); // Relevant Redux part!!
// ...
  }
// ...
```

Cuối cùng, component được xuất dưới dạng Form. Form là kết quả của việc kết nối ConnectedForm với Redux store.

Lưu ý: argument đầu tiên của `connect` phải là `null` khi thiếu `mapStateToProps` giống như trong ví dụ về Form. Nếu không bạn sẽ bị báo lỗi: `TypeError: dispatch is not a function.`

Các components của chúng ta đã cài đặt xong!

Update App bằng cách sử dụng Form component:

```
import React from "react";
import List from "./List.jsx";
import Form from "./Form.jsx";

const App = () => (
  <div className="row mt-5">
    <div className="col-md-4 offset-md-1">
      <h2>Articles</h2>
      <List />
    </div>
    <div className="col-md-4 offset-md-1">
      <h2>Add a new article</h2>
      <Form />
    </div>
  </div>
);

export default App;
```

Install uuid bằng lệnh:

```
npm i uuid --save-dev
```

Bây giờ chạy webpack (hoặc Parcel) bằng lệnh:

```
npm start
```

và mở browser với link: http://localhost:8080

Bạn sẽ thấy như dưới đây:

![](https://images.viblo.asia/9d61962c-4c51-49cc-88cd-4294d92bdf44.png)

Không có gì lạ mắt nhưng vẫn hữu ích để biểu diễn React và Redux làm việc!

**List component bên trái được kết nối với Redux store.** Nó sẽ re-render lại bất cứ khi nào bạn thêm một item mới.

![](https://images.viblo.asia/e60cf241-f088-4625-b7b6-0431eab0c5e1.gif)

Nếu bạn không thấy bất cứ điều gì trên trình duyệt, hãy đảm bảo rằng `document.getElementById(“app”)` trong `src/js/index.js` khớp với một element thực trong page:

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>

<body>
    <div class="container">
        <div id="root">
        </div>
    </div>
</body>

</html>
```

Whoaaa! Bạn đã làm được nó! Nhưng chúng ta vẫn chưa hoàn thành đâu nhé. Trong bài tiếp theo mình sẽ tiếp tục với Redux middlewares. Hold tight! :D



-----

Refer link: https://www.valentinog.com/blog/redux/, https://github.com/reduxjs/react-redux
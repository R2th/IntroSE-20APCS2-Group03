Đây là phần thứ hai của series **React+Redux** tiếp sau của phần một về **ReactJS** ([React+Redux for Dummies - Part 1](https://viblo.asia/p/reactredux-for-dummies-part-1-maGK741aZj2)).

Lần này mình xin giới thiệu về **redux**.

Hi vọng tài liệu này sẽ giúp các bạn nắm được một phần tổng quan và cơ bản khi tìm hiểu về **redux**.

## 1. Giới thiệu

Trong bài trước mình đã giới thiệu về **React** và các khái niệm cơ bản **component**, **state** và **props**. Trong đó
**State** chính là các dấu mốc đánh dấu mỗi khi có sự thay đổi. Các thay đổi đó có thể là trạng thái ẩn/hiện của các thành phần trên giao diện hoặc cập nhật lại dữ liệu. Mỗi khi sử dụng **state**, chúng ta đều sẽ phải khai báo trạng thái ban đầu của **state** đó.

Các bạn có bao giờ tự hỏi làm cách nào để chúng ta có thể quản lý các **state** một cách hiệu quả? Liệu các **state** có vô tình bị thay đổi bởi các xử lý logic khác không? Liệu có một thư viện nào giúp chúng ta hay không?

Đây chính là vấn đề **redux** sẽ giúp chúng ta giải quyết.

## 2. Redux 

**State** tồn tại khắp nơi trong web applications, đặc biệt trong React application và bất cứ một kiến trúc frontend nào.

Ngay trong  single page app đơn giản nhất cũng có thể vượt ngoài tầm kiểm soát nếu như không có giới hạn chặt chẽ giữa các layer và trong **React** cũng như vậy.

Ban đầu bạn có thể giữ các **state** trong một **React component** cha nếu như đó chỉ là một ứng dụng nhỏ. Tuy nhiên khi bạn bổ sung thêm các tính năng mới đến một mức nào đó, mọi thứ sẽ trở nên khó khăn hơn. Bạn sẽ muốn có một phương pháp thống nhất để theo dõi các **state** chưa kể đến việc cần tách bạch giữa các **frontend component** và tầng logic.

**Redux** sẽ giải quyết tất cả các vấn đề nêu trên bằng cách chỉ cung cấp đúng các **state** mà **component** cần. Hơn thế nữa, **redux** còn có thể giữ riêng phần logic trong các tầng riêng (được gọi là **middleware**) cùng với các phần code để lấy dữ liệu. Chính vì thế, lợi ích mà **redux** mang lại là rất to lớn.

Tuy nhiên bên cạnh các lợi ích, **React** có rất nhiều phương pháp khác để tránh sử dụng **redux** và **redux** cũng khiến cho ứng dụng trở nên phức tạp hơn bởi nó sẽ thêm một lớp abstraction vào trong. VÌ thế trước khi chúng ta có thể cùng xem cách áp dụng **redux** vào trong ứng dụng như thế nào, chúng ta sẽ cần phải tìm hiểu các nguyên lý cơ bản của  **redux**.

Trong **redux** chúng ta sẽ nói đến 4 khái niệm: **action**, **reducer**, **middleware** và **store**. Trong đó **store** là thứ gắn kết và giữ tất cả các **state** của ứng dụng.

### 1. Store

Ban đầu chúng ta sẽ tạo file **store/index.js** và khởi tạo một store như sau

```javascript
import { createStore } from "redux";
import rootReducer from "../reducers/index";

const store = createStore(rootReducer);
export default store;
```

Có thể thấy, **store** chính là kết quả trả về khi gọi phương thức *createStore()* từ thư viện của **redux**, trong đó *rootReducer* chính là một **reducer** chúng ta cần phải đưa vào làm tham số đầu tiên

Bạn cũng có thể dùng một **state** khởi tạo cho *createStore()* dể load trước render từ phía server. Tuy nhiên, điểm cốt lõi chúng ta nhận ra ở đây là **state** trong **redux** được tạo ra từ **reducer** và chúng ta sẽ cần tạo một **reducer** trong phần tiếp theo

### 2. Reducer

**Redux reducer** đơn giản chỉ là một phương thức JavaScript. Trong đó nó cần hai tham số là **state** hiện tại và **action**

Thông thường trong **React component**, **state** cục bộ có thể đc thay đổi ngay tại chỗ. Tuy nhiên điều đó tuyệt đối bị cấm trong **redux**. **State** phải luôn là bất biến và không thể thay đổi tại chỗ.

Từ đó có thể thấy **reducer** là một phương thức thuần túy (*pure function*), phương thức sẽ luôn cho một đầu ra duy nhất tương ứng với mỗi đầu vào.

Ở đây chúng ta sẽ tạo ra một **reducer** cho **state** khởi tạo cùng với một **action** làm tham số trong file **reducers/index.js**

```javascript
const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  return state;
};

export default rootReducer;
```

Có thể thấy **state** khởi tạo ở đây là một tham số mặc định và **reducer** chưa có bất kì một chức năng nào ngoài trừ trả về **state** khởi tạo. Trong phần tiếp theo chúng ta sẽ tạo thêm và đưa **action** vào tham số


### 3. Action

Chúng ta có thể thấy **reducer** là khái niệm quan trọng nhất trong **redux**. **Reducer** tạo ra các **state** nhưng **action** mới là tín hiệu được gửi tới **store** để làm thay đổi **state**. Và thực tế thì **action** cũng chỉ đơn giản là một JavaScript object.

```javascript
{
  type: 'ADD_ARTICLE',
  payload: { title: 'React Redux Tutorial', id: 1 }
}
```

Ở đây **action** chỉ là một JavaScript object với hai thuộc tính: *type* và *payload*.

Thuộc tính *type* giúp chỉ ra **state** nên được thay đổi sang **state** nào vì thế nên nó là thuộc tính bắt buộc trong **redux**. Trong khi đó thuộc tính *payload* giúp mô tả các thành phần thông tin sẽ bị thay đổi và nó có thể bị loại bỏ nếu như không có dữ liệu mới cần lưu lại trên **store**.

Ở đây chúng ta nên đóng gói tất cả các **action** vào trong một phương thức và làm ảo hóa việc khởi tạo object như ví dụ sau đây trong file **actions/index.js**:

```javascript
export function addArticle(payload) {
  return { type: "ADD_ARTICLE", payload }
};
```

Bạn có thể thấy thuộc tính *type* là một *string* và có thể có lỗi trùng lặp hoặc gõ sai ngữ pháp, vì thế chúng ta nên khai báo các **action** là các hằng số trong file **constants/action-types.js**.

```javascript
export const ADD_ARTICLE = "ADD_ARTICLE";
```

Lúc đó **action** của chúng ta sẽ có dạng như sau

```javascript
import { ADD_ARTICLE } from "../constants/action-types";
export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}
```

Việc tiếp theo là chúng ta sẽ đưa **action** vào xử lý trong **reducer**. **Reducer** sẽ dựa trên *type* của **action** để đưa ra **state** tiếp theo đồng thời sẽ cập nhật dữ liệu trong *payload* cho **state** mới.

Chúng ta sẽ cần thêm câu lệnh *if* để kiểm tra *type* trong **reducer** (file **reducers/index.js**)

```javascript
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

Đồng thời bạn có thể thấy chúng ta đã thêm dòng lệnh để đưa *payload* vào **state** khởi tạo. Trông có vẻ đó là hành động đúng nhưng thực ra nó đang vi phạm nguyên tắc không được thay đổi của **redux**. 

*Array.prototype.push* là một phương thức không thuần túy bởi nó sẽ làm thay đổi chuỗi ban đầu và bên cạnh đó chúng ta còn thay đổi **state** khởi tạo một cách cục bộ

Ở đây chúng ta cần phải sửa lại bằng cách trả về một **state** mới với *Object.assign*, tức là một JavaScript object mới. Như vậy chúng ta đã giữ cho **state** ban đầu không bị thay đổi. Đông thời chúng ta nên sử dụng *Array.prototype.concat* thay vì *Array.prototype.push* để giữ lại chuỗi ban đầu
 
```javascript
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

Bây giờ **state** khởi tạo đã được giữ nguyên vẹn và **state** trả về chỉ là một bản sao của **state** khởi tạo. Chúng ta phải rút ra hai điểm chính để tránh làm thay đổi các object trong **redux**
- Sử dụng *concat()*, *slice()* hoặc các *spread operator* cho xử lý chuỗi
- Sử dụng *Object.assign()* hoặc *object spread* cho các object


### 4. Các phương thức trong store

Thư viện của **redux** rất nhỏ (khoảng 2KB) và chủ yếu chỉ có 3 phương thức quan trọng nhất

- *getState* để lấy **state** hiện tại của ứng dụng.
- *dispatch* để gửi **action**
- *subscribe* để nghe việc **state** thay đổi

Để có thể tiếp cận với **store** và **action** ở trên, chúng cần phải được tạo thành các biến toàn cục trong file **js/index.js**

```javascript
import store from "../js/store/index";
import { addArticle } from "../js/actions/index";
window.store = store;
window.addArticle = addArticle; 
```

Như vậy trong file **index.js** chúng ta có thể cập nhật 

```javascript
import index from "./js/index";
```

Bây giờ chúng ta khởi động server bằng lệnh `npm start` thông qua `http://localhost:8080/` và thực hiện các lệnh trên console.
Bắt đầu bằng việc đọc **state** hiện tại

```javascript
store.getState();
// output: {articles: Array(0)}
```

Hiện nay chúng ta có chuỗi `articles` với 0 phần tử, nghĩa là chưa hề cập nhật **state** khởi tạo. Từ đây chúng ta có thể dùng *subscribe()* để lắng nghe các thay đổi từ **state**

Phương thức *subcribe()* sẽ gọi tới một *callback* mỗi khi một **action** được gửi đi. Việc gửi đi một **action** tới cho **store** đồng nghĩa với việc bạn muốn thay đổi **state**

Chúng ta sẽ cần đăng kí một *callback* như sau

```javascript
store.subscribe(() => console.log('Look ma, Redux!!'));
```

Để gửi đi một **action** chúng ta cần sử dụng *dispatch* để gửi **action** *addArticle* và cập nhật thêm 1 phần tử mới 

```javascript
store.dispatch( addArticle({ title: 'React Redux Tutorial for Beginners', id: 1 }) );
```

Và bạn sẽ thấy tin nhắn `“Look ma, Redux!!` xuất hiện trên console. Chúng ta có thể kiểm tra lại trạng thái của **state** và xem `article` được cập nhật

```javascript
store.getState();
// output: {articles: Array(1)}
```

### 5. Kết nối giữa React và redux

Phần này chúng ta sẽ nói về cách để **React** và **redux** có thể bắt tay được với nhau. Như các bạn đã thấy, **redux** là một *framework*, có thể tùy chỉnh với JavaScript hoặc Angular hay React. Và với React chúng ta sẽ cần thư viện **react-redux** để kết nối giữa một **React component** và một **redux store**.

Để làm dduwocjw như vậy, chúng ta cần chuẩn bị một vài tham số như sau

- Hàm *mapStateToProps()* (Hay còn được gọi là *select*) sẽ kết nối một phần của **redux state** tới các **prop** của **React component**. Như vậy **React component** có thể truy cập đến đúng phần **store** chúng cần.

- Hàm *mapDispatchToProps()* cũng có chức năng tương tự nhưng là để cho **action**, nó sẽ kết nối **redux action** tới **React prop**. Như vậy **React component** có thể gửi tin đến cho **store**.

Chúng ta đã sẵn sàng để tạo ra một ứng dụng đơn giản từ ba **component**

- **App component**
- **List component** để hiển thị thông tin
- **Form component** để thêm thông tin mới

#### 1. App component và store

Ban đầu chúng ta sẽ cần tạo ra một **Provider component** để làm *root* trong file **index.js**

```javascript
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

Như vậy **Provider** sẽ đóng gói toàn bộ ứng dụng và có thể kết nối tới **redux store**. Tiếp theo chúng ta sẽ tạo ra **App component** có thể tự *render* trong file **js/components/App.js**

```javascript
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

#### 2. List component và state

Giờ chúng ta sẽ cần **List component** để lấy ra một danh sách thông tin từ một **state** nhất định trong file **/js/components/List.js**

```javascript
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

Ở đây **List component** sẽ nhận **prop** `articles` là bản sao của chuỗi `articles` mà ta thấy trong **redux state** nhờ vào **reducer** 

```javascript
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

Cuối cùng **List component** sẽ được trả ra là kết quả của kết nối không có **state** (*stateless*) giữa **List componet** và **redux store**.

Chúng ta đã sẵn sang cho phần tạo **Form component**.


#### 3. Form component và action

Phần **Form component** sẽ có chút phức tạp hơn **List component** do chúng ta sẽ cần phải sử dụng lớp của JavaScript. Phần **component** này sẽ cần lưu trữ một số **state** cục bộ, như nhập thông tin form. Nó cũng sẽ cần phần logic để cập nhật **state** cục bộ khi submit form.

Bên cạnh đó, chúng ta cũng cần một **redux action** để cập nhật **state** toàn cục bằng việc gửi **action** *addArticle* .
Chúng ta sẽ tạo thêm file **js/components/Form.js**

```javascript
import React, { Component } from "react";
import { connect } from "react-redux";
import { addArticle } from "../actions/index";
function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
}
class ConnectedForm extends Component {
  constructor(props) {
    super(props);
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
    this.props.addArticle({ title });
    this.setState({ title: "" });
  }
  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">SAVE</button>
      </form>
    );
  }
}
const Form = connect(
  null,
  mapDispatchToProps
)(ConnectedForm);
export default Form;
```

Bên cạnh việc kết nối giữa **redux action** và **React prop** bằng *mapDispatchToProps()*, chúng ta sẽ gửi **action** thông qua hàm *handleSubmit()*. Và cuối cùng là **Form** đã được hoàn thành, giờ chúng ta sẽ đưa vào **App** 

```javascript
import React from "react";
import List from "./List";
import Form from "./Form";
const App = () => (
  <>
    <div>
      <h2>Articles</h2>
      <List />
    </div>
    <div>
      <h2>Add a new article</h2>
      <Form />
    </div>
  </>
);
export default App;
```

Giờ chúng ta có thể kiểm tra bằng cách khởi động server với `npm start` và xem **List component** được kết nối với Redux store. Nó sẽ được *render* lại mỗi khi có phần tử mới được thêm vào.

Tiếp theo đây chúng ta sẽ tiếp tục sang phần **middleware**.

### 6. Middleware

Như vậy chúng ta đã tạo ra 
- **Store**, thành phần điều phối trong **redux**
- **Reducer**, thành phần tạo ra **state**
- **Action**, bản tin cập nhật **state**

Cuối cùng chúng ta sẽ cùng tìm hiểu thành phần sẽ tạo ra các bản tin **action** còn gọi là **middleware**

Theo như ví dụ ở trên, giả định rằng chúng ta cần kiểm duyệt và ngăn người dùng tạo ra thông tin với một số từ nhất định trên tiêu đề. Hãy cùng nhìn lại hàm *handleSubmit()* trong **Form.js**.

```javascript
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    this.props.addArticle({ title });
    this.setState({ title: "" });
  }
```

Đơn giản chúng ta có thể kiểm tra *this.props.addArticle* như sau

```javascript
  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const forbiddenWords = ['spam', 'money'];
    const foundWord = forbiddenWords.filter(word => title.includes(word) )
    if (foundWord) {
      return this.props.titleForbidden();
    }
    this.props.addArticle({ title });
    this.setState({ title: "" });
  }
```

Nhưng như vậy thì phần logic sẽ nằm trong **component** và không thể tách ra được. Chúng ta cũng có thể kiểm tra thuộc tính *title* bên trong **reducer** và gửi đi một bản tin khác khi tìm thấy các từ bị cấm nhưng chúng ta không thể gọi *dispatch* từ bên trong một **reducer**. Như vậy chúng ta sẽ cần kiểm tra phần *payload* của **action** trước khi nó được gửi tới **reducer** và đây chính là phần việc của **middleware**.

**Redux middleware** là một phương thức có thể ngăn chặn và xử lý các **action** tùy theo tình huống trước khi chúng tới được **reducer**. Nó một phương thức trả về một hàm sẽ lấy *next* làm tham số. Và trong hàm trả về đó sẽ trả lại một hàm khác lấy *action* làm tham số và trả về **action** cuối cùng có dạng như sau

```javascript
function forbiddenWordsMiddleware({ getState, dispatch }) {
  return function(next){
    return function(action){
      // do your stuff
      return next(action);
    }
  }
}
```

**Middleware** sẽ giúp chúng ta ảo hóa tầng logic, đông thời có thể gọi trực tiếp tới *getState()* và *dispatch()*. Nếu chúng ta sử dụng **middleware** 
- Phần logic sẽ hoàn toàn nằm ngoài UI
- Có thể tái sử dụng các phần logic
- Có thể được kiểm tra độc lập phần logic

Bây giờ chúng ta sẽ tạo file **/js/middleware.js** như sau

```javascript
function forbiddenWordsMiddleware({ dispatch }) {
  return function(next){
    return function(action){
      // do your stuff
      return next(action);
    }
  }
}
```

Ở đây chúng ta không cần tới *getState()* nên sẽ chỉ có *dispatch()* là tham số duy nhất. Tiếp theo chúng ta cần kiểm tra phần *payload* và chặn các bản tin có tiêu đề chứa từ bị kiểm duyệt như sau

```javascript
import { ADD_ARTICLE } from "../constants/action-types";
const forbiddenWords = ["spam", "money"];
export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff
      if (action.type === ADD_ARTICLE) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      return next(action);
    };
  };
}
```

Ở đây chúng ta sẽ kiểm tra các **action** có *type* là `ADD_ARTICLE` và tìm các *action.payload.title* có chứa từ kiểm duyệt. Nếu như tìm được các từ bị kiểm duyệt chúng ta sẽ gửi đi một **action** `FOUND_BAD_WORD` và bỏ qua `next(action)`

Chúng ta cần phải chú ý luôn trả về `next(action)` nếu không thì không có **action** nào khác có thể tới được **reducer**. Bước tiếp theo chúng ta sẽ đưa `forbiddenWordsMiddleware` vào trong **js/store/index.js** thông qua hàm *applyMiddleware()* của **redux** như sau

```javascript
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";
import { forbiddenWordsMiddleware } from "../middleware";
const store = createStore(
  rootReducer,
  applyMiddleware(forbiddenWordsMiddleware)
);
export default store;
```

Giờ chúng ta sẽ chạy server và kiểm tra lại logic cho tiêu đề. Nếu như tiêu đề có chứa các từ `spam` hoặc `money` bị chặn thì **middleware** đã làm việc hiệu quả.

## 3. Kết luận
Thông qua các ví dụ ở trên, bạn đã có thể hiểu được các khái niệm cơ bản về **redux** và sử dụng **React-redux**

Mình xin hoan nghênh và xin cám ơn tất cả các ý kiến đóng góp cho bài viết thêm chính xác và sinh động hơn. 

Mình cũng xin giới thiệu một bài viết khá hay và sinh động đã giúp mình hiểu rõ hơn cách thức hoạt động của redux: [Redux cho người mới bắt đầu - Part 1 Introduction](https://viblo.asia/p/redux-cho-nguoi-moi-bat-dau-part-1-introduction-ZjleaBBZkqJ)

Tài liệu tham khảo:
- [React Redux Tutorial for Beginners: The Definitive Guide (2019)](https://www.valentinog.com/blog/redux/)
- [Redux example](https://redux.js.org/basics/example)
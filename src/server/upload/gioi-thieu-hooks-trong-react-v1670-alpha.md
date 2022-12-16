This article I write in Vietnamese and I don’t plan to use English for this. If you are the foreigner, please refer official document from React page: https://reactjs.org/docs/hooks-intro.html

Trước khi trả lời câu hỏi, React hooks là gì thì mình sẽ trả lời trước câu hỏi React hooks có thể làm gì?

Trở lại một ví dụ cách đây 2 năm, Counter sẽ được tăng mỗi khi người dùng click vào button Increment
```javascript 
var Counter = React.createClass({
  incrementCount: function(){
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function(){
     return {
       count: 0
     }
  },
  render: function(){
    return (
      <div className="counter">
        <h1>{this.state.count}</h1>
        <button className="btn" onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
});
```
Và sau đó, Class Component ra đời

```javascript
class Counter extends Component {
  constructor(props) {
   super(props);
   this.state = { count: 0 };
   this.incrementCount = this.incrementCount.bind(this)
  }
  incrementCount = () => {
    this.setState(({ count }) => ({
      count: count + 1
    }));
  };
  render() {
    return <button onClick={this.incrementCount}>{this.state.count}</button>;
  }
}
```
Và cuối cùng là Function component ra đời, … BUT. FUNCTION thì làm sao lưu State, và làm sao biết React lại sự thay đổi của State? Câu trả lời cho câu hỏi này thì sẽ suy nghĩ đến Redux, Flux, React, RxJS, và bla bla bla….

Tuy nhiên với sự ra đời của React Hooks, Function component có thể tự quản lý State và các chức năng khác mà không cần đến state managment khác.
```javascript
import { useState } from 'react';

function Counter() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
Hàm `useState` nhận vào giá trị ban đầu, và trả về 2 thứ: giá trị hiện tại và hàm set của giá trị mới. Và mình vẫn sử dụng `Function`, không cần sửa lại code thành `Class`

Trường hợp nào nên sử dụng `useState` hooks, câu trả lời là state của bạn có scope như thế nào? Bạn cần một biến để biết là mình có muốn mở Modal popup hay chưa? Bạn cần một biến để lưu input value tạm thời của field trước khi submit. Đa số các trường hợp UI State sẽ đều áp dụng được React hooks.

Một trong các phần cơ bản mà web application luôn phải xử lý là hiện và lấy thông tin từ Form như ví dụ ở dưới.
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstname: "", lastname: "" };
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastname = this.handleChangeLastname.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFirstName(event) {
    this.setState({ firstname: event.target.value });
  }

  handleChangeLastname(event) {
    this.setState({ lastname: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    const { firstname, lastname } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Firstname:
          <input
            type="text"
            value={firstname}
            onChange={this.handleChangeFirstName}
          />
        </label>
        <input type="submit" value="Submit" />
        <label>
          Lastname:
          <input
            type="text"
            value={lastname}
            onChange={this.handleChangeLastname}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
Khi thêm một input nữa vào Class, thường thì mình phải thêm vào `state`, viết thêm một hàm handleChange. Với cách viết của React Hooks mọi việc đơn giản hơn
```javascript
import { useState } from 'react';
function useInputValue(initialValue) {
    let [value, setValue] = useState(initialValue);
    let onChange = useCallback(function(event) {
        setValue(event.currentTarget.value);
    }, []);
    return {
        value,
        onChange
    };
}

function NameForm() {
    let firstname = useInputValue("");
    let lastname = useInputValue("");

    return (
        <form onSubmit={this.handleSubmit}>
        <label>
            Firstname:
            <input type="text" {...firstname} />
        </label>
        <label>
            Lastname:
            <input type="text" {...lastname} />
        </label>
        <input type="submit" value="Submit" />
        </form>
    );
}
```
Logic sử dụng state được tái sử dụng lại khá triệt để. 
`useInputValue` là một custom Hooks mà mình viết thêm sử dụng Hooks của React. Một cách nào đó bạn sẽ nhìn thấy pattern Mixin ở đây. :D

Hi vọng sau bài viết này, các bạn có thể bắt đầu có khái niệm React Hooks (chỉ mới là proposal thôi nha). 

Các ví dụ sử dụng React hook: 

- https://github.com/rehooks/awesome-react-hooks
- https://www.hooks.guide/

Bài viết sau mình sẽ nói về tại sao lại sử dụng React Hooks. Sâu hơn 1 chút, tại sao React Hooks ra đời? Có 2 cách hiện tại có thể sử dụng để tái sử dụng logic của Component là Render props và HOC (higher-order components), và cách phân chia State Management.

Bài viết gốc bạn có thể tham khảo tại https://thinhvoxuan.me/react-hook-101/
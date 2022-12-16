## 1. Mở đầu
<hr>

Chắc hẳn khi làm việc với `React` chúng ta không còn lạ lẫm gì với việc khai báo các function và gán nó vào các sự kiện (event) trên giao diện của chúng ta. Bài viết sau đây của mình sẽ bàn về các cách mà chúng ta có thể sử dụng để định nghĩa function cũng như một số ưu, nhược điểm của chúng

## 2. Function
<hr>

Giả sử ta có 1 class component như sau:
```js
import ReactDOM from "react-dom";
import React, { Component } from "react";

const tasks = [
  { id: 1, content: "Write Viblo Post" },
  { id: 2, content: "Do 15000 push up" },
  { id: 3, content: "Fix some bugs" }
];

class App extends Component {
  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map(item => (
          <div key={item.id}>
            Task name:
            <strong>
              {item.content}
            </strong>
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
```
Với đoạn code trên thì đây là những gì mà chúng ta nhận được trên giao diện:

![](https://images.viblo.asia/261ef3dc-e7f0-4a4a-bfcd-2cc35764284d.png)

Bây giờ giả sử chúng ta muốn mỗi khi chúng ta click vào tên một task (phần chữ in đậm) thì sẽ tiến hành alert phần nội dung đó in đậm đó lên. Để làm được điều này thì tất nhiên chúng ta sẽ cần một định nghĩa một `function` và gán nó vào sự kiện `onClick` của task đó. Sau để mình sẽ điểm lại một số cách mà bạn có thể sử dụng như sau:

### a. Inline Function

Với cách này thì chúng ta sẽ viết lại như sau:
```js
class App extends Component {
  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map(item => (
          <div key={item.id}>
            Task name:
            <strong onClick={() => { alert(item.content) }>
              {item.content}
            </strong>
          </div>
        ))}
      </div>
    );
  }
}
```
Sau đó ta thử bấm vào phần nội dung của task thì sẽ thu được kết quả như mong muốn:
![](https://images.viblo.asia/19657e61-9c93-4f5e-8718-8a0b8fe421ed.png)

Tuy nhiên với cách làm như trên thì no sẽ sinh ra một vấn đề đó là môi khi hàm `render()` được gọi thì nó sẽ phải tạo lại cái `anonymous function` kia của chúng ta sau đó mới gán lại vào sự kiện `onClick` mà bạn khai báo. Vậy nên đây là cách làm không hợp lý chút nào.

### b. Arrow Function

Với cách làm này chúng ta sẽ định nghĩa phần alert thành một function mới như sau:
```js
class App extends Component {

handleAlert = e => {
    alert(e.target.innerHTML)
}

  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map(item => (
          <div key={item.id}>
            Task name:
            <strong onClick={this.handleAlert}>
              {item.content}
            </strong>
          </div>
        ))}
      </div>
    );
  }
}
```

Với cách làm này ta cũng thu được kết quả tương tự như trên đồng thời tránh được việc hàm của chúng ta bị "tạo lại" thay vì "sử dụng lại" như mình đã đề cập ở phía trên. Đồng thời bằng việc sử dụng `arrow function` như trên ta còn có thêm một lợi thế nữa đó là bên trong function nếu ta sử dụng `this` thì nó sẽ tự biết `this` chính là instance của component hiện tại và vì thế ta có thể sử dụng các hàm như `this.setState()`, `this.props`, `this.state`, ... . Tuy vậy ở đây, trong trường hợp chúng ta muốn khi alert  id của task đó thì sẽ chỉ có duy nhất một cách đó là tại phải thêm dữ liệu custom vào thẻ `<strong>` của chúng ta vì mặc định khi dùng `arrow function` như trên thì ta chỉ có thể sử dụng một biết duy nhất đó là `e` hay `event` như ở trên. Trong trường hợp bạn cố tình viết như sau:
```js
<strong onClick={this.handleAlert(item.id)}>
    {item.content}
</strong>
```
Thì sẽ dẫn đến function của chúng ta  được gọi ngay lập tức khi lần đầu `render()` đây hoàn toàn không đúng với những gì ta mong muốn vì với cách viết `this.handleAlert(item.id)` chính xác là lợi gọi hàm chứ không phải việc bán đang gán hàm đó vào sự kiện `onClick` nếu trên thực tế bạn viết như vậy sẽ gây ra bug cho dự án. Nên trong trường hợp bận muốn truyền thêm biến như tên thì đây sẽ không phải là cách hay. TUy nhiên ta vẫn có thể `"hack"` như sau như mình đã nói ở trên như sau:
```js
class App extends Component {

handleAlert = e => {
    alert(e.target.dataset.id)
}

  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map(item => (
          <div key={item.id}>
            Task name:
            <strong data-id={item.id} onClick={this.handleAlert}>
              {item.content}
            </strong>
          </div>
        ))}
      </div>
    );
  }
}
```
Tuy nhiên với mình cách này không hay lắm vì ta vẫn cứ mất công viết tuần tự `e.target` rồi mới đến các dữ liệu kia và đồng thời ta lại phải tạo thêm `custom attribute` cho thẻ của chúng ta. Sẽ hay hơn nếu ta có thể viết dưới dạng `this.handleAlert(item.id)`.

### c. Bind Function

Có lẽ đẫy sẽ là cách tạo function đầu tiên mà bạn biết được khi tiếp cận với `React` vì theo mình thấy trên docs của `React` cũng có hướng dẫn ta viết như vậy trong trường hợp ta muốn truyền thêm biến:
```js
class App extends Component {
  handleLogContent(index, e) {
    console.log(index, e.target.innerHTML);
  }

  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map((item, index) => (
          <div key={item.id}>
            Task name:
            <strong onClick={this.handleLogContent.bind(this, item.id)}>
              {item.content}
            </strong>
          </div>
        ))}
      </div>
    );
  }
}
```
Với cách viết như sẽ vừa truyền được thêm biến bất kì, vừa sử dụng được `e` và tất nhiên cũng sử dụng được từ khóa `this` như `arrow function` mà ta nói trên. Nhưng như bạn thấy điều này khiến việc ta gán function này vào event sẽ phải viết khá dài dòng vì phải thêm cả đoạn `bind(this, ...)`. Với trường hợp bạn không cần truyền thêm biến thì sẽ có 2 trường hợp như sau:
- Không sử dụng từ khóa `this`: Với trường hợp này thì ta có thể viết như bình thường mà không cần `bind` gì cả:
```js
class App extends Component {
  handleLogContent(e) {
    console.log(e.target.innerHTML);
  }

  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map((item, index) => (
          <div key={item.id}>
            Task name:
            <strong onClick={this.handleLogContent}>{item.content}</strong>
          </div>
        ))}
      </div>
    );
  }
}
```
*Lưu ý: trong trường hợp function mà bạn tạo ra không cần sử dụng đến `this` thì bạn sẽ không cần phải bind nó*
Tuy nhiên trong trường hợp giả sử ta dùng từ khóa `this` như sau:
```js
class App extends Component {
  handleLogContent(e) {
      console.log(this)
      console.log(e.target.innerHTML);
  }

  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map(item => (
          <div key={item.id}>
            Task name:
            <strong onClick={this.handleLogContent}>{item.content}</strong>
          </div>
        ))}
      </div>
    );
  }
}
```
Thì ta sẽ thu được `this` là `undefined` chú không phải là 1 `App` component.
- Sử dụng `this`: Với trường hợp này thì ta sẽ phải tiến hành `bind` các function mà ta muốn sử dụng từ khóa `this` trong đó:
```js
class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogContent = this.handleLogContent.bind(this);
  }

  handleLogContent(e) {
    console.log(this)
    console.log(e.target.innerHTML);
  }

  render() {
    return (
      <div>
        <h1>TASK</h1>
        {tasks.map(item => (
          <div key={item.id}>
            Task name:{" "}
            <strong onClick={this.handleLogContent}>{item.content}</strong>
          </div>
        ))}
      </div>
    );
  }
}
```
Lúc này thì `this` sẽ đúng là `App` component của chúng ta:
```js
App {props: Object, context: Object, refs: Object, updater: Object, handleLogContent: function bound handleLogContent()…}
```
Nhưng có một lưu ý là nếu bạn muốn truyền thêm biến thì bắt buộc phải bind ở trong phần gán hàm:
```js
onClick={this.handleLogContent.bind(this, item.id)}
```
Nói chung với các cách sử dụng `bind` như trên ta hoàn toàn có thể xử lý được hết các trường hợp như sử dụng `this` trong nội dung, truyền thêm biến vào function.

### d. Khác nhau giữa arrow function và bind function

Như bạn thấy ở trên thì ngoài trường hợp muốn truyền thêm tham số vào hàm khi `render` thì chúng ta có thể tùy chọn sử dụng giữa 2 cách:
```js
class App extends React.Component {
    handleEvent = () => {
        // do something
    }
}
// hoặc
class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleEvent = this.handleEvent.bind(this)
    }

    handleEvent() {
        // do something
    }
}
```
Cả hai cách viết trên khi chạy sẽ cho ta kết quả giống nhau tuy nhiên có một sử khác biệt như sau, giả sử ta có component `Demo` và component `App` để gọi đến `Demo` như sau:
```js
import React, { Component, Fragment } from 'react';

class Demo extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('OK');
    }

    handleClickArrow = () => {
        console.log('OK');
    }

    render() {
        return (
            <h1>DemoComponent</h1>
        )
    }
}

class App extends Component {

    render() {
        console.log(Demo.prototype);

        return (
            <Demo />
        )
    }

}
```
Ở đây khi bạn nhìn vào phần `prototype` của component `Demo` phần `console.log()` sẽ thu được kết quả như sau:
```js
Component {constructor: ƒ, handleClick: ƒ, render: ƒ}
    constructor: class Demo
    handleClick: ƒ handleClick()
    isMounted: (...)
    render: ƒ render()
    replaceState: (...)
    __proto__: Object
```
Nếu bạn để ý thì sẽ thấy trong chuỗi kế thừa `prototype` của component `Demo` của chúng ta sẽ chỉ có hàm `handleClick` mà không có hàm `handleClickArrow`. Theo mình tìm hiểu trong trường hợp ta có N instance của component `Demo` và trong đó ta gọi đến hàm `handleClick` trên mỗi instance thì vì hàm này được định nghĩa trong chuỗi `prototype` nên nó sẽ được chia sẻ giữa các instance của component này. Tuy nhiên với trường hợp của `handleClickArrow` thì với mỗi instance của component `Demo` của chúng ta được tạo ra thì nó sẽ đồng thời tạo lại function này vì khi dùng `arrow function` nó sẽ được khởi  tạo như sau:
```js
class App extends React.Component {
    handleEvent = () => {
        // do something
    }
}
// Khi đi qua complie ra nó sẽ thành dạng
class App extends React.Component {
   constructor(props) {
    super(props);

    this.handleEvent = () => {
      console.log('OK');
    };
}
```
Nghĩa là nó sẽ được khởi tạo lại trong `contructor` nên sẽ giống như thuộc tính riêng của từng instance. Điều này sẽ làm ảnh hưởng đến performance của bạn trong trường hợp bạn có 1 danh sách 1000 component Demo đồng nghĩa với việc nó sẽ tạo ra 1000 hàm `handleClickArrow`. Tóm lại với `arrow function` và `bind` khi chạy lên nó sẽ là
- 1000 component Demo 
    - => 1000 `arrow function` được tạo
    - => 1 `bind` function

Tuy nhiên bạn chỉ lo sợ vấn đề performance khi mà có đến 1000 component thôi nhé còn nếu chỉ có 1,2 thì có lẽ nó sẽ không gây ra quá nhiều vấn đề. Bạn có thể tham khảo thêm ở đây https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1.

## 3. Kết bài
<hr>

Mong rằng qua bài viết của mình sẽ giúp các bạn hiểu hơn về việc định nghĩa function trong React và có thể kết hợp các cách nói trên trong công việc hằng ngày một cách hiệu quả.
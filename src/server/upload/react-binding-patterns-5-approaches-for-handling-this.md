Bài viết được dịch từ nguồn: https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56

Có ít nhất năm cách để `handle the this` trong React. Hãy xem xét từng cách khác sau.


## 1. Use React.createClass

Nếu bạn sử dụng `React.createClass`, `React` sẽ tự động hóa tất cả các chức năng này. Vì vậy, từ khóa này được tự động liên kết với `component's instance`:

```
// This magically works with React.createClass
// because `this` is bound for you.
onChange={this.handleChange}
```

Tuy nhiên, với sự ra đời của `ES6 classes`, cách tiếp cận phi tiêu chuẩn này để tạo ra các `class` không phải là tương lai của React. Trong thực tế, `createClass` có thể được trích xuất từ lõi React trong một bản phát hành trong tương lai.


## 2. Bind in Render

Phần còn lại của các phương pháp này giả sử bạn khai báo các thành phần React thông qua `ES6 classes`. Nếu bạn sử dụng một `ES6 classes`, `React` không còn tự động nhận. Một cách để giải quyết điều này là gọi `bind` trong `render`:

```
onChange={this.handleChange.bind(this)}
```

Cách tiếp cận này là rõ ràng, tuy nhiên, có ý nghĩa `performance` kể từ khi chức năng được phân bổ lại trên mỗi render. Điều này nghe có vẻ như là một vấn đề lớn, nhưng tác động `performance` của phương pháp này dường như không đáng chú ý trong hầu hết các ứng dụng. Vì vậy, quyết định này ra lúc bắt đầu vì lý do `peromance` là một cách tối ưu sớm. Điều đó nói rằng, đây là một ví dụ mà tác động `performance` của phương pháp này quan trọng.

Tóm lại, nếu bạn đang gặp phải sự cố về hiệu suất, hãy tránh sử dụng `bind` hoặc `arrow functions` trong kết xuất.


## 3. Use Arrow Function in Render

Cách tiếp cận này tương tự như cách số 2. Bạn có thể tránh thay đổi ngữ cảnh này bằng cách sử dụng `arrow functions` trong kết xuất:

```
onChange={e => this.handleChange(e)}
```


Cách tiếp cận này có tác động hiệu suất tiềm năng tương tự như cách số 2.

Các phương pháp thay thế dưới đây là đáng xem xét bởi vì họ cung cấp `performance` vượt trội.

## 4. Bind in Constructor

Một cách để tránh ràng buộc trong `render` là `bind` trong `constructor` (cách tiếp cận khác được thảo luận trong phần 5 bên dưới).

```
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
}
```

Đây là cách tiếp cận hiện được đề xuất trong tài liệu `React` cho “performance tốt hơn trong app của bạn”. Đây cũng là cách tiếp cận sử dụng trong “Ứng dụng xây dựng với React và Redux trong ES6” trên Pluralsight.

Tuy nhiên, trên hầu hết các `app`, ý nghĩa `performance` của phương pháp # 2 và # 3 sẽ không đáng chú ý, do đó, các lợi thế về khả năng đọc và bảo trì của phương pháp # 2 và # 3 có thể lớn hơn mối quan tâm về `performance` trong nhiều `app`.

Nhưng nếu bạn sẵn sàng sử dụng các `stage-2`, tùy chọn cuối cùng bên dưới có thể là cách tốt nhất của bạn.

## 5. Use Arrow Function in Class Property

Kỹ thuật này dựa vào tính năng `class property` được đề xuất. Để sử dụng phương pháp này, bạn phải bật thuộc tính chuyển đổi lớp hoặc bật `stage-2` trong `Babel`.

```
handleChange = () => {
  // call this function from render 
  // and this.whatever in here works fine.
};
```

Cách tiếp cận này có nhiều ưu điểm:

- Các `arrow functions` áp dụng sự ràng buộc này của phạm vi kèm theo (nói cách khác, chúng không thay đổi ý nghĩa của điều này), vì vậy mọi thứ chỉ hoạt động tự động.
- Nó tránh được các vấn đề về `performance` của các phương pháp # 2 và # 3.
- Nó tránh sự lặp lại trong cách số 4.
- Thật đơn giản để refactor createClass ES5 thành kiểu này bằng cách chuyển đổi các hàm có liên quan thành các `arrow functions`. Trên thực tế, có một cách hoàn toàn tự động để xử lý việc này bằng cách sử `codemod`.

## Kết luận

Sơ đồ này tóm tắt:

![](https://images.viblo.asia/84c50dbd-d240-4392-93c9-51fd6ac03761.png)

Dưới đây là ví dụ làm việc đầy đủ của tất cả 5 phương pháp tiếp cận:

```
// Approach 1: Use React.createClass
var HelloWorld = React.createClass({
  getInitialState() {
    return { message: 'Hi' };
  },

  logMessage() {
    // this magically works because React.createClass autobinds.
    console.log(this.state.message);
  },

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage} />
    );
  }
});

// Approach 2: Bind in Render
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
  }

  logMessage() {
    // This works because of the bind in render below.
    console.log(this.state.message);
  }

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage.bind(this)} />
    );
  }
}

// Approach 3: Use Arrow Function in Render
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
  }

  logMessage() {
    // This works because of the arrow function in render below.
    console.log(this.state.message);
  }

  render() {
    return (
      <input type="button" value="Log" onClick={() => this.logMessage()} />
    );
  }
}

// Approach 4: Bind in Constructor
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
    this.logMessage = this.logMessage.bind(this);
  }

  logMessage() {
    // This works because of the bind in the constructor above.
    console.log(this.state.message);
  }

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage} />
    );
  }
}

// Approach 5: Arrow Function in Class Property
class HelloWorld extends React.Component {
  // Note that state is a property,
  // so no constructor is needed in this case.
  state = {
    message: 'Hi'
  };

  logMessage = () => {
    // This works because arrow funcs adopt the this binding of the enclosing scope.
    console.log(this.state.message);
  };

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage} />
    );
  }
}
```

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.
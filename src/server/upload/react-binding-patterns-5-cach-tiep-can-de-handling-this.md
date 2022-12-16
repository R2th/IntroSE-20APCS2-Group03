Từ khóa **this** của Javascript đã làm rất nhiều developers nhầm lẫn về behavior của nó. Chắc hẳn các bạn khi mới code Javascript nói chung và React nói riêng cũng đôi lần gặp trường hợp sử dụng **this** mà nó không hoạt động hoặc bị lỗi. Trong bài viết này mình xin được chia sẻ với các bạn 5 cách để handle **this** context trong React. Và chúng ta hãy cùng xem xét chúng:
## 1. Sử dụng React.createClass
Nếu bạn sử dụng React.createClass, React sẽ binds tất cả các functions vào **this**. Vì vậy từ khóa **this** lúc này đã tự động được liên kết trong component của bạn:

```
// việc làm này kỳ diệu với React.createClass
// vì `this` đã được liên kết sẵn cho bạn.
onChange={this.handleChange}
```

Tuy nhiên với sự ra đời của ES6 thì đây không còn là cách tiếp cận chuẩn để tạo các classes trong tương lai của React. Thực tế thì createClass có thể được trích xuất từ React core trong [1 bản release](https://reactjs.org/blog/2018/10/01/create-react-app-v2.html#other-use-cases) tương lai.

## 2. Bind trong Render

Giả sử rằng bạn đang khai báo React components thông qua ES6 classes, lúc này React sẽ  không tự động bind. Và có một cách để giải quyết điều này đó là gọi bind trong render:

```
onChange={this.handleChange.bind(this)}
```

Phương pháp này có vẻ rõ ràng và ngắn gọn hơn, tuy nhiên thì lại có một số vấn đề về performance vì các function được phân bổ  lại mỗi lần render. Mới nghe giống như một vấn đề lớn, nhưng tác động performance của cách này dường như không đáng chú ý trong phần lớn các ứng dụng. Cho nên quyết định sử dụng hay không ngay từ khi bắt đầu vì lý do performance là một cách tối ưu hóa sớm. [Đây là một ví dụ về tác động performance của phương pháp này](https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f).

Tóm lại, nếu bạn đang gặp phải vấn đề về hiệu suất thì hãy tránh việc sử dụng 
bind hoặc hàm mũi tên trong render.

## 3. Sử dụng hàm mũi tên trong render
Phương pháp này tương tự với phương pháp #2. Bạn có thể tránh thay đổi **this** context bằng cách dùng một hàm mũi tên trong render:

```
onChange={e => this.handleChange(e)}
```
Rủi ro tiềm ẩn của phương pháp này cũng giống như #2.
Các phương pháp thay thế dưới đây rất đáng để cân nhắc vì chúng cải thiện hiệu suất một cách vượt trội mà không tốn nhiều cost thêm. 

## 4. Bind trong Constructor
Một cách để tránh binding trong render là bind trong hàm tạo constructor.

```
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
}
```

Phương pháp này được khuyến khích sử dụng trong React docs vì có hiệu suất tốt hơn trong ứng dụng của bạn. Tuy nhiên thì trong hầu hết các ứng dụng vấn đề hiệu suất của phương pháp #2 và #3 là không đáng kể, do đó các lợi thế về  vấn đề dễ đọc và bảo trì của chúng thường là mối quan tâm lớn hơn.

Nhưng nếu bạn sẵn sàng sử dụng các tính năng stage-2, tùy chọn cuối cùng bên dưới có thể là lựa chọn tốt nhất của bạn.

## 5. Sử dụng hàm mũi tên trong Class Property
Kỹ thuật này dựa vào tính năng thuộc tính lớp được đề xuất. Để sử dụng phương pháp này, bạn phải enable thuộc tính [transform-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) hoặc [stage-2](https://babeljs.io/docs/en/babel-preset-stage-2/) trong Babel.

```
handleChange = () => {
  // gọi hàm này từ render 
  // và this.whatever trong này đều hoạt động tốt.
};
```

Phương pháp này có nhiều ưu điểm:

1. Các hàm mũi tên áp dụng [**this** binding của phạm vi kèm theo](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md#lexical-this)(nói cách khác, chúng không thay đổi ý nghĩa của **this**), vì vậy mọi thứ chỉ hoạt động tự động.
2. Nó tránh được các vấn đề về hiệu suất của các phương pháp #2 và #3.
3. Nó tránh sự lặp lại trong cách tiếp cận #4.
4. Thật đơn giản để cấu trúc lại createClass ES5 style thành kiểu này bằng cách chuyển đổi các hàm có liên quan thành các hàm mũi tên. Trên thực tế, có một cách hoàn toàn tự động để xử lý việc này bằng cách sử dụng [codemod](https://github.com/reactjs/react-codemod#class).

## Tóm lại

Sơ đồ dưới đây tóm tắt sự quyết định:

![](https://images.viblo.asia/3b0ab993-47c7-48a2-a58a-6527f326a6a4.png)


Dưới đây là ví dụ làm việc đầy đủ của tất cả 5 phương pháp tiếp cận:

```
// Cách 1: Sử dụng React.createClass
var HelloWorld = React.createClass({
  getInitialState() {
    return { message: 'Hi' };
  },

  logMessage() {
    // React.createClass tự động bind.
    console.log(this.state.message);
  },

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage} />
    );
  }
});

// Cách 2: Bind trong Render
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
  }

  logMessage() {
    // bind trong hàm render bên dưới.
    console.log(this.state.message);
  }

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage.bind(this)} />
    );
  }
}

// Cách 3: Sử dụng hàm mũi tên trong Render
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
  }

  logMessage() {
    // hàm mũi tên trong hàm render bên dưới.
    console.log(this.state.message);
  }

  render() {
    return (
      <input type="button" value="Log" onClick={() => this.logMessage()} />
    );
  }
}

// Cách 4: Bind trong hàm tạo Constructor
class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: 'Hi' };
    this.logMessage = this.logMessage.bind(this);
  }

  logMessage() {
    // bind trong hàm tạo constructor bên trên.
    console.log(this.state.message);
  }

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage} />
    );
  }
}

// Cách 5: Hàm mũi tên trong Class Property
class HelloWorld extends React.Component {
  // Chú ý state là 1 property,
  // nên không cần hàm tạo trong trường hợp này.
  state = {
    message: 'Hi'
  };

  logMessage = () => {
    // Hàm mũi tên áp dụng this binding của phạm vi kèm theo.
    console.log(this.state.message);
  };

  render() {
    return (
      <input type="button" value="Log" onClick={this.logMessage} />
    );
  }
}
```

Vậy bạn đang ưu tiên sử dụng phương pháp nào? Và bạn còn phương pháp nào khác để handle **this** nữa không? Hãy chia sẻ chúng ở dưới comments nhé.


-----

Refer: [React binding patterns](https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56)
Chào các bạn mình quay trở với loạt bài ngâm cứu về ReactJs. Bài viết hôm nay mình giới thiệu các bạn sử dụng ReactJs khi không dùng ES6 như thế nào :grinning:.
Thông thường, bạn sẽ định nghĩa một Component React là một lớp JavaScript đơn giản:
````javascript
    class Greeting extends React.Component {
        render() {
            return <h1>Hello, {this.props.name}</h1>;
      }
    }
````
Nếu bạn chưa sử dụng ES6, bạn có thể sử dụng `create-react-class` mô-đun thay thế:
````javascript
    var createReactClass = require('create-react-class');
    var Greeting = createReactClass({
      render: function() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    });
````
API của các lớp ES6 tương tự như `createReactClass()` với một vài ngoại lệ.
# 1. Khai báo Props mặc định
Với các hàm và các lớp ES6 `defaultProps` được định nghĩa là một thuộc tính trên chính component đó:
````javascript
    class Greeting extends React.Component {
      // ...
    }

    Greeting.defaultProps = {
      name: 'Mary'
    };
````
Với `createReactClass()`, bạn cần xác định `getDefaultProps()` là một hàm trên đối tượng đã truyền:
````javascript
    var Greeting = createReactClass({
      getDefaultProps: function() {
        return {
          name: 'Mary'
        };
      },

      // ...

    });
````

# 2. Đặt trạng thái ban đầu
Trong các lớp ES6, bạn có thể xác định trạng thái ban đầu bằng cách gán `this.state` trong hàm tạo:
````javascript
    class Counter extends React.Component {
      constructor(props) {
        super(props);
        this.state = {count: props.initialCount};
      }
      // ...
    }
````
Với `createReactClass()`, bạn phải cung cấp một  phương thức `getInitialState` riêng trả về trạng thái ban đầu:
````javascript
    var Counter = createReactClass({
      getInitialState: function() {
        return {count: this.props.initialCount};
      },
      // ...
    });
````
# 3. Autobinding
Trong các Component React được khai báo là các lớp ES6, các phương thức tuân theo cùng ngữ nghĩa như các lớp ES6 thông thường. Điều này có nghĩa là họ không tự động liên kết `this `với instance. Bạn sẽ phải sử dụng rõ ràng `.bind(this) `trong hàm tạo:
````javascript
    class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

      render() {
        // Because `this.handleClick` is bound, we can use it as an event handler.
        return (
          <button onClick={this.handleClick}>
            Say hello
          </button>
        );
      }
    }
````
Với `createReactClass()`, điều này là không cần thiết bởi vì nó liên kết tất cả các phương thức:
````javascript
    var SayHello = createReactClass({
      getInitialState: function() {
        return {message: 'Hello!'};
      },

      handleClick: function() {
        alert(this.state.message);
      },

      render: function() {
        return (
          <button onClick={this.handleClick}>
            Say hello
          </button>
        );
      }
    });
````
Điều này có nghĩa là việc viết các lớp ES6 đi kèm với một mã soạn sẵn hơn một chút cho các trình xử lý sự kiện, nhưng ưu điểm là hiệu năng tốt hơn một chút trong các ứng dụng lớn.

Nếu mã soạn sẵn quá hấp dẫn đối với bạn, bạn có thể kích hoạt đề xuất cú pháp Thuộc tính lớp thử nghiệm với Babel:
````javascript
 class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // WARNING: this syntax is experimental!
  // Using an arrow here binds the method:
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
````
Xin lưu ý rằng cú pháp ở trên là thử nghiệm và cú pháp có thể thay đổi hoặc đề xuất có thể không biến nó thành ngôn ngữ.

Nếu bạn muốn nó an toàn, bạn có một vài lựa chọn:

- Các phương thức liên kết trong hàm tạo.
- Sử dụng các chức năng mũi tên, ví dụ `onClick={(e) => this.handleClick(e)}`.
- Tiếp tục sử dụng `createReactClass`.
# 4. Mixins
Đôi khi các component rất khác nhau có thể chia sẻ một số chức năng phổ biến. Chúng đôi khi được gọi là "mối quan tâm xuyên suốt" . `createReactClass` cho phép bạn sử dụng một `mixins` hệ thống kế thừa cho điều đó.

Một trường hợp sử dụng phổ biến là một component muốn tự cập nhật theo khoảng thời gian. Thật dễ dàng để sử dụng `setInterval()`, nhưng điều quan trọng là hủy bỏ khoảng thời gian của bạn khi bạn không cần nó nữa để tiết kiệm bộ nhớ. React cung cấp các phương thức vòng đời cho bạn biết khi nào một thành phần sắp được tạo hoặc hủy. Hãy tạo một `mixin `đơn giản sử dụng các phương thức này để cung cấp một chức năng `setInterval() ` dễ dàng sẽ tự động được dọn sạch khi component của bạn bị phá hủy.
````javascript
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
````
Nếu một component đang sử dụng nhiều `mixin` và một số `mixin` xác định cùng một phương thức vòng đời (nghĩa là một số `mixin` muốn thực hiện một số dọn dẹp khi thành phần bị phá hủy), tất cả các phương thức vòng đời được đảm bảo được gọi. Các phương thức được xác định trên mixin chạy theo thứ tự `mixin` đã được liệt kê, theo sau là một lệnh gọi phương thức trên component.
# 5. Kết luận
Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về ES6 trong ReactJs. Cảm ơn các bạn đã theo dõi. Trong bài viết có tham khảo tại https://reactjs.org/docs/react-without-es6.html.
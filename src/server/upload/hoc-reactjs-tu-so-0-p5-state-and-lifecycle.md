Hi All.
Chào các bạn hôm nay chúng ta sẽ đi tiếp về ReactJS nhé.
Ở các bài trước chúng ta đã tìm hiểu về Props và render() của Component rồi, thì hôm nay chúng ta sẽ cùng tìm hiểu thêm về State nhé.

# State
Trước khi vào tìm hiểu State thì chúng ta cùng nhắc lại một chút về Props.

 - Với một Component thì khi Props thay đổi thì sẽ raise sự kiện render() để update UI 

Chúng ta cùng xem một ví dụ từ trang chủ Reactjs.org nhé.
Đây là ví dụ đầu tiên về Render().
 - Chúng ta sẽ khai báo 1 element và sử dụng Interval để update Element
 - Khi Element thay đôi thì sẽ raise Render() method để update lại UI
 
```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```


Rồi giờ chúng ta sẽ tiến hành update một tí theo hướng Component và sử dụng Props:
- Thay vì khai báo Clock là một Element chúng ta sẽ tách nó làm một Component với mục đích có thể sử dụng nó ở một nơi khác


```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

Ok Clock bây giờ đã là một Component nhưng các bạn có thể thấy Clock Component vẫn phải phụ thuộc vào function Tick() để update data.

với 2 cách trên thì app của chúng ta vẫn hoạt động bình thường nhưng mục tiêu đề ra là Clock Component sẽ hoạt động độc lập và tự update chính nó và để làm được điều đó chúng ta sẽ sử dụng **State**.

## Adding Local State to a Class

### Converting a Function to a Class
Trước khi bắt đầu chúng ta sẽ convert function Clock sang Class nhé:
```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
```

> 1. Create an ES6 class, with the same name, that extends React.Component..
> 
>  2. Add a single empty method to it called render().
>  
> 3. Move the body of the function into the render() method.
> 
> 4. Replace props with this.props in the render() body.
> 
> 5. Delete the remaining empty function declaration.
> 

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Clock bây giờ đã được định nghĩa như 1 class và nó sẽ tiến hành update UI khi có sự thay đổi về props.

### Adding Local State to a Class
Chúng ta sẽ bắt đầu sử dụng State thay cho Props ở đây
> 1. Replace this.props.date with this.state.date in the render() method.
> 
```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

>  2. Add a class constructor that assigns the initial this.state.
>  

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

> 3. Remove the date prop from the <Clock /> element.
> 
```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
Kết quả như sau:
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Có vẻ như xong rồi nhỉ, nhưng có gì đó sai sai, Clock chỉ update khi F5. vậy chúng ta đang thiếu điều gì:
1. Khi Component Clock được khơi tạo, State cũng được khởi tạo với value = curent time
2. Khi Render() được chạy thì sẽ render thời gian khi State được tạo

Như vậy để update Clock chúng ta cần phải thực hiện refresh lại page để update State, nhưng như vậy có vẻ sai nhỉ.

### Adding Lifecycle Methods to a Class
Trong ứng dụng React thì việc giải phóng resource sau khi component bị destroy là rất quan trọng, nếu chúng ta làm không tốt thì sẽ dẫn tới app có performance thấp do phải lưu trữ những data rác.

Như trong ví dụ về Clock thì mục tiêu của chúng ta là gì:
 - Khởi tạo interval khi vào Clock Component
 - Clear Interval khi chúng ta rời khỏi Clock Component.

Và để làm điều đó thì React có định nghĩa các method đặc biệt gọi là "lifecycle methods”.

Trong ví dụ này chúng ta sẽ sử dụng 2  "lifecycle methods” đó là **componentDidMount()** và **componentWillUnmount()**

- componentDidMount(): đây là method sẽ chạy sau khi Component render lầu đầu tiên. Khi method này được tạo thì có nghĩa là DOM đã sẵn sàng, là nơi thích hợp để chúng ta làm các việc như: gọi API để load data, connect với third party,...
- componentWillUnmount(): đây là method sẽ chạy sau cùng, trước khi toàn bộ Component bị destroy, đây là nơi thích hợp để chúng ta thực hiện clear và giải phóng resource

Trong ví dụ của chúng ta thì:
- componentDidMount(): đây là nơi chúng ta khởi tạo Timer
- componentWillUnmount(): đây là nơi chúng ta clear Timer

```
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

```
componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

> Với React chúng ta có thể khởi tạo 1 biến và set giá trị cho nó bằng cách sử dụng từ khóa **this**, example: **this.Timer**
> 

Và cuối cùng để update State chúng ta sẽ dụng function **this.setState()**

```
tick() {
    this.setState({
      date: new Date()
    });
  }
```

Full Code

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
[Try it on CodePen](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Component chúng ta sẽ hoạt động như sau
1. Component khởi tạo và khởi tạo luôn State với date = current time
2. Sau khi Compnent khởi tạo với giá trị state được khởi tạo thì **componentDidMount** sẽ chạy và khởi tạo interval và gán nó cho **this.Timer**
3. Sau khi interval chạy thì sẽ update **State** mỗi giây bằng method **this.setState()**
4. State thay đổi sẽ raise sự kiện change và render sẽ update UI mới nhất.
6. Trước khi chúng ta rời khởi page thì function **componentWillUnmount()** sẽ chạy và clear interval

# Using State Correctly
### Do Not Modify State Directly
 - Không update trực tiếp State mà phải thông qua function this.setState()

```
// Wrong
this.state.comment = 'Hello';
```

```
// Correct
this.setState({comment: 'Hello'});
```

### State Updates May Be Asynchronous
```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Vì this.props và this.state có thể được cập nhật không đồng bộ, bạn không nên dựa vào các giá trị của chúng để tính toán trạng thái tiếp theo.

NÊn sử dụng như sau:
```
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Với cách này thì **this.setState()** sẽ nhận về state với giá trị trước khi thay đổi.

### State Updates are Merged
Khi gọi function setState(), React sẽ merges object bạn cung cấp vào state.
Examples:
```
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Như ví dụ trên thì setState sẽ mergers 2 object vào 2 key mà bạn cung cấp.
Nhưng với ví dụ sau thì sẽ khác

```
this.setState({comments})
```
Với ví dụ trên thì setState sẽ xóa key Post và giữ lại key Comment.
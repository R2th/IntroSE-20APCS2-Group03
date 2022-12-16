Trong bài học mình sẽ hướng dẫn bạn "Làm sao để sử dụng Event (sự kiện) trong ReactJS". Cũng không có nhiều khác biệt khi bạn sử dụng các event trong ReactJS so với sử dụng các event trong Javascript.

* 1. Trong Javascript bạn sẽ xử lý sự kiện trong một hàm, còn trong React bạn sẽ xử lý sự kiện trong một phương thức của Component.

## ReactJS Events
React là một thư viện dựa trên Javascript, về cơ bản không có nhiều khác biệt trong cách xử lý sự kiện giữa ReactJS và Javascript. Với Javascript, khi sự kiện xẩy ra một hàm sẽ được gọi để thực thi. Nhưng với React, khi sự kiện xẩy ra, sẽ có một phương thức của Component được gọi.

OK, trước hết hãy xem một ví dụ đơn giản:

File `onClick-example.jsx`
```ruby
class CurrentTime extends React.Component {
  constructor(props) {
    super(props);
 
    var now = new Date();
    this.state = {
      currentTime: now.toString()
    };
  }
 
  // A method of CurrentTime component
  refreshCurrentTime() {
    var now = new Date();
    this.setState({ currentTime: now.toString() });
  }
  render() {
    return (
      <div>
        <h4>Current Time:</h4>
        <p>{this.state.currentTime}</p>
        <button onClick={() => this.refreshCurrentTime()}>
          Refresh Current Time
        </button>
      </div>
    );
  }
}
 
// Render
ReactDOM.render(<CurrentTime />, document.getElementById("currenttime1"));
```
File `onClick-example.html`
```ruby
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <title>ReactJS Event</title>
      <script src="https://unpkg.com/react@16.4.2/umd/react.production.min.js"></script>
      <script src="https://unpkg.com/react-dom@16.4.2/umd/react-dom.production.min.js"></script>
      <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
      <style>
         #currenttime1 {
         border:1px solid blue;
         padding: 5px;
         margin-top: 20px;
         }
      </style>
   </head>
   <body>
      <h3>ReactJS Event: onClick</h3>
 
      <div id="currenttime1"></div>
 
      <script src="onClick-example.jsx" type="text/babel"></script>
 
   </body>
</html>
```
Kết quả:
![](https://images.viblo.asia/a4458e0f-3f67-4ff4-89bd-54d848776ed2.gif)

## Arrow Function

Với cú pháp **Javascript ES6** bạn có thể tạo một **arrow function** (Hàm mũi tên), rất ngắn gọn và dễ hiểu:
```ruby
// Normal function with parameters
var myfunc = function(param1, param2)  {
   // Statements
};
 
// Arrow function with parameters.
var arrfunc = (param1, param2) => {
   // Statements
};
 
 
// Normal function without paramters.
var myfunc2 = function( )  {
   // Statements
};
 
// Arrow function without parameters.
var arrfunc2 = ( ) => {
   // Statements
};
 
// If function have only one statement.
var arrfunc2 = ( ) => singleStatement;

```

**onClick**, **onChange**,..

**onClick** phải gọi đến một hàm **Javascript**, nó không thể gọi trực tiếp đến một phương thức của **Component**. Vì vậy **onClick** nên gọi đến một hàm nặc danh (anonymous), và bên trong hàm nặc danh này bạn có thể gọi đến phương thức của **Component**:

![](https://images.viblo.asia/2baed790-022a-497b-95dc-8f87e60fb1c6.png)

**Arrow function** với tham số **event**:

```ruby
// A method of Component with event parameter.
refreshCurrentTime(event) {
  var now = new Date();
  this.setState({ currentTime: now.toString() });
}
 
render() {
  return (
    <div>
      <h4>Current Time:</h4>
      <p>{this.state.currentTime}</p>
      <button onClick={(event) => this.refreshCurrentTime(event)}>
          Refresh Current Time
      </button>
    </div>
  );
}
```

Với **Javascript ES6** bạn cũng có thể gọi đến phương thức của **Component** theo cách sau:

File `onClick-example3.jsx`
```ruby
// A method of this Component.
refreshCurrentTime(event) {
  var now = new Date();
  this.setState({ currentTime: now.toString() });
}
 
render() {
  return (
    <div>
      <h4>Current Time:</h4>
      <p>{this.state.currentTime}</p>
      <button onClick={this.refreshCurrentTime.bind(this,event)}>
         Refresh Current Time
      </button>
    </div>
  );
}
```

Hoặc:
```ruby
class CurrentTime extends React.Component {
  constructor(props) {
    super(props);
 
    var now = new Date();
    this.state = {
      currentTime: now.toString()
    };
 
    // (***)
    this.refreshCurrentTime = this.refreshCurrentTime.bind(this);
  }
 
  // A method of this Component
  refreshCurrentTime( ) {
    var now = new Date();
    this.setState({ currentTime: now.toString() });
  }
  render() {
    return (
      <div>
        <h4>Current Time:</h4>
        <p>{this.state.currentTime}</p>
        <button onClick={this.refreshCurrentTime}>
          Refresh Current Time
        </button>
      </div>
    );
  }
}
 
// Render
ReactDOM.render(<CurrentTime />, document.getElementById("currenttime1"));
```

**Cảm ơn các bạn đã đọc! (bow)**
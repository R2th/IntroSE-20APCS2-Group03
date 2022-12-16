# ReactJS Component API
ReactJS trải qua một quá trình phát triển, ban đầu các **Component** được viết dựa trên cú pháp **Javascript cũ**. Cho đến phiên bản **0.14 ReactJS** chuyển sang sử dụng Javascript theo tiêu chuẩn **ES6**. Có nhiều **Component API cũ** đã không được chấp nhận (deprecated) hoặc bị loại bỏ để phù hợp với tiêu chuẩn mới. Trong bài này mình chỉ giới thiệu các **Component API** hữu ích và phù hợp với **Javascript ES6**.
            
1. **setState()**
2. **forceUpdate**
3. **ReactDOM.findDOMNode()**

## 1. setState()
Phương thức setState() được sử dụng để cập nhập trạng thái của Component, đồng thời nó nói với React rằng hãy re-render (vẽ lại) Component trên giao diện theo các thay đổi của trạng thái.
> Cách sử dụng của phương thức setState() được mình đề cập chi tiết trong bài viết dưới đây
> 
> [https://viblo.asia/p/bat-dau-voi-reactjs-p1-4P856vJL5Y3](https://viblo.asia/p/bat-dau-voi-reactjs-p1-4P856vJL5Y3)

## 2. forceUpdate()
Thỉnh thoảng bạn muốn cập nhập lại Component một cách thủ công, điều này có thể đạt được bằng cách sử dụng phương thức forceUpdate(). Đây là một phương thức của lớp React.Component, vì vậy các lớp con của React.Component sẽ được thừa kế phương thức này.

Example:

Trong file `forceUpdate-example.jsx`
```ruby
class Random extends React.Component {
  constructor(props) {
    super(props);
  }
 
  newRandomValue(event) {
    this.forceUpdate();
  }
 
  render() {
    return (
      <div>
        <button onClick={event => this.newRandomValue(event)}>Random</button>
        <div>Random Value: {Math.random()}</div>
      </div>
    );
  }
}
 
// Render
ReactDOM.render(<Random />, document.getElementById("random1"));
```


File `forceUpdate-example.html`
```ruby
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
 
      <title>ReactJS forceUpdate()</title>
      <script src="https://unpkg.com/react@16.4.2/umd/react.production.min.js"></script>
      <script src="https://unpkg.com/react-dom@16.4.2/umd/react-dom.production.min.js"></script>
      <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
      <style>
         .search-box {
           border:1px solid #cbbfab;
           padding: 5px;
         }
      </style>
   </head>
   <body>
      <h1>forceUpdate() example:</h1>
 
      <div id="random1"></div>
 
      <script src="forceUpdate-example.jsx" type="text/babel"></script>
 
   </body>
</html>
```

Kết quả:

![](https://images.viblo.asia/d70d9977-a690-4cf4-a0a7-6e583aaa77e5.PNG)

## 3. ReactDOM.findDOMNode()
Như bạn đã biết, một Component là một lớp, khi Component được render trên giao diện bạn sẽ có được một mô hình DOM. Như vậy Component và DOM là 2 khái niệm khác nhau. Vậy làm thế nào để bạn có thể truy cập vào các Node của DOM từ trong Component (class)?

ReactDOM cung cấp cho bạn phương thức ReactDOM.findDOMNode(param) để tìm đối tượng Node tương ứng với tham số của phương thức.

ReactDOM.findDOMNode(this)

Bên trong Component (class) nếu bạn gọi phương thức ReactDOM.findDOMNode(this), nó sẽ trả về cho bạn nút gốc ( Root Node) của mô hình DOM.

Example:

File `findDOMNode-example.jsx`

```ruby
class Fruits extends React.Component {
  
  doFind()  {
     // Find root Node of this Component
     var node = ReactDOM.findDOMNode(this);
     node.style.border = "1px solid red";
  }
  render() {
    return (
      <ul>
          <li>Apple</li>
          <li>Apricot</li>
          <li>Banana</li>
          <li>
            <button onClick={() => this.doFind()}>Find Root Node</button>
          </li>
      </ul>
    );
  }
}
 
// Render
ReactDOM.render(<Fruits />, document.getElementById("fruits1"));
```

File `findDOMNode-example.html`

```ruby
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
 
      <title>ReactJS findDOMNode()</title>
      <script src="https://unpkg.com/react@16.4.2/umd/react.production.min.js"></script>
      <script src="https://unpkg.com/react-dom@16.4.2/umd/react-dom.production.min.js"></script>
      <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
      <style>
         #fruits1 {
           border:1px solid blue;
           padding: 5px;
           margin-top: 20px;
         }
      </style>
   </head>
   <body>
      <h3>Example: findDOMNode(this)</h3>
      <a href="">Reset</a>
 
      <div id="fruits1"></div>
 
      <script src="findDOMNode-example.jsx" type="text/babel"></script>
 
   </body>
</html>
```

Kết quả:

![](https://images.viblo.asia/58e0c27c-29c0-43ab-98d9-36a451041ba2.PNG)
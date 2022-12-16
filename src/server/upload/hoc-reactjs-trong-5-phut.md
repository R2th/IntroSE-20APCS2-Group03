Bài viết này sẽ cung cấp cho bạn một số hiểu biết cơ bản về React.js thông qua việc xây dựng một ứng đụng đơn giản. Chúng ta sẽ chỉ tìm hiểu nhưng thứ cốt lõi trong bài viết này.

**1. Setup:**

Khi bắt đầu với React, bạn nên sử dụng cài đặt đơn giản: một file HTML import thư viện React và ReactDOM bằng cách sử dụng các thẻ script, như sau:

```
<html>
<head>
<script src="https://unpkg.com/react@15/dist/react.min.js"> </script><script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js">
</script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
    
    /* 
    ADD REACT CODE HERE 
    */
    
    </script>
</body>
</html>
```

Ở trên cũng đã import Babel, vì React sử dụng vài thứ được gọi là JSX để viết markup. Chungsta sẽ cần thay đổi JSX này thành JavaScript,  đơn giản để trình duyệt có thể hiểu nó.

Có hai điều cần chú ý:

- Thẻ `<div>` với id là `#root`.  Đây là entry point cho ứng dụng của chúng tôi. Đây là nơi toàn bộ ứng dụng của chúng tôi sẽ hoạt động.

- Thẻ `<script type="text/babel">` trong body. Đây là chỗ chúng ta sẽ viết code React.js.

**2. Components**

Mọi thứ trong React là một component, và chúng thường có dạng các class JavaScript. Chúng ta tạo một component bằng cách mở rộng trên class React-Component. Hãy tạo một component có tên là Hello.

```
class Hello extends React.Component {
    render() {
        return <h1>Hello my friend!</h1>;
    }
}
```

Sau đó bạn định nghĩa các methods cho component. Trong ví dụ của chúng ta, chỉ có một method và được gọi là render ().

Trong hàm `render()` sẽ trả về những gì mà bạn muốn hiển thị trên trang. Trong trường hợp trên, chúng ta muốn nó hiển thị một thẻ `h1` với  text `Hello my friend!`

Để ứng dụng của chúng ta hiển thị trên màn hình, chúng tôi cần phải sử dụng ReactDOM.render():

```
ReactDOM.render(
    <Hello />, 
    document.getElementById("root")
);
```

Đây là cách để gọi component `Hello` trong app. Kết quả sẽ như sau:

![](https://images.viblo.asia/dc07c6d6-ffca-4816-b34a-12853b774679.png)

Lý do chúng ta đang viết `{this.props.message}` trong dấu ngoặc nhọn {} là vì cần để JSX biết chúng ta muốn thêm một biểu thức JavaScript. Điều này đc gọi là escaping.

Vì vậy, bây giờ chúng tôi có một component có khả năng tái sử dụng mà có thể hiển thị bất kỳ thông điệp nào chúng ta muốn trên trang. 

Tuy nhiên, nếu chúng ta muốn component có thể thay đổi dữ liệu của riêng nó thì sao? Sau đó, chúng ta phải sử dụng state thay vào đó!

**3. State**

Cách lưu trữ dữ liệu khác trong React là state của component. Và không giống như props thì không thể thay đổi trực tiếp bởi component - còn state thì có thể.

Vì vậy, nếu bạn muốn dữ liệu trong ứng dụng của mình thay đổi - ví dụ dựa trên tương tác của người dùng - dữ liệu phải được lưu trữ trong state của  thành phần ở đâu đó trong ứng dụng.

**- Khởi tạo state:**

Khởi tạo state sử dụng cú pháp: `this.state` trong method `constructor()` của class. state là một object mà ở đây chúng ta có một key là `message`:

```
class Hello extends React.Component {
    
    constructor(){
        super();
        this.state = {
            message: "my friend (from state)!"
        };
    }
    
    render() {
        return <h1>Hello {this.state.message}!</h1>;
    }
}
```

Trước khi chúng ta thiết lập state, chúng ta phải gọi `super()` trong constructor. Bởi vì `this` không được khởi tạo trước `supper()` được gọi.
    
**- Thay đổi state:**

Để thay đổi state, đơn giản gọi **this.setState()**,  truyền vào đối tượng state mới như một tham số. Chúng ta sẽ thực hiện nó trong method mà chúng ta gọi là `updateMessage`

```
class Hello extends React.Component {
    
    constructor(){
        super();
        this.state = {
            message: "my friend (from state)!"
        };
        this.updateMessage = this.updateMessage.bind(this);
   }
    updateMessage() {
        this.setState({
            message: "my friend (from changed state)!"
        });
    }    
    render() {
        return <h1>Hello {this.state.message}!</h1>;
    }
}
```

    Note: Để làm việc này, chúng ta phải bind từ khóa `this` vào method `updateMessage`.  Ngoài ra chúng ta không thể truy cập `this` trong method.
    
Bước tiếp theo tạo button để click, để có thể kích hoạt method `updateMessage()`

Hãy add một button vào method render():

```
render() {
  return (
     <div>
       <h1>Hello {this.state.message}!</h1>
       <button onClick={this.updateMessage}>Click me!</button>
     </div>   
  )
}
```

Ở đây, chúng tôi đang gắn một trình xử lý sự kiện vào button, lắng nghe sự kiện onClick. Khi điều này được kích hoạt, chúng ta gọi method `updateMessage`.

Đây là toàn bộ component:

```
class Hello extends React.Component {
    
    constructor(){
        super();
        this.state = {
            message: "my friend (from state)!"
        };
        this.updateMessage = this.updateMessage.bind(this);
    }
    updateMessage() {
        this.setState({
            message: "my friend (from changed state)!"
        });
    }
    render() {
         return (
           <div>
             <h1>Hello {this.state.message}!</h1>
             <button onClick={this.updateMessage}>Click me!</button>
           </div>   
        )
    }
}
```

Method **updateMessage** sau đó gọi **this.setState()** mà thay đổi giá trị `this.state.message`. Và khi chúng ta click vào button, mọi thứ sẽ như sau:


![](https://images.viblo.asia/b39e7235-778b-41fb-ba17-abbea4f3705e.png)


Trên đây là một số kiến thức cơ bản về Reactjs. Cảm ơn bạn đã theo dõi bài viết!

Tham khảo:

https://medium.freecodecamp.org/learn-react-js-in-5-minutes-526472d292f4
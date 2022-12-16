![](https://images.viblo.asia/da226ac1-bf54-496d-9547-d1506ebe9695.png)

Bài viết này sẽ đưa ra cái nhìn khách quan về ReactJS thông qua việc xây dựng một ứng dụng rất rất 'simple'. 

Bắt đầu nào. GOGO (go)!!

### 1. Chuẩn bị nào !!
Khi mà bạn bắt đầu làm việc với ReactJS, bạn nên sử dụng những cài đặt đơn giản nhất có thể: 

File HTML phải import thư viện `React` và `ReactDOM` sử dụng thông qua thẻ `script`, như: 

```
<html>
<head>
<script src="https://unpkg.com/react@15/dist/react.min.js"> </script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
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

Chúng ta thực sự cần import `Babel`, như `React` sử dụng vài thứ gọi `JSX` để viết `markup`. Chúng ta sẽ cần chuyển đổi `JSX` này thành `JavaScript` để trình duyệt có thể hiểu được

Sẽ có hơn 2 điều bạn cần phải chú ý: 

1. Thẻ `<div>` có id là `#root` sẽ là nơi mà chương trình của bạn bắt đầu chạy
2. Thẻ `<script type="text/babel">` trong `body` sẽ là nơi viết code `ReactJS`

### 2. Component

**Tất cả mọi thứ trong React đều là `component`**. Bạn cần tạo các `component` bằng việc kế thừa `React-Component`. Giờ hãy tạo component `Hello` nào: 

```
class Hello extends React.Component {
    render() {
        return <h1>Hello world!</h1>;
    }
}
```

Sau đó, bạn sẽ định nghĩa các phương thức cho component. Trong ví dụ trên, chúng ta chỉ có một phương thức là `render()`

Bên trong `render()` bạn sẽ đưa ra các miêu tả mà bạn muốn React vẽ lên trên trang của bạn. Trong trường hợp trên, `Hello world` trong thẻ `<h1>` sẽ được hiển thị. Đơn giản phải không nào =))

Để chương trình chạy được, chúng ta sử dụng `ReactDOM.render()`:

```
ReactDOM.render(
    <Hello />, 
    document.getElementById("root")
);
```


`<Hello />` sẽ gọi đến phương thức `Hello` mà chúng ta đã định nghĩa ở trên. Kết quả thôi: 

![](https://images.viblo.asia/62476249-1d49-402d-b151-acc6f9b64292.png)

### 3. Xử lý dữ liệu

Có 2 loại dữ liệu trong React là `props` và `state`. 

Điểm khác biệt chính là `state` là `private` nghĩa là chỉ có thể được thay đổi bởi các component bên trong nó. `Props` là `public`, và không bị điều khiển bởi các component bên trong.

**Các component có thể thay đổi trạng thái (state) nội bộ bên trong nó một cách trực tiếp, nhưng lại không thể thay đổi thuộc tính (props) trực tiếp được**

Nào cùng làm ví dụ để phân biệt nào, mệt quá (dead)

### 4. Props

Phần lớn các thành phần của React đều có thể tái sử dụng, nghĩa là viết một lần, mà có thể được sử dụng lại ở các case khác nhau, ví dụ như là hiển thị ra các message khác nhau dựa trên ví dụ `Hello` ở bên trên.

Để có thể tái sử dụng lại code, chúng ta sẽ thêm vào `props`:

```
ReactDOM.render(
    <Hello message="my friend" />, 
    document.getElementById("root")
);
```

`props` sẽ gọi phương thức `message` và sẽ nhận giá trị `my friend`. Chúng ta có thể đặt `props` vào trong phương thức `Hello` bằng cú pháp `this.props.message`: 

```
class Hello extends React.Component {
    render() {
        return <h1>Hello {this.props.message}!</h1>;
    }
}
```

Kết quả thôi: 

![](https://images.viblo.asia/1c4931c4-0472-4249-bbf2-f7cda63ad380.png)

Lý do chúng ta viết `{this.props.message}` với ngoặc nhọn bởi vì chúng ta cần nói cho `JSX` rằng chúng ta muốn thêm cú pháp JavaScript vào. Nó được gọi là **`escape`**

Bây giờ, bạn có thể tái sử dụng lại component, có thể render bất kỳ message nào mà bạn muốn trên web của bạn. (yeah3)

Tuy nhiên, nếu bạn muốn component chỉ thay đổi riêng dữ liệu của nó thôi, lúc này bạn phải thay thế bằng `state`.


### 5. State

Có một cách khác để lưu trữ dữ liêu trong React đó là trong `component's state`. Không giống như `props`, bạn không cần thay đổi trực tiếp component - `state` sẽ làm nó thay bạn.

Nếu bạn muốn dữ liệu trong app được thay đổi - ví dụ như dựa trên tương tác của người dùng - nó nên được lưu trữ trong trạng thái (`state`) của các component.

#### Khởi tạo state 

Cách đơn giản để khởi tạo `state` là khai báo trong `constructor()`. State là một đối tượng mà trong mỗi case sẽ chỉ có một key, trường hợp này là `message`

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

Trước khi set state, chúng ta có gọi phương thức `super()` trong `constructor` - bởi vì `this` sẽ không được gọi trước `super()`.

#### Thay đổi state 

Đối với thay đổi state, chúng ta sử dụng `this.setState()`, bằng cách truyền vào đối tượng trạng thái mới như đối số (argument). Chúng ta sẽ xây dựng `updateMessage` là đặt bên trong `constructor()`.

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

* Chú ý: Để app chạy được state, chúng ta phải sử dụng `bind` cho từ khóa `this` trong hàm `updateMessage`, nếu không chúng ta sẽ không thể truy cập được `this` trong phương thức.

Bước tiếp theo là chúng ta cần gán sự kiện click cho một button, bên trong sẽ có sự kiện `updateMessage()`.

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

Mỗi khi nút được click, chúng ta sẽ gọi đến phương thức **updateMessage** 

Cuối cúng, toàn bộ app của chúng ta sẽ như sau: 

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

Phương thức **updateMessage** sau khi gọi **this.setState()** sẽ thay đổi giá trị của `this.state.message`. Và sau khi chúng ta click: 

![](https://images.viblo.asia/78781f4f-1afd-4fbd-81c9-95b609138932.png)

Rất đơn giản phải không, vậy là chúng ta đã có cái nhìn khái quát cũng với các thành phần chính của ReactJS rồi.

Cảm ơn mọi người đã theo dõi

Tài liệu tham khảo: https://medium.freecodecamp.org/learn-react-js-in-5-minutes-526472d292f4
Hướng dẫn này sẽ cung cấp cho bạn một sự hiểu biết cơ bản về React.js thông qua việc xây dựng một ứng dụng rất đơn giản. Tôi sẽ bỏ qua mọi thứ mà tôi nghĩ không phải là cốt lõi.

**Thiết lập**

Khi bắt đầu với React, bạn nên sử dụng thiết lập đơn giản nhất có thể: một tệp HTML import các thư viện React và ReactDOM bằng cách sử dụng các thẻ script, như sau:

```
<html>
<head>
<script src = "https://unpkg.com/react@15/dist/react.min.js"> </ script> <script src = "https://unpkg.com/react-dom@15/dist /react-dom.min.js ">
</ script>
<script src = "https://unpkg.com/babel-standalone@6.15.0/babel.min.js"> </ script>
</ head>
<body>
    <div id = "root"> </ div>
    <script type = "text / babel">
    
    / *
    THÊM MÃ REACT TẠI ĐÂY
    * /
    
    </ script>
</ body>
</ html>
```

Chúng tôi cũng đã import Babel, vì React sử dụng  JSX để viết đánh dấu. Chúng tôi sẽ cần phải biến JSX này thành JavaScript đơn giản để trình duyệt có thể hiểu nó.

Có hai điều tôi muốn bạn chú ý:

* <Div> với id của #root. Đây là điểm vào cho ứng dụng của chúng tôi. Đây là nơi toàn bộ ứng dụng của chúng tôi sẽ hoạt động.
* Thẻ <script type = "text / babel"> trong phần thân. Đây là nơi chúng tôi sẽ viết mã React.js của chúng tôi.

**Các thành phần**

Mọi thứ trong React là một thành phần, và chúng thường có dạng các lớp JavaScript. Bạn tạo một thành phần bằng cách mở rộng trên lớp React-Component. Hãy tạo một thành phần có tên là Hello.

```
class Hello extends React.Component {
    render() {
        return <h1>Hello world!</h1>;
    }
}
```

Sau đó bạn xác định các phương thức cho thành phần. Trong ví dụ của chúng tôi, chúng tôi chỉ có một phương thức và được gọi là render ().

Bên trong render () bạn sẽ trả về một mô tả về những gì bạn muốn React vẽ trên trang. Trong trường hợp trên, chúng tôi chỉ muốn hiển thị thẻ h1 với văn bản Hello world! bên trong nó.

Để ứng dụng nhỏ xíu của chúng ta hiển thị trên màn hình, chúng ta cũng phải sử dụng

```
ReactDOM.render():

ReactDOM.render(
    <Hello />, 
    document.getElementById("root")
);
```

Vì vậy, đây là nơi chúng tôi kết nối thành phần Hello của chúng tôi với điểm vào cho ứng dụng (<div id = "root"> </ div>). Nó kết quả như sau:

![](https://images.viblo.asia/e19e1cda-9060-475a-8dfc-d0e0da2217d0.png)


Cú pháp HTML mà chúng ta vừa xem (<h1> và <Hello />) là mã JSX mà tôi đã đề cập trước đó. Nó không thực sự là HTML, mặc dù những gì bạn viết ở đó sẽ kết thúc dưới dạng các thẻ HTML trong DOM.

Bước tiếp theo là để ứng dụng của chúng tôi xử lý dữ liệu.

**Xử lý dữ liệu**

Có hai loại dữ liệu trong React: props và state. Sự khác biệt giữa hai là một chút khó hiểu trong đầu, do đó, đừng lo lắng nếu bạn thấy nó hơi khó hiểu. Nó sẽ trở nên dễ dàng hơn khi bạn bắt đầu làm việc với họ.

Điểm khác biệt chính là state thì private  và có thể được thay đổi từ bên trong chính thành phần đó. Props ở bên ngoài và không được kiểm soát bởi chính thành phần đó. Nó được truyền từ các thành phần lên cấp bậc cao hơn, người cũng kiểm soát dữ liệu.

Một thành phần có thể thay đổi state của nó một cách trực tiếp. Nó không thể thay đổi props của nó trực tiếp.

Chúng ta hãy xem xét kỹ hơn props đầu tiên.


**Props**


Thành phần Hello của chúng ta rất tĩnh, và nó cho ra cùng một thông điệp bất kể. Một phần lớn của React là khả năng sử dụng lại, nghĩa là khả năng viết một thành phần một lần, và sau đó sử dụng lại nó trong các trường hợp sử dụng khác nhau - ví dụ, để hiển thị các thông điệp khác nhau.

Để đạt được loại khả năng sử dụng lại này, chúng tôi sẽ thêm Props. Đây là cách bạn truyềnProps cho một thành phần (được in đậm):

```
ReactDOM.render(
    <Hello message="my friend" />, 
    document.getElementById("root")
);
```

Prop này được gọi là tin nhắn và có giá trị my friend". Chúng ta có thể truy cập prop này bên trong thành phần Hello bằng cách tham chiếu this.props.message, như sau:

```
class Hello extends React.Component {
    render() {
        return <h1>Hello {this.props.message}!</h1>;
    }
}
```

Kết quả là, điều này được hiển thị trên màn hình:
![](https://images.viblo.asia/484fd206-1c2a-400a-beab-48fe0920e8c9.png)


Lý do chúng ta viết {this.props.message} với các dấu ngoặc nhọn là vì chúng ta cần nói với JSX rằng chúng ta muốn thêm một biểu thức JavaScript. Điều này được gọi là escaping.

Vì vậy, bây giờ chúng tôi có một thành phần tái sử dụng có thể hiển thị bất kỳ thông điệp nào chúng tôi muốn trên trang. Woohoo!

Tuy nhiên, nếu chúng ta muốn thành phần có thể thay đổi dữ liệu của riêng nó thì sao? Sau đó, chúng ta phải sử dụng state thay vào đó!

**State**

Cách lưu trữ dữ liệu khác trong React là state của thành phần. Và không giống như props - không thể thay đổi trực tiếp bởi thành phần - state có thể.

Vì vậy, nếu bạn muốn dữ liệu trong ứng dụng của mình thay đổi - ví dụ dựa trên tương tác của người dùng - dữ liệu phải được lưu trữ trong statecủa thành phần ở đâu đó trong ứng dụng.

**State khởi tạo**

Để khởi tạo state, chỉ cần đặt this.state trong phương thức constructor () của lớp. Trạng thái của chúng ta là một đối tượng mà trong trường hợp của chúng ta chỉ có một khóa gọi là thông điệp.

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

Trước khi chúng ta thiết lập state, chúng ta phải gọi super () trong hàm khởi tạo. Điều này là bởi vì điều này là uninitialized trước khi super () đã được gọi.

**Thay đổi state**

Để sửa đổi state, chỉ cần gọi this.setState (), truyền vào đối tượng state mới làm đối số. Chúng ta sẽ làm điều này bên trong một phương thức mà chúng ta sẽ gọi là updateMessage.

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

Lưu ý: Để thực hiện công việc này, chúng tôi cũng phải liên kết từ khóa này với phương thức updateMessage. Nếu không, chúng tôi không thể truy cập vào phương thức này.
Bước tiếp theo là tạo một nút để kích, để chúng ta có thể kích hoạt phương thức updateMessage ().

Vì vậy, hãy thêm một nút vào phương thức render ():

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

Ở đây, chúng tôi đang gắn một trình xử lý sự kiện vào nút, lắng nghe sự kiện onClick. Khi điều này được kích hoạt, chúng ta gọi phương thức updateMessage.

Đây là toàn bộ thành phần:

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

Phương thức updateMessage sau đó gọi this.setState () để thay đổi giá trị this.state.message này. Và khi chúng tôi nhấp vào nút, dưới đây là cách thực hiện:
![](https://images.viblo.asia/27272259-d4e2-4731-a2d4-2ece71bdf8c7.png)


Chúc mừng! Bây giờ bạn có một sự hiểu biết rất cơ bản về các khái niệm quan trọng nhất trong React.
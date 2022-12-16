# 1. Giới thiệu
Trong bài viết này tôi xin chia sẻ một số hiểu biết cơ bản về React bằng cách xây dựng một ứng dụng rất đơn giản. Tôi sẽ bỏ đi mọi thứ cái mà không cần thiết. Và sau đó nếu nó thu hút sự quan tâm của bạn và bạn muốn tìm hiểu thêm, bạn có thể xem khóa học [React miễn phí](https://scrimba.com/g/glearnreact) . Nhưng như bây giờ, hãy để tập trung vào những điều cơ bản!
# 2. Thiết lập
Khi bắt đầu với React, bạn nên sử dụng thiết lập đơn giản nhất có thể: một file HTML import thư viện React và ReactDOM bằng thẻ script.
```html
<html>
<head>
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
    
    /* 
    thêm code react ở đây 
    */
    
    </script>
</body>
</html>
```
Đoạn code trên tôi đã import Babel, vì React sử dụng một thứ gọi là JSX để viết đánh dấu. Tôi sẽ cần phải chuyển đổi JSX thành JavaScript đơn giản để trình duyệt có thể hiểu được nó.
Có 2 điều tôi muốn bạn chú ý: 
1. Thẻ <div> với id="root". Đây là điểm vào cho ứng dụng của tôi. Đây là nơi toàn bộ ứng dụng của chúng tôi sẽ sống. 
2. Thẻ <script type = "text / babel"> trong phần body. Đây là nơi tôi sẽ viết mã React của mình.
# 3. Một số kiến thức cơ bản
## 3.1 Component
Mọi thứ trong React đều là một component và chúng thường có dạng các lớp JavaScript. Bạn tạo một component bằng cách mở rộng lớp React-Component. Hãy tạo ra một component có tên là Hello:
```js
class Hello extends React.Component {
    render() {
        return <h1>Hello world!</h1>;
    }
}
```
Trong ví dụ của tôi, tôi chỉ có một phương thức và nó được gọi là render (). Bên trong hàm này bạn sẽ trả về một mô tả về những gì bạn muốn React vẽ lên trang. Trong trường hợp trên, chúng tôi chỉ muốn nó hiển thị thẻ h1 với văn bản Hello world! bên trong nó. Để ứng dụng của chúng ta hiển thị trên màn hình, chúng ta phải sử dụng hàm ReactDOM.render ():
```js
ReactDOM.render(
    <Hello />, 
    document.getElementById("root")
);
```
Tôi kết nối component Hello của tôi với điểm vào cho ứng dụng (<div id = "root"> </ div>). Vì vậy, tôi chỉ đơn giản nói: Hey React! Vui lònghiển thị component Hello bên trong nút DOM của thẻ có id="root"! Nó dẫn đến kết quả như sau:
![](https://images.viblo.asia/056994f2-327a-4694-a562-1e2c9ed6739a.png)
## 3.2 Handling data
Có hai loại dữ liệu trong React: props và state. Sự khác biệt giữa hai thứ này hơi khó hiểu khi mới bắt đầu, vì vậy đừng lo lắng nếu bạn thấy nó hơi khó hiểu. Nó sẽ trở nên dễ dàng hơn khi bạn bắt đầu làm việc với chúng.
    
Sự khác biệt chính là state là private và có thể được thay đổi từ bên trong chính component. Props là bên ngoài, và không được kiểm soát bởi chính component. Nó đã truyền lại từ các component cao hơn trong hệ thống phân cấp, người cũng kiểm soát dữ liệu. Một component có thể thay đổi state nội bộ của nó trực tiếp. Nó không thể thay đổi props của nó trực tiếp.
### 3.2.1 Props
Component Hello của tôi là hoàn toàn tĩnh. Nó đưa ra cùng một thông điệp không có vấn đề gì. Tuy nhiên, một phần lớn của React là khả năng sử dụng lại, nghĩa là khả năng viết một thành phần một lần, sau đó sử dụng lại nó trong các trường hợp sử dụng khác nhau. Ví dụ để hiển thị các thông điệp khác nhau. Để đạt được loại tái sử dụng này, tôi sẽ thêm props. Đây là cách bạn chuyển props cho một thành phần:
```js
ReactDOM.render(
    <Hello message="my friend" />, 
    document.getElementById("root")
);
```
Prop này được gọi là message và có giá trị. Chúng ta có thể truy cập prop này bên trong component Hello bằng cách tham chiếu this.props.message, như thế này: 
```js
class Hello extends React.Component {
    render() {
        return <h1>Hello {this.props.message}!</h1>;
    }
}
```
Vì vậy, bây giờ  tôi có một component có thể tái sử dụng có thể hiển thị bất kỳ thông điệp nào tôi muốn trên trang. Tuy nhiên, điều gì sẽ xảy ra nếu chúng ta muốn component có thể thay đổi dữ liệu của chính nó? Sau đó, chúng ta phải sử dụng state!
### 3.2.2 State
Một cách khác để lưu trữ dữ liệu trong React là ở trạng thái thành phần. Và không giống như các đạo cụ - có thể được thay đổi trực tiếp bởi thành phần - trạng thái có thể. Vì vậy, nếu bạn muốn dữ liệu trong ứng dụng của mình thay đổi - ví dụ dựa trên tương tác của người dùng - thì nó phải được lưu trữ ở trạng thái thành phần ở đâu đó trong ứng dụng.
### 3.2.2.1 Initializing state
Để khởi tạo state, chỉ cần đặt this.state trong phương thức constructor () của lớp. state của chúng ta là một đối tượng mà trong trường hợp của chúng ta chỉ có một key mà message.
```js
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
### 3.2.2.2 Changing the state
Để sửa đổi state, chỉ cần gọi this.setState (), truyền vào đối tượng state mới làm đối số. Tôi sẽ làm điều này trong một phương thức mà tôi sẽ gọi updateMessage.
```js
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
## 3.3 Event Handlers
Bước tiếp theo là tạo một button để nhấp vào, để chúng ta có thể kích hoạt phương thức updateMessage (). Vì vậy, hãy để thêm một button vào phương thức render ():
```js
render() {
  return (
     <div>
       <h1>Hello {this.state.message}!</h1>
       <button onClick={this.updateMessage}>Click me!</button>
     </div>   
  )
}
```
Tại đây, chúng ta đã kết nối một event với button, lắng nghe sự kiện onClick. Khi điều này được kích hoạt, chúng ta gọi phương thức updateMessage. Tại đây, toàn bộ component:
```js
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
Phương thức updateMessage sau đó gọi this.setState () sẽ thay đổi giá trị this.state.message. Và khi chúng ta nhấp vào button, ở đây, bạn sẽ thấy như sau:
![](https://images.viblo.asia/c3a7e258-64ad-4460-a1b6-e2e06247204f.gif)
# 4. Kết luận
 Trong bài viết này tôi đã chia sẻ một số hiểu biết cơ bản về React như component, props, state, cách xử lý dữ liệu cũng như giải quyết sự kiện.
# 5 Tài liệu tham khảo
https://medium.freecodecamp.org/learn-react-js-in-5-minutes-526472d292f4
https://reactjs.org/tutorial/tutorial.html
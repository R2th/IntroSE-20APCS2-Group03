*“The hardest thing about getting started, is getting started” - Guy Kawasaki.*

React là thư viện Front End phổ biến nhất hiện nay. Nhưng bắt đầu học React có thể đôi lúc gặp khó khăn. Gồm những Component, states, props and functional programming. Bài viết này cố gắng giải quyết vấn đề này, bằng cách chỉ ra cho bạn cách bắt đầu tốt và dễ dàng trong React. Vì vậy, không lãng phí thêm thời gian nữa, hãy tới luôn nào.

# Môi Trường
Chúng ta sẽ sử dụng một tệp HTML đơn giản trong bài viết này. Chỉ cần include các thẻ scritpt sau trong phần head file HTML của bạn.
```js
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
```

Do đó, file làm việc của chúng ta sẽ trông như thế này.
```html
<!DOCTYPE html>
<html>
<head>    
    <title>My React App</title>

    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>    
</head>
<body>
    
    <div id="root"></div>

    <script type="text/babel" >   
    
       //React code should go here
    </script>
</body>
</html>
```
Chúng ta đã làm tốt đến đây:
![](https://images.viblo.asia/c54f58a3-82e3-490f-85d2-42672b6c56f3.jpeg)

# Components
Components là thịt và khoai tây của một ứng dụng React.

Chúng là các khối mã độc lập và có thể tái sử dụng để xây dựng ứng dụng React.

Hãy xem xét component đầu tiên của chúng ta có.
```js
class App extends React.Component{
 render(){
  return <h3>Hello React World.</h3>
 }
}
ReactDOM.render(            
 <App />,
 document.getElementById('root')
);
```
Component của chúng ta là một lớp ES6 được extent từ class Component của React. Nó có một phương thức duy nhất hiện được gọi là `render()`, trả về một phần tử h3 trả về văn bản ‘Hello React World’. Trình duyệt sẽ chỉ hiển thị các phần tử được trả về bởi phương thức `render ()`.

### Nhưng chờ một phút, phương thức render đó có cần thiết không?

Có, một class component phải bao gồm một phương thức(method) render. Tất cả các phương thức khác là tùy chọn.

ReactDOM.render () đang hiển thị component App trong phần tử div có id 'root'. Nó lấy component như tham số đầu tiên và div cha làm tham số thứ hai.
### JavaScript Syntax Extension (JSX)

Phần tử h3 mà chúng ta đã khai báo trong component App không phải là HTML, đó là JavaScript Syntax Extension (JSX). JSX là một phần mở rộng cú pháp trong JavaScript. Nó cho phép chúng ta viết HTML như JavaScript Objects (JSX) trong JavaScript.
```js
class App extends React.Component{
 render(){
  const element = <h3>Hello React World</h3>;
  return <div>{element}</div>;
 }
}
```

JSX cho chúng ta sức mạnh của JavaScript khi viết HTML. Các dấu ngoặc nhọn {} trong ví dụ trên cho trình biên dịch React biết rằng phần tử là một biến JavaScript. Hãy xem một ví dụ thực tế khác.

```js
render() {
 const users = [‘Abdul Moiz’,’Linda Lee’,’John Frank’];
 const listItems = users.map(user => <li>{user}</li>);
 return <ul>{listItems}</ul>; 
}
```
Trong ví dụ trên, chúng ta có danh sách người dùng trong một mảng mà chúng ta đã mapped  trên danh sách và tạo một mảng các phần tử `li`.Chúng ta sẽ sử dụng nó trong phần tử `ul` của chúng ta sau.

JSX là cách được khuyến khích và chuẩn để khai báo UI của bạn trong React.

# Props
Props là các thuộc tính được truyền bởi thành phần cha cho các thành phần con.

Đó là một mô hình chung trong React để trừu tượng hóa logic UI phổ biến trong các components con. Trong những trường hợp đó, nó là dùng chung cho component cha để truyền một số dữ liệu như các thuộc tính trong các component con.
```js
class App extends React.Component {
 render() {
  return <Greet greeting="Hello" />;  
 }
}
class Greet extends React.Component{
 render(){
  return <h3>{this.props.greeting} World</h3>;
 }
}
```
Trong ví dụ trên, chúng ta đã thông qua "Hello" gọi đến component Greet  và sử dụng nó trong component App của chúng tôi. Chúng ta có thể truy cập tất cả các props từ đối tượng this.props của class chúng ta. Trong trường hợp này, chúng ta đang truy cập greeting như this.props.greeting.

### OK, nhưng loại dữ liệu nào tôi có thể đẩy vào props?
Khá nhiều cấu trúc dữ liệu mặc định trong JavaScript: string literals, numbers, array, objects, and even functions. Có, chúng ta có thể đẩy các functions, nhưng chúng ta sẽ không bắt đầu ngay bây giờ.
# State
State, giống như props, cũng giữ dữ liệu, nhưng một số loại dữ liệu khác nhau.

Props giữ dữ liệu được gửi bởi component cha. State nắm giữ dữ liệu private, dynamic của component. State giữ dữ liệu thay đổi giữa nhiều render của component.

> Props get passed to the component (like function parameters), whereas state is managed within the component (like variables declared within a function) - React Docs

Nôm na là: Props được chuyển đến component (như tham số chức năng), trong khi state được quản lý trong component (như các biến được khai báo bên trong một hàm) - React Documents said.

### Phức tạp? Đừng lo lắng, tất cả cảm giác đó chỉ trong một khoảnh khắc.

```js
class App extends React.Component {
 constructor(){
  super();
  this.state = {name :"Abdul Moiz"};
 }
 changeName(){
  this.setState({name : "John Doe"});
 }
 
 render(){
  return (
   <div>
     <h3>Hello {this.state.name}</h3>
     <button type='button' onClick=this.changeName.bind(this)}>
      Change
     </button>
   </div>
  );
 }
}
```
Như chúng ta có thể thấy, chúng ta phải khởi tạo state trong một constructor và sau đó chúng ta có thể sử dụng nó trong phương thức render. Giống như props, chúng ta đang truy cập state với đối tượng ‘this.state’ này. Và trên sự kiện nhấp chuột của thay đổi button, chúng ta đang thay đổi giá trị của tên trong state thành 'John Doe'.
# setState()

Chúng ta đang sử dụng phương thức setState () để thay đổi state của chúng ta. setState () có sẵn theo mặc định trong React Component và là cách duy nhất để thay đổi state. Chúng ta đang truyền một đối tượng làm tham số cho setState (). React sẽ xem xét đối tượng được truyền và sẽ chỉ thay đổi các keys được cung cấp bởi state  bằng các giá trị được.

Nhưng chờ một phút, nếu setState () là cách duy nhất để thay đổi state, điều này có nghĩa là tôi không thể thay đổi state ngay lập tức?
```
this.state.name = “John Doe”;
```
Bởi vì khi chúng ta gọi setState (), nó cho React biết rằng dữ liệu đã được thay đổi và chúng ta cần phải trả lại component với dữ liệu được cập nhật. Cập nhật state ngay lập tức sẽ không ảnh hưởng đến UI người dùng.

# Event Handlers
Event handlers trong React không khác với các trình xử lý sự kiện trong DOM. Nhưng họ có một số khác biệt nhỏ nhưng lại quan trọng.

Trong DOM, event handlers là lowercase, nhưng trong React, trình xử lý sự kiện là camelCase. Thứ hai, trong DOM, các trình xử lý sự kiện có giá trị như một chuỗi, nhưng trong React, các trình xử lý sự kiện lấy tham chiếu hàm làm giá trị.

Sau đây là ví dụ về cách chúng ta sẽ xử lý sự kiện trong DOM:

```
<button type="submit" onclick="doSomething()"></button>
```

Và đây là cách nó được thực hiện trong React:
```
<button type="submit" onClick=doSomething></button>
```
Nếu bạn nhận thấy, trong DOM, chúng tôi đang xử lý sự kiện nhấp chuột bằng cách sử dụng thuộc tính DOM `onclick` (lowercase). Trong React, chúng ta đang sử dụng trình xử lý sự kiện `onClick` (camelCase) từ React. Ngoài ra, chúng ta đang chuyển một giá trị chuỗi `doSomething ()` trong DOM. Nhưng trong React, chúng ta chuyển tham chiếu của hàm `doSomething` làm giá trị.

Nếu bạn muốn đọc về danh sách đầy đủ các sự kiện được cung cấp bởi React (như thường lệ, có tấn về chúng), hãy xem xét đọc từ các tài liệu chính thức.

Mệt mỏi? Tôi cũng vậy, nhưng chúng ta gần t - theo kịp việc học tập!

# Life Cycle Methods (Life Cycle Hooks)

React cho chúng ta một số phương pháp đặc biệt gọi là Life Cycle Hooks. Những Life Cycle Hooks này chạy vào những thời điểm cụ thể trong life cycle của một component. May mắn thay, chúng ta có thể đặt chức năng riêng của chúng ta vào những Life Cycle Hookss, bằng cách ghi đè chúng trong thành phần của chúng ta. Hãy xem xét một số Life Cycle Hooks thường được sử dụng.
### componentDidMount()
Mounting là thời điểm thành phần được hiển thị lần đầu tiên trong trình duyệt. `componentDidMount ()` chạy sau khi component  được  mounted. Đó là một không gian tốt để lấy bất kỳ dữ liệu hoặc bắt đầu bất cứ điều gì.
### componentDidUpdate()
Như tên gọi của nó, `componentDidUpdate ()` chạy sau khi component  được cập nhật. Đây là nơi xử lý các thay đổi dữ liệu. Có thể bạn muốn xử lý một số yêu cầu mạng hoặc thực hiện các phép tính dựa trên dữ liệu đã thay đổi. `componentDidUpdate ()` là nơi để làm tất cả điều đó.

Hãy xem điều đó trong thực tế:
```js
class App extends React.Component {
 constructor(){
  super(); 
  this.state = {
   person : {name : "" , city : ""}
  };
 }
 componentDidMount(){
  //make any ajax request
  this.setState({
   person : {name : "Abdul Moiz",city : "Karachi"}
  });
 }
 componentDidUpdate(){
  //because I could'nt come up with a simpler example of //componentDidUpdate
  console.log('component has been updated',this.state);
 }
 render(){
  return (
   <div>
    <p>Name : {this.state.person.name}</p>
    <p>City : {this.state.person.city}</p>
   </div>
  );
 }
}
```
Trạng thái ban đầu của chúng ta có hai thuộc tính, name và city, và cả hai đều có một chuỗi rỗng làm giá trị. Trong `componentDidMount ()`, chúng ta đặt state  và đổi name thành 'Abdul Moiz' và city thành 'Karachi'. Bởi vì chúng ta đã thay đổi state, component  được cập nhật như là kết quả của việc thực thi `componentDidUpdate ()`.
# Conclusion
React ở đây. Học React  có thể khó khăn, nhưng bạn sẽ thích nó khi bạn vượt qua con đường học tập ban đầu. Bài viết này có nghĩa là để làm cho quá trình học tập đó dễ dàng hơn một chút cho bạn. Nếu bài viết này đã giúp bạn, hãy chắc chắn cho nó một số cái vỗ tay. 👏

# Tài liệu dịch
https://medium.freecodecamp.org/everything-you-need-to-know-to-get-started-in-react-11311ae997cb
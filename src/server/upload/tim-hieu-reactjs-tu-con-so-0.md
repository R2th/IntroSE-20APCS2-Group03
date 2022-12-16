# ReactJS là gì ?
**ReactJS** là thư viện nổi tiếng của Javascript được phát minh bởi một kỹ sư của Facebook với hơn `150000` stars trên github, được dùng để xây dựng giao diện người dùng, nó cho phép chúng ta xây dựng các thành phần giao diện có thể được sử dụng lại, khái niệm này được gọi là **components**. ReactJS được dùng để xây dựng ứng dụng (Single Page Application). Nếu bạn cần xây dựng những web applications lớn thì hãy nghĩ tới việc sử dụng **React** vì chúng ta có thể thay đổi dữ liệu mà không cần phải reload lại trang, đồng thời việc sử dụng **React** cũng nhanh, đơn giản, có thể tái sử dụng và dễ dàng mở rộng ứng dụng cùa mình.
# Cài đặt
**Cách 1**:

Để bắt đầu với **React** đơn giản viết trong file **HTML** mà không cần cài đặt nhiều chúng ta chỉ cần sử dụng **CDN links** cần thiết để khởi tạo **React**.
```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.26.0/babel.js">
```

**Cách 2**:
Để tạo một môi trường chạy ứng dụng **React** chúng ta cần cài thêm **NodeJS** và **NPM**, để kiểm tra xem cài chưa.
```
$ node -v
$ npm -v
```

Khởi tạo project
```bash
$ npx create-react-app react-basic 
$ cd react-basic & npm start
```
Khi chạy lệnh trên thì lập tức nó sẽ mở cho chúng ta trang khởi tạo dự án với link là [http://localhost:3000/](http://localhost:3000/).

# Cấu trúc thư mục
Cùng điểm qua các thư mục đáng chú ý.
* **src**: Folder này là nơi chúng ta sẽ viết code tại thư mục này
* **public**: Chức các file css, js hay các image.
* **node_modules**: Chứa các module cần thiết để chạy ứng dụng React
* **package.json**: Chứa các thông tin của các module.

# Xây dựng ứng dụng đầu tiên
Lý thuyết cũng nhiều rồi, cùng đi vào thực hành tẹo luôn cho hứng khởi.

Khi bắt đầu chạy React App bạn sẽ thấy dòng chữ **Edit src/App.js and save to reload.** Thôi thì cứ như lời hướng dẫn vào đây thử sửa code xem sao.

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <h1>Hello World</h1>
  );
}

export default App;
```

Lên browser chúng ta sẽ thấy **Hello World** đã được in ngay ngắn trên trình duyệt. Có một lưu ý nhỏ là bạn sẽ không cần phải reload lại trình duyệt khi có sự thay đổi trong các file, **React** sẽ làm việc này thay cho các bạn.
# Tìm hiểu những điều cơ bản nhất
Trước tiên thì mình nghĩ mọi người nên bắt đầu với **JSX** trước để hiểu rõ bản chất.
### JSX
**JSX** là viết tắt của **Javascript** và **XML**, như đã nói **JSX** giúp chúng ta viết code HTML ở trên trong file JS một cách dễ dàng . Có thể nói đây là một phần khá quan trọng của **React** vì nó hỗ trợ code trở nên dễ đọc và ngắn gọn hơn, bạn có thể thấy được điều đó qua ví dụ sau.

Có sử dụng **JSX**:
```javascript
const myelement = <h1>I'm using JSX!</h1>;
```
Không sử dụng **JSX**
```javascript
const myelement = React.createElement('h1', {}, 'I do not use JSX!');
```

Nhìn qua thôi đã thấy một sự ngắn gọn và đơn giản hơn không hề nhẹ rồi. Mặc dù việc sử dụng **JSX** này là không hề bắt buộc trong **React** nhưng mình khuyên các bạn nên sử dụng nó bởi nó giúp code nhìn ngắn gọn dễ hiểu hơn rất nhiều, hơn nữa cú pháp của nó khá giống với HTML thông thường, giúp chúng ta đọc và sửa code cũng dễ dàng hơn.

Cùng điểm qua một vài tính năng cơ bản của **JSX** trong **React**.

#### Nhúng biểu thức Javascript vào JSX
Chúng ta có thể nhúng biểu thức **Javasript** vào trong cú pháp của **JSX** bằng việc sử dụng cặp thẻ ngoặc nhọn **{}**.
```javascript
const name = 'Quang Phu';
const element = <h1>Hello, {name}</h1>;
```

Hay chúng ta cũng có thể nhúng được hàm hay object bên trong **JSX** giả sử như.
```javascript
const first_name = 'Quang';
const last_name = 'Phu'

function testName() {
	return first_name + '' + last_name;
}
const element = <h1>Hello, {testName()}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

#### Chỉ định thuộc tính trong JSX
Chúng ta có thể chỉ định thuộc tính trong **JSX** như với HTML với việc sử dụng dấu ngoặc kép, và có thể sử dụng dấu ngoặc nhọn.
```javascript
const element = <div tabIndex="0"></div>;
```
hay
```javascript
const element = <img src={user.avatarUrl}></img>;
```
Chúng ta không được sử dụng cùng lúc cả dấu ngoặc nhọn và dấu ngoặc kép trong cùng một thuộc tính vì như vậy **JSX** sẽ hiểu nó là một chuỗi chứ không phải biểu thức. Nên dùng dấu ngoặc kép cho chuỗi và dấu ngoặc nhọn cho biểu thức.
> Lưu ý : **JSX** giống với **Javascript** hơn là **HTML** nên việc đặt tên cho các thuộc tính sẽ phải ở dạng **camelCase** .<br>class sẽ được đặt là className, hay tabindex sẽ thành tabIndex<br>Cũng tương tự với các event, chúng ta có onclick sẽ viết là onClick

#### Phần tử con trong JSX
Đối với các thẻ mà không chứa các phần tử con bên trong bạn có thể sử dụng **/>** thay vì **close tag**.
```javascript
const element = <img src={user.avatarUrl} />;
```
Trong trường hợp bên trong có nhiều `tag` chúng ta phải sử dụng thẻ để bọc chúng bằng một JSX tag.
```javascript
//viết đúng
//Phải bọc nó bằng một tags
const element = (
  <div>
    <h1>Hello</h1>
    <p>Hihi</p>
  </div>
);
 
//Viết sai
//Các phần từ không được bọc
const element = (
    <h1>Hello</h1>
    <p>hihi</p>
);
```

### React render HTML
Trong **React**, để hiển thị HTML lên trình duyện chúng ta sử dụng **ReactDOM.render()**.

**ReactDOM.render()** nhận hai tham số, tham số thứ nhất là code HTML, tham số thứ hai là HTML element.

Giả sử chúng ta muốn in `Hello World` trong `app element` thì chúng ta định nghĩa như sau:

```javascript
ReactDOM.render(<p>Hello World</p>, document.getElementById('app'));
```



### React Component
**Component** giúp chúng ta phân chia giao diện người dùng thành các đoạn code nhỏ và có thể tái sử dụng. Có 2 cách để khởi tạo **components** là **Functional Component** và **Class Component**.

Trước tiên là Function Component.
#### Function Component
**Function Component** sẽ trả về cho chúng ta HTML.
```javascript
function Hello() { // tạo một function component
  return <h2>Hello World!</h2>;
}

ReactDOM.render(<Hello />, document.getElementById('root'));
```

#### Class Component
Đây là cách viết đầy đủ của một **component**, khi viết cách này chúng ta sẽ sử dụng được hầu hết các chức năng như state, props...
```javascript
import React, {Component} from 'react'

class Hello extends Component { // định nghĩa class component Hello
  render() {
    return <h2>Hello World</h2>;
  }
}

export default Welcome; 
```

Về việc muốn sử dụng kiểu **component** nào thì: Khi nào bạn muốn làm việc với với các chức năng của component như `events`, `state`, `lifecycles` hay tổ chức các đoạn code theo cấu trúc theo mô hình OOP thì bạn có thể sử dụng **class components**, còn ngược lại chúng ta có thể sử dụng **function component**.

### Props
**Props** chính là viết tắt của properties. **Props** sẽ cho phép chúng ta truyền dữ liệu vào các **components**, chúng ta có thể truyền dữ liệu từ **component** này sang **component** khác, cú pháp của **props** không khác gì so với các attribute thông thường trong HTML.
```javascript
class Car extends React.Component {
	render() {
  	return <h1>Hello {this.props.name}</h1> // truy cập đến props
  }
}

const element = <Car name="Phu" />; // truyền vào props name với giá trị là Phu

ReactDOM.render(element, document.getElementById('root'));
```

> Props có thể là một number, string, object...

#### Truyền props giữa các component.

Nếu bạn muốn truyền dữ liệu giữa hai **component** với nhau thì cũng sẽ sử dụng đến **props**.
```javascript
class Person extends React.Component { // định nghĩa class component Person
	render() {
  	return <h1>Xin chao, {this.props.name}</h1> // in ra giá trị của props 
  }
}

class Name extends React.Component { // định nghĩa class component Name
  render() {
  const name = 'Phu';
  	return (
    	<div className="test">
    	  <Person name={name} /> // truyền props name vào class Person
    	</div>
    )
  }
}

ReactDOM.render(<Name />, document.getElementById('root'))
```

### State
**State** là một object được tích hợp trong React component, được dùng để lưu trữ dữ liệu trong component. Khác với **props** được sử dụng để truyền dữ liệu từ component này sang component khác thì **state** lại chỉ tồn tại trong một **component**. Và điều đặc biệt ở đây là mỗi khi mà **state** thay đổi thì tự động **component** đó sẽ re-render lại.

#### Khởi tạo một state
Để khai báo một **state** chúng ta sẽ khai báo bên trong phương thức **constructor** của **class component**
```javascript
class Name extends React.Component {
	constructor(props) {
  	super(props)
    
    this.state = {name: 'phu'} // định nghĩa state
  }
	render() {
  	return <h1>Hello {this.state.name}</h1> // gọi state ra
  }
}

ReactDOM.render(<Name />, document.getElementById('root'));
```
Để render ra **state** mong muốn bạn sử dụng cú pháp **this.state.propertyname** là được.

#### Thay đổi giá trị state
Khi làm việc với **component** việc bạn tương tác với **state** là điều tất yếu, đặc biệt là sẽ cần đến việc cập nhật **state** để component có thể re render lại. Chả hạn như khi bạn muốn ấn vào nút button tăng giá trị nào đó lên chả hạn, đây là lúc bạn **cập nhật state**.

Để thay đổi giá trị **state**, cú pháp sẽ là 
```javascript
this.setState({
     name : 'giá trị mới'
})
```

Giả sử ta sẽ cập nhật lại giá trị của **state.name**
```javascript
class Name extends React.Component {
	constructor(props) {
  	super(props)
    
    this.state = {name: 'phu'}
  }
  
  changeName = () => {
  	this.setState({
    	name: 'thuy'
    })
  }
  
	render() {
  	return (
        <div>	
          <h1>My name is {this.state.name}</h1>
          <button type="button" onClick={this.changeName}>Change name</button>
        </div>
    )
  } 
}

ReactDOM.render(<Name />, document.getElementById('root'));
```

Các bạn chạy chương trình lên sẽ thấy **state.name** sẽ được cập nhật giá trị.

## Kết luận
Đây là những khái niệm cơ bản nhất của ReactJS khi chúng ta mới bắt đầu học, nếu có gì góp ý các bạn comment bên dưới cho mình nhận nhé.